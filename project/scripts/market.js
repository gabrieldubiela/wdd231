document.addEventListener("DOMContentLoaded", () => {
  const symbols = {
    '^IXIC': 'nasdaq',
    '^DJI': 'dowjones',
    '^GSPC': 'sp500'
  };

  async function fetchMarketData() {
    const symbolList = Object.keys(symbols).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolList}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      if (!data.quoteResponse || !data.quoteResponse.result) throw new Error('Invalid data');
      
      data.quoteResponse.result.forEach(stock => {
        const prefix = symbols[stock.symbol];
        if (!prefix) return;
        
        const valueElement = document.getElementById(`${prefix}-value`);
        const changeElement = document.getElementById(`${prefix}-change`);
        
        if (stock.regularMarketPrice) {
          valueElement.textContent = `$${stock.regularMarketPrice.toFixed(2)}`;
          
          if (stock.regularMarketChange && stock.regularMarketChangePercent) {
            const change = stock.regularMarketChange.toFixed(2);
            const changePercent = stock.regularMarketChangePercent.toFixed(2);
            changeElement.textContent = `${change} (${changePercent}%)`;
            changeElement.className = stock.regularMarketChange >= 0 ? 'positive' : 'negative';
          }
        }
      });
    } catch (error) {
      Object.values(symbols).forEach(prefix => {
        document.getElementById(`${prefix}-value`).textContent = 'Data unavailable';
        document.getElementById(`${prefix}-change`).textContent = '--';
      });
    }
  }

  async function fetchEconomicData() {
    try {
      const fredKey = '217ec7b2484bdd3ca4e5f8443c6345a1';
      
      const cpiResponse = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${fredKey}&file_type=json`);
      const cpiData = await cpiResponse.json();
      if (cpiData.observations?.length > 0) {
        const latestCPI = cpiData.observations[cpiData.observations.length - 1];
        document.getElementById('cpi-value').textContent = `${latestCPI.value} (${latestCPI.date})`;
      }
      
      const fedRateResponse = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=${fredKey}&file_type=json`);
      const fedRateData = await fedRateResponse.json();
      if (fedRateData.observations?.length > 0) {
        const latestRate = fedRateData.observations[fedRateData.observations.length - 1];
        document.getElementById('fedrate-value').textContent = `${latestRate.value}% (${latestRate.date})`;
      }
    } catch (error) {
      document.getElementById('cpi-value').textContent = 'Data unavailable';
      document.getElementById('fedrate-value').textContent = 'Data unavailable';
    }
  }

  fetchMarketData();
  fetchEconomicData();

  document.getElementById('refresh-btn')?.addEventListener('click', () => {
    fetchMarketData();
    fetchEconomicData();
  });
});