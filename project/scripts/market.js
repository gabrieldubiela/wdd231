document.addEventListener("DOMContentLoaded", async () => {
  async function fetchCPI() {
      try {
          const apiUrl = 'https://api.bls.gov/publicAPI/v1/timeseries/data/';
          const requestData = {
              seriesid: ['CUUR0000SA0'],
              startyear: new Date().getFullYear().toString(),
              endyear: new Date().getFullYear().toString()
          };

          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestData)
          });

          if (!response.ok) throw new Error('API request failed');

          const jsonData = await response.json();
          
          if (jsonData.Results && jsonData.Results.series) {
              const latestData = jsonData.Results.series[0].data[0];
              const monthMap = {
                  'M01': 'Jan', 'M02': 'Feb', 'M03': 'Mar',
                  'M04': 'Apr', 'M05': 'May', 'M06': 'Jun',
                  'M07': 'Jul', 'M08': 'Aug', 'M09': 'Sep',
                  'M10': 'Oct', 'M11': 'Nov', 'M12': 'Dec'
              };
              
              const formattedPeriod = monthMap[latestData.period] || latestData.period;
              document.getElementById('cpi-value').textContent = 
                  `${latestData.value}% (${formattedPeriod} ${latestData.year})`;
          } else {
              document.getElementById('cpi-value').textContent = "Data unavailable";
          }
      } catch (error) {
          console.error("CPI Fetch Error:", error);
          document.getElementById('cpi-value').textContent = "3.2% (Fallback)";
      }
  }
  fetchCPI();
});

document.addEventListener("DOMContentLoaded", () => {
  const symbols = {
      '^IXIC': 'nasdaq',
      '^DJI': 'dowjones',
      '^GSPC': 'sp500'
  };

  async function fetchMarketData() {
      try {
          const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${Object.keys(symbols).join(',')}`);
          const data = await response.json();

          if (data.quoteResponse?.result) {
              data.quoteResponse.result.forEach(stock => {
                  const prefix = symbols[stock.symbol];
                  if (prefix) {
                      document.getElementById(`${prefix}-value`).textContent = `$${stock.regularMarketPrice?.toFixed(2) || '--'}`;
                      
                      const changeElement = document.getElementById(`${prefix}-change`);
                      if (stock.regularMarketChange && stock.regularMarketChangePercent) {
                          changeElement.textContent = 
                              `${stock.regularMarketChange.toFixed(2)} (${stock.regularMarketChangePercent.toFixed(2)}%)`;
                          changeElement.style.color = stock.regularMarketChange >= 0 ? '#28a745' : '#dc3545';
                      } else {
                          changeElement.textContent = '--';
                      }
                  }
              });
          }
      } catch (error) {
          console.error("Market data error:", error);
          Object.values(symbols).forEach(prefix => {
              document.getElementById(`${prefix}-value`).textContent = '--';
              document.getElementById(`${prefix}-change`).textContent = '--';
          });
      }
  }

  // Initial fetch
  fetchMarketData();

  // Refresh every 60 seconds
  setInterval(fetchMarketData, 60000);

  // Manual refresh button
  document.getElementById('refresh-btn')?.addEventListener('click', fetchMarketData);
});