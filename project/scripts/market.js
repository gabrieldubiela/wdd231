document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = 'cG9sW2aaaUz5ycrPRYRm8bbZzqxVHZp5';
  const BASE_URL = 'https://financialmodelingprep.com/api/v3';

  // Helper: Fetch and display stock index data
  function fetchIndex(symbol, valueId, changeId) {
    fetch(`${BASE_URL}/quote/${symbol}?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          const value = Number(data[0].price).toLocaleString('en-US');
          const change = `${data[0].changesPercentage.toFixed(2)}%`;
          document.getElementById(valueId).textContent = value;
          document.getElementById(changeId).textContent = change;
        }
      })
      .catch(err => console.error(`Error fetching ${symbol}:`, err));
  }

  // Fetch Consumer Price Index (CPI)
  function fetchCPI() {
    fetch(`${BASE_URL}/economic_indicators/cpi?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          document.getElementById("cpi-value").textContent = `${data[0].value}% (${data[0].date})`;
        }
      })
      .catch(err => console.error("Error fetching CPI:", err));
  }

  // Fetch Federal Reserve Interest Rate
  function fetchInterestRate() {
    fetch(`${BASE_URL}/economic_indicators/fed_funds_rate?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          document.getElementById("fedrate-value").textContent = `${data[0].value}% (${data[0].date})`;
        }
      })
      .catch(err => console.error("Error fetching interest rate:", err));
  }

  // Execute fetches
  fetchIndex('^IXIC', 'nasdaq-value', 'nasdaq-change');     // Nasdaq Composite
  fetchIndex('^DJI', 'dowjones-value', 'dowjones-change'); // Dow Jones
  fetchCPI();
  fetchInterestRate();
});