// market.js - BLS API Integration for CPI Data

document.addEventListener('DOMContentLoaded', function() {
    // Configurações da API
    const BLS_API_CONFIG = {
        endpoint: 'https://api.bls.gov/publicAPI/v1/timeseries/data/',
        seriesIds: ['CUUR0000SA0'], // Série do CPI-U (Consumer Price Index for All Urban Consumers)
        latestYearOnly: true,      // Buscar apenas o ano mais recente
        maxYears: 10               // Número máximo de anos que pode ser solicitado
    };

    // Buscar dados do CPI quando a página carregar
    fetchCPIData(BLS_API_CONFIG);
});

async function fetchCPIData(config) {
    try {
        // Mostrar estado de carregamento
        document.getElementById('cpi-value').textContent = 'Loading...';

        // Determinar anos de início e fim
        const currentYear = new Date().getFullYear();
        const startYear = config.latestYearOnly ? currentYear.toString() : (currentYear - 1).toString();
        const endYear = currentYear.toString();

        // Preparar payload da requisição
        const payload = {
            seriesid: config.seriesIds,
            startyear: startYear,
            endyear: endYear
        };

        // Fazer a requisição à API BLS
        const response = await fetch(config.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Verificar status da resposta
        if (data.status !== 'REQUEST_SUCCEEDED') {
            throw new Error(`API error: ${data.message.join(', ')}`);
        }

        // Processar os dados recebidos
        processCPIResponse(data);

    } catch (error) {
        console.error('Error fetching CPI data:', error);
        document.getElementById('cpi-value').textContent = 'Error loading data';
        document.getElementById('cpi-value').classList.add('error');
    }
}

function processCPIResponse(responseData) {
    // Encontrar a série do CPI
    const cpiSeries = responseData.Results.series.find(series => 
        series.seriesID === 'CUUR0000SA0'
    );

    if (!cpiSeries || !cpiSeries.data || cpiSeries.data.length === 0) {
        throw new Error('No CPI data found in response');
    }

    // Ordenar os dados por data (do mais recente para o mais antigo)
    const sortedData = cpiSeries.data.sort((a, b) => {
        return `${b.year}${b.period}`.localeCompare(`${a.year}${a.period}`);
    });

    // Pegar o dado mais recente
    const latestCPI = sortedData[0];

    // Formatar o valor para exibição
    const formattedValue = parseFloat(latestCPI.value).toFixed(2);
    const periodName = getFormattedPeriod(latestCPI.period, latestCPI.year);

    // Atualizar a página com os dados
    document.getElementById('cpi-value').innerHTML = `
        <strong>${formattedValue}</strong> (${periodName})<br>
        <small>${getFootnotesText(latestCPI.footnotes)}</small>
    `;
}

// Função auxiliar para formatar o período (M01 -> Janeiro, etc.)
function getFormattedPeriod(period, year) {
    if (period === 'M13') return `Annual ${year}`;
    
    const monthMap = {
        'M01': 'January', 'M02': 'February', 'M03': 'March',
        'M04': 'April', 'M05': 'May', 'M06': 'June',
        'M07': 'July', 'M08': 'August', 'M09': 'September',
        'M10': 'October', 'M11': 'November', 'M12': 'December'
    };
    
    return `${monthMap[period]} ${year}`;
}

// Função auxiliar para formatar as notas de rodapé
function getFootnotesText(footnotes) {
    if (!footnotes || footnotes.length === 0) return '';
    return footnotes.map(fn => fn.text).join('; ');
}