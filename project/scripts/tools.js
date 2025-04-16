
    // Compound Interest
    document.getElementById('compoundForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const P = parseFloat(document.getElementById('compoundPrincipal').value);
      const M = parseFloat(document.getElementById('compoundMonthly').value);
      const r = parseFloat(document.getElementById('compoundRate').value) / 100 / 12;
      const n = parseInt(document.getElementById('compoundYears').value) * 12;

      let total = P * Math.pow(1 + r, n);
      for (let i = 1; i <= n; i++) {
        total += M * Math.pow(1 + r, n - i);
      }

      document.getElementById('compoundResult').innerHTML = `<p>Total after ${n / 12} years: $${total.toFixed(2)}</p>`;
    });

    // Retirement Estimator
    document.getElementById('retirementForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const currentAge = parseInt(document.getElementById('currentAge').value);
      const retirementAge = parseInt(document.getElementById('retirementAge').value);
      const years = retirementAge - currentAge;
      const P = parseFloat(document.getElementById('currentSavings').value);
      const M = parseFloat(document.getElementById('retirementMonthly').value);
      const r = parseFloat(document.getElementById('retirementRate').value) / 100 / 12;
      const n = years * 12;

      let total = P * Math.pow(1 + r, n);
      for (let i = 1; i <= n; i++) {
        total += M * Math.pow(1 + r, n - i);
      }

      document.getElementById('retirementResult').innerHTML = `<p>Estimated retirement savings by age ${retirementAge}: $${total.toFixed(2)}</p>`;
    });

    // Comparison Tool
    document.getElementById('comparisonForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const aP = parseFloat(document.getElementById('aPrincipal').value);
      const aR = parseFloat(document.getElementById('aRate').value) / 100;
      const bP = parseFloat(document.getElementById('bPrincipal').value);
      const bR = parseFloat(document.getElementById('bRate').value) / 100;
      const y = parseInt(document.getElementById('compareYears').value);

      const aTotal = aP * Math.pow(1 + aR, y);
      const bTotal = bP * Math.pow(1 + bR, y);

      let winner = aTotal > bTotal ? "Investment A" : "Investment B";

      document.getElementById('comparisonResult').innerHTML = `
        <p>Investment A after ${y} years: $${aTotal.toFixed(2)}</p>
        <p>Investment B after ${y} years: $${bTotal.toFixed(2)}</p>
        <p><strong>Better return: ${winner}</strong></p>
      `;
    });