const API_KEY = 'FQLEMAA5VIYKPWCE';
const symbols = {
    'NASDAQ': '^IXIC',
    'DOW_JONES': '^DJI',
    'S&P_500': '^GSPC'
};

function formatChange(change, changePercent) {
    const numChange = parseFloat(change);
    const formattedChange = numChange.toFixed(2);
    const formattedPercent = parseFloat(changePercent).toFixed(2) + '%';

    if (numChange > 0) {
        return `<span class="positive">+${formattedChange} (+${formattedPercent})</span>`;
    } else if (numChange < 0) {
        return `<span class="negative">${formattedChange} (${formattedPercent})</span>`;
    } else {
        return `<span>${formattedChange} (${formattedPercent})</span>`;
    }
}

async function fetchIndexData(symbol, indexName) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json();
        
        if (data['Global Quote']) {
            const quote = data['Global Quote'];
            return {
                price: parseFloat(quote['05. price']).toFixed(2),
                change: quote['09. change'],
                changePercent: quote['10. change percent']
            };
        } else {
            console.error(`Error fetching data for ${indexName}:`, data);
            return { error: 'Data not available' };
        }
    } catch (error) {
        console.error(`Error fetching ${indexName}:`, error);
        return { error: 'Request error' };
    }
}

function updateUI(elementId, data) {
    const valueElement = document.getElementById(`${elementId}-value`);
    const changeElement = document.getElementById(`${elementId}-change`);

    if (data.error) {
        valueElement.textContent = data.error;
        if (changeElement) changeElement.textContent = '';
        return;
    }

    valueElement.textContent = `$${data.price}`;
    if (changeElement) {
        changeElement.innerHTML = formatChange(data.change, data.changePercent);
    }
}

async function fetchMarketData() {
    try {
        const nasdaqData = await fetchIndexData(symbols.NASDAQ, 'NASDAQ');
        updateUI('nasdaq', nasdaqData);

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dowJonesData = await fetchIndexData(symbols.DOW_JONES, 'DOW_JONES');
        updateUI('dowjones', dowJonesData);

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const sp500Data = await fetchIndexData(symbols['S&P_500'], 'S&P_500');
        updateUI('sp500', sp500Data);

        document.getElementById('cpi-value').textContent = 'Data not available';
        document.getElementById('fedrate-value').textContent = 'Data not available';
    } catch (error) {
        console.error('Error fetching market data:', error);
        document.getElementById('nasdaq-value').textContent = 'Loading error';
        document.getElementById('dowjones-value').textContent = 'Loading error';
        document.getElementById('sp500-value').textContent = 'Loading error';
    }
}

document.addEventListener('DOMContentLoaded', fetchMarketData);