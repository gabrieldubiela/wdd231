document.addEventListener("DOMContentLoaded", () => {
  // Market data symbols
  const marketSymbols = {
      '^IXIC': 'nasdaq',
      '^DJI': 'dowjones',
      '^GSPC': 'sp500'
  };

  // FRED API key
  const fredKey = '217ec7b2484bdd3ca4e5f8443c6345a1';

  // Fetch market data from Yahoo Finance
  async function fetchMarketData() {
      const symbols = Object.keys(marketSymbols).join(',');
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
      
      try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.quoteResponse && data.quoteResponse.result) {
              data.quoteResponse.result.forEach(stock => {
                  const prefix = marketSymbols[stock.symbol];
                  if (prefix) {
                      updateMarketIndicator(
                          prefix, 
                          stock.regularMarketPrice, 
                          stock.regularMarketChange, 
                          stock.regularMarketChangePercent
                      );
                  }
              });
          }
      } catch (error) {
          console.error("Market data error:", error);
          showMarketDataError();
      }
  }

  // Fetch economic data from FRED
  async function fetchEconomicData() {
      try {
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
          console.error("Economic data error:", error);
          document.getElementById('cpi-value').textContent = "Data unavailable";
          document.getElementById('fedrate-value').textContent = "Data unavailable";
      }
  }

  // Update market indicator display
  function updateMarketIndicator(prefix, price, change, changePercent) {
      if (price) {
          document.getElementById(`${prefix}-value`).textContent = `$${price.toFixed(2)}`;
      }
      if (change && changePercent) {
          document.getElementById(`${prefix}-change`).textContent = 
              `${change.toFixed(2)} (${changePercent.toFixed(2)}%)`;
          document.getElementById(`${prefix}-change`).style.color = 
              change >= 0 ? '#28a745' : '#dc3545';
      }
  }

  // Show error for market data
  function showMarketDataError() {
      Object.values(marketSymbols).forEach(prefix => {
          document.getElementById(`${prefix}-value`).textContent = "Data unavailable";
          document.getElementById(`${prefix}-change`).textContent = "--";
      });
  }

  // Initialize
  fetchMarketData();
  fetchEconomicData();

  // Refresh button functionality
  document.getElementById('refresh-btn')?.addEventListener('click', () => {
      fetchMarketData();
      fetchEconomicData();
  });
});