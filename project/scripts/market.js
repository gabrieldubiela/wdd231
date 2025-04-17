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
  const symbols = [
      { symbol: '^IXIC', name: 'nasdaq' },
      { symbol: '^DJI', name: 'dowjones' },
      { symbol: '^GSPC', name: 'sp500' }
  ];

  // Primary data source (Yahoo Finance)
  async function fetchYahooData() {
      try {
          const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.map(s => s.symbol).join(',')}`);
          const data = await response.json();
          
          if (data.quoteResponse?.result) {
              return data.quoteResponse.result.reduce((acc, stock) => {
                  acc[stock.symbol] = {
                      price: stock.regularMarketPrice,
                      change: stock.regularMarketChange,
                      changePercent: stock.regularMarketChangePercent
                  };
                  return acc;
              }, {});
          }
      } catch (error) {
          console.log("Yahoo Finance API failed, trying fallback");
          return null;
      }
      return null;
  }

  // First fallback (MarketStack)
  async function fetchMarketStackData() {
      try {
          // Free plan allows 1,000 calls/month
          const response = await fetch(`http://api.marketstack.com/v1/intraday?access_key=YOUR_MARKETSTACK_KEY&symbols=${symbols.map(s => s.symbol).join(',')}`);
          const data = await response.json();
          
          if (data.data) {
              return data.data.reduce((acc, stock) => {
                  acc[stock.symbol] = {
                      price: stock.last,
                      change: stock.last - stock.open,
                      changePercent: ((stock.last - stock.open) / stock.open * 100)
                  };
                  return acc;
              }, {});
          }
      } catch (error) {
          console.log("MarketStack failed, trying final fallback");
          return null;
      }
      return null;
  }

  // Final fallback (12Data)
  async function fetch12Data() {
      try {
          // Free plan allows 8 calls/day
          const promises = symbols.map(s => 
              fetch(`https://api.twelvedata.com/price?symbol=${s.symbol}&apikey=YOUR_12DATA_KEY`)
          );
          const responses = await Promise.all(promises);
          const data = await Promise.all(responses.map(r => r.json()));
          
          return responses.reduce((acc, response, index) => {
              if (response.price) {
                  acc[symbols[index].symbol] = {
                      price: parseFloat(response.price),
                      change: 0, // Fallback doesn't provide change data
                      changePercent: 0
                  };
              }
              return acc;
          }, {});
      } catch (error) {
          console.log("All APIs failed");
          return null;
      }
  }

  async function updateMarketData() {
      let data = await fetchYahooData() || 
                await fetchMarketStackData() || 
                await fetch12Data();

      symbols.forEach(indicator => {
          const valueElement = document.getElementById(`${indicator.name}-value`);
          const changeElement = document.getElementById(`${indicator.name}-change`);
          
          if (data?.[indicator.symbol]?.price) {
              const stock = data[indicator.symbol];
              valueElement.textContent = `$${stock.price.toFixed(2)}`;
              
              if (stock.change !== undefined && stock.changePercent !== undefined) {
                  changeElement.textContent = 
                      `${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`;
                  changeElement.style.color = stock.change >= 0 ? '#28a745' : '#dc3545';
              } else {
                  changeElement.textContent = '--';
              }
          } else {
              valueElement.textContent = 'Data unavailable';
              changeElement.textContent = '--';
          }
      });
  }

  // Initial load
  updateMarketData();

  // Refresh every 60 seconds
  setInterval(updateMarketData, 60000);

  // Manual refresh
  document.getElementById('refresh-btn')?.addEventListener('click', updateMarketData);
});