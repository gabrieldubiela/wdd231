// Optimized JavaScript for your market page
async function fetchCPI() {
  try {
    const response = await fetch('https://api.bls.gov/v2/timeseries/data/CUUR0000SA0?api_key=DEMO_KEY');
    const data = await response.json();
    
    // Extract latest CPI value (customized to the API's response structure)
    const latestCPI = data.Results.series[0].data[0].value;
    document.getElementById('cpi-value').textContent = `${latestCPI}% (${new Date().toLocaleDateString()})`;
  } catch (error) {
    console.error("CPI Fetch Error:", error);
    document.getElementById('cpi-value').textContent = "3.2% (Fallback)"; // Graceful fallback
  }
}