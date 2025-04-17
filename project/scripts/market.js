document.addEventListener("DOMContentLoaded", async () => {
  async function fetchCPI() {
      // Try BLS API first
      try {
          const response = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/CUUR0000SA0');
          const data = await response.json();
          
          if (data.Results?.series?.[0]?.data?.[0]) {
              const latest = data.Results.series[0].data[0];
              updateCPI(latest.value, latest.period, latest.year);
              return;
          }
      } catch (error) {
          console.log("BLS API failed, trying fallback");
      }

      // Fallback 1: FRED API (using your key)
      try {
          const fredKey = '217ec7b2484bdd3ca4e5f8443c6345a1';
          const response = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${fredKey}&limit=1&sort_order=desc`);
          const data = await response.json();
          
          if (data.observations?.[0]) {
              const latest = data.observations[0];
              updateCPI(latest.value, latest.date.substr(5, 2), latest.date.substr(0, 4));
              return;
          }
      } catch (error) {
          console.log("FRED API failed, trying final fallback");
      }

      // Final fallback: Static value
      updateCPI("3.2", (new Date().getMonth() + 1).toString().padStart(2, '0'), new Date().getFullYear());
  }

  function updateCPI(value, month, year) {
      const monthMap = {
          '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
          '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
          '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
          'M01': 'Jan', 'M02': 'Feb', 'M03': 'Mar', 'M04': 'Apr',
          'M05': 'May', 'M06': 'Jun', 'M07': 'Jul', 'M08': 'Aug',
          'M09': 'Sep', 'M10': 'Oct', 'M11': 'Nov', 'M12': 'Dec'
      };
      
      document.getElementById('cpi-value').textContent = 
          `${value}% (${monthMap[month] || month} ${year})`;
  }

  fetchCPI();
});