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
  
  document.getElementById('comparisonForm').addEventListener('submit', function(e) { 
    e.preventDefault(); 
    const aP = parseFloat(document.getElementById('aPrincipal').value); 
    const aM = parseFloat(document.getElementById('aMonthly').value); 
    const aR = parseFloat(document.getElementById('aRate').value) / 100 / 12;
    const aY = parseInt(document.getElementById('aYears').value);
  
    const bP = parseFloat(document.getElementById('bPrincipal').value); 
    const bM = parseFloat(document.getElementById('bMonthly').value); 
    const bR = parseFloat(document.getElementById('bRate').value) / 100 / 12;
    const bY = parseInt(document.getElementById('bYears').value);
  
    const nA = aY * 12;
    const nB = bY * 12;
  
    let aTotal = aP * Math.pow(1 + aR, nA); 
    for (let i = 1; i <= nA; i++) { 
      aTotal += aM * Math.pow(1 + aR, nA - i); 
    }
  
    let bTotal = bP * Math.pow(1 + bR, nB); 
    for (let i = 1; i <= nB; i++) { 
      bTotal += bM * Math.pow(1 + bR, nB - i); 
    }
  
    let winner = aTotal > bTotal ? "Investment A" : "Investment B";
    document.getElementById('comparisonResult').innerHTML = `
      <p>Investment A after ${aY} years: $${aTotal.toFixed(2)}</p>
      <p>Investment B after ${bY} years: $${bTotal.toFixed(2)}</p>
      <p><strong>Better return: ${winner}</strong></p>`; 
  });