document.addEventListener("DOMContentLoaded", async () => {
  // Fetch BLS data (CPI and Treasury)
  async function fetchEconomicData() {
      try {
          const response = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  seriesid: ['CUUR0000SA0', 'SUUR0000SA0'],
                  startyear: new Date().getFullYear().toString(),
                  endyear: new Date().getFullYear().toString()
              })
          });

          const data = await response.json();
          
          if (data.Results?.series) {
              data.Results.series.forEach(series => {
                  const latest = series.data[0];
                  const month = ['Jan','Feb','Mar','Apr','May','Jun',
                                 'Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(latest.period.replace('M',''))-1];
                  
                  if (series.seriesID === 'CUUR0000SA0') {
                      document.getElementById('cpi-value').textContent = 
                          `${latest.value}% (${month} ${latest.year})`;
                  } else if (series.seriesID === 'SUUR0000SA0') {
                      document.getElementById('treasury-value').textContent = 
                          `${latest.value}% (${month} ${latest.year})`;
                  }
              });
          }
      } catch (error) {
          console.error("BLS API Error:", error);
          document.getElementById('cpi-value').textContent = "3.2% (Fallback)";
          document.getElementById('treasury-value').textContent = "N/A";
      }
  }

  fetchEconomicData();
});