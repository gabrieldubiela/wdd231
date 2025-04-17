document.addEventListener("DOMContentLoaded", () => {
    const MARKETSTACK_KEY = '6296dc225a7f27f2437c5514d5e9d8af';
    const symbols = {
        '^IXIC': 'nasdaq',
        '^DJI': 'dowjones',
        '^GSPC': 'sp500'
    };

    async function fetchMarketData() {
        try {
            const response = await fetch(
                `http://api.marketstack.com/v1/intraday/latest?access_key=${MARKETSTACK_KEY}&symbols=${Object.keys(symbols).join(',')}`
            );
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.data) {
                data.data.forEach(stock => {
                    const prefix = symbols[stock.symbol];
                    if (prefix) {
                        document.getElementById(`${prefix}-value`).textContent = `$${stock.last?.toFixed(2) || '--'}`;
                        
                        const changeElement = document.getElementById(`${prefix}-change`);
                        if (stock.last && stock.open) {
                            const change = stock.last - stock.open;
                            const changePercent = (change / stock.open * 100).toFixed(2);
                            changeElement.textContent = `${change.toFixed(2)} (${changePercent}%)`;
                            changeElement.style.color = change >= 0 ? '#28a745' : '#dc3545';
                        } else {
                            changeElement.textContent = '--';
                        }
                    }
                });
            } else {
                throw new Error('No data returned');
            }
        } catch (error) {
            console.error("Market data error:", error);
            showErrorStates();
        }
    }

    function showErrorStates() {
        Object.values(symbols).forEach(prefix => {
            document.getElementById(`${prefix}-value`).textContent = 'Data unavailable';
            document.getElementById(`${prefix}-change`).textContent = '--';
        });
    }

    fetchMarketData();
    
    document.getElementById('refresh-btn')?.addEventListener('click', fetchMarketData);
});