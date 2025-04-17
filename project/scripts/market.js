try {
  const response = await fetch(`${baseUrl}/quote/^IXIC,^DJI,^GSPC?apikey=${api_key}`, options);
  if (response.status === 403) {
      throw new Error('API key rejected - check your subscription');
  }
  document.addEventListener("DOMContentLoaded", () => {
    const api_key = 'cG9sW2aaaUz5ycrPRYRm8bbZzqxVHZp5';
    const url = 'https://financialmodelingprep.com/api/v3';
  
    // Helper function to fetch and display data
    async function fetchData(endpoint, elementId, formatFn) {
      try {
        const response = await fetch(`${url}/${endpoint}?apikey=${api_key}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data && data[0]) {
          document.getElementById(elementId).textContent = formatFn(data[0]);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        document.getElementById(elementId).textContent = "Data unavailable";
      }
    }
  
    // Fetch stock indices
    fetchData('quote/^IXIC', 'nasdaq-value', data => `$${data.price.toLocaleString()}`);
    fetchData('quote/^IXIC', 'nasdaq-change', data => `${data.changesPercentage.toFixed(2)}%`);
    
    fetchData('quote/^DJI', 'dowjones-value', data => `$${data.price.toLocaleString()}`);
    fetchData('quote/^DJI', 'dowjones-change', data => `${data.changesPercentage.toFixed(2)}%`);
    
    fetchData('quote/^GSPC', 'sp500-value', data => `$${data.price.toLocaleString()}`);
    fetchData('quote/^GSPC', 'sp500-change', data => `${data.changesPercentage.toFixed(2)}%`);
  
    // Fetch economic indicators
    fetchData('economic/cpi', 'cpi-value', data => `${data.value}% (${new Date(data.date).toLocaleDateString()})`);
    fetchData('economic/fedfundsrate', 'fedrate-value', data => `${data.value}% (${new Date(data.date).toLocaleDateString()})`);
  });
}