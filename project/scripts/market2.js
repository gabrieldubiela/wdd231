// Importações equivalentes em JS (não são necessárias no navegador)
// No Node.js você usaria const fetch = require('node-fetch');

async function fetchBLSCpiData() {
    const headers = { 'Content-type': 'application/json' };
    const data = {
        seriesid: ['CUUR0000SA0', 'SUUR0000SA0'],
        startyear: "2011",
        endyear: "2014"
    };

    try {
        // Fazendo a requisição POST (equivalente ao requests.post do Python)
        const response = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const jsonData = await response.json();

        // Processando os dados da resposta
        for (const series of jsonData.Results.series) {
            // Criando uma tabela (equivalente ao prettytable)
            let tableData = [];
            const headers = ["series id", "year", "period", "value", "footnotes"];
            tableData.push(headers);

            const seriesId = series.seriesID;
            
            for (const item of series.data) {
                const year = item.year;
                const period = item.period;
                const value = item.value;
                let footnotes = "";
                
                for (const footnote of item.footnotes) {
                    if (footnote) {
                        footnotes += footnote.text + ',';
                    }
                }

                if ('M01' <= period && period <= 'M12') {
                    tableData.push([seriesId, year, period, value, footnotes.slice(0, -1)]);
                }
            }

            // Exibindo os dados no console (equivalente a escrever em arquivo)
            console.log(`Dados para a série ${seriesId}:`);
            console.table(tableData);
            
            // Se você realmente quiser salvar em arquivo no navegador:
            // Isso criará um download do arquivo
            const blob = new Blob([JSON.stringify(tableData, null, 2)], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${seriesId}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do BLS:', error);
    }
}

// Chamando a função
fetchBLSCpiData();