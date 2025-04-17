const url = 'https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=D5HMDJFXQI3R2IGX';
const cpi = document.querySelector('#cpi-value');

async function apiFetch() {
  try {
    cpi.textContent = 'Loading...'; // Show loading state
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.data) {
      throw new Error('Invalid data format from API');
    }
    
    displayCPI(data);
  } catch (error) {
    console.error('Error fetching CPI data:', error);
    cpi.textContent = 'Error loading data';
    // You could add more specific error messages based on error type
  }
}

function displayCPI(data) {
  try {
    if (data.data.length < 12) {
      throw new Error('Not enough data points (need at least 12 months)');
    }

    const currentValue = parseFloat(data.data[0].value);
    const yearAgoValue = parseFloat(data.data[11].value);
    
    if (isNaN(currentValue)) throw new Error('Current CPI value is not a number');
    if (isNaN(yearAgoValue)) throw new Error('Year-ago CPI value is not a number');
    
    const percentageChange = ((currentValue - yearAgoValue) / yearAgoValue) * 100;
    
    cpi.textContent = `${percentageChange.toFixed(2)}%`;
    
    // Color coding
    cpi.style.color = percentageChange > 0 ? 'red' : 
                     percentageChange < 0 ? 'green' : 'black';
    
  } catch (error) {
    console.error('Error processing CPI data:', error);
    cpi.textContent = 'Error processing data';
  }
}

apiFetch();