document.addEventListener("DOMContentLoaded", function () {
  const cpiSpan = document.getElementById("cpi-value");
  const fedRateSpan = document.getElementById("fedrate-value"); // caso queira mostrar outro indicador (opcional)

  const headers = {
    "Content-Type": "application/json"
  };

  const requestBody = JSON.stringify({
    seriesid: ["CUUR0000SA0", "SUUR0000SA0"], // CPI-U All Urban Consumers e um segundo índice de exemplo
    startyear: "2023",
    endyear: "2025"
  });

  fetch("https://api.bls.gov/publicAPI/v1/timeseries/data/", {
    method: "POST",
    headers: headers,
    body: requestBody
  })
    .then(response => response.json())
    .then(data => {
      if (data.status !== "REQUEST_SUCCEEDED") {
        cpiSpan.textContent = "Erro ao carregar dados.";
        fedRateSpan.textContent = "Erro ao carregar dados.";
        return;
      }

      data.Results.series.forEach(series => {
        const latest = series.data.find(item => item.value !== "");
        const label = `${latest.value} (${latest.year}-${latest.period})`;

        if (series.seriesID === "CUUR0000SA0") {
          cpiSpan.textContent = label;
        } else if (series.seriesID === "SUUR0000SA0") {
          fedRateSpan.textContent = label;
        }
      });
    })
    .catch(error => {
      console.error("Erro ao buscar dados do BLS:", error);
      cpiSpan.textContent = "Erro na requisição.";
      fedRateSpan.textContent = "Erro na requisição.";
    });
});
