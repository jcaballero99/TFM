const taxRates = {
    Cataluña: [0.21, 0.315, 0.525, 0.945, 1.365, 1.785, 2.205, 3.2],
    Aragon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    Baleares: [0.28, 0.41, 0.69, 1.24, 1.79, 2.35, 2.9, 3.45],
    Asturias: [0.22, 0.33, 0.56, 1.02, 1.48, 1.97, 2.48, 3],
    Extremadura: [0.3, 0.45, 0.75, 1.35, 1.95, 2.55, 3.15, 3.75],
    C_La_Mancha: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    C_Leon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    Cantabria: [0.24, 0.36, 0.61, 1.09, 1.57, 2.06, 2.54, 3.03],
    Andalucia: [0, 0, 0, 0, 0, 0, 0, 0],
    C_Valenciana: [0.25, 0.37, 0.62, 1.12, 1.62, 2.12, 2.62, 3.5],
    Murcia: [0.24, 0.36, 0.6, 1.08, 1.56, 2.04, 2.52, 3],
    Galicia: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    Navarra: [0.16, 0.24, 0.4, 0.72, 1.04, 1.36, 1.68, 2],
    La_Rioja: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    Canarias: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    Madrid: [0, 0, 0, 0, 0, 0, 0, 0],
    Pais_Vasco: [0.2, 0.2, 0.2, 0.6, 1, 1.5, 1.75, 2]
  };
  
  const wealthThresholds = [
    167129,
    334252,
    668499,
    1000000,
    2500000,
    5300000,
    10000000,
  ];
  
  function findTaxBracket(wealth) {
    let bracketIndex = 0;
    for (let threshold of wealthThresholds) {
      if (wealth <= threshold) break;
      bracketIndex++;
    }
    return bracketIndex;
  }
  
  function calculateTaxRates(wealth) {
    const bracketIndex = findTaxBracket(wealth);
    let taxResults = {};
  
    for (let region in taxRates) {
      taxResults[region] = taxRates[region][bracketIndex];
      console.log('aqui',taxResults)
    }
  
    return taxResults;
   
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("calculateButton");
    const resultsDiv = document.getElementById("results");
    let taxPercentages = {};
  
    button.addEventListener("click", function () {
      const wealth = parseInt(document.getElementById("wealth").value);
      taxPercentages = calculateTaxRates(wealth);
  
      let resultsHtml = "<h2>Porcentajes de impuestos al Patrimonio:</h2><ul>";
      for (let region in taxPercentages) {
        resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
      }
      resultsHtml += "</ul>";
  
      resultsDiv.innerHTML = resultsHtml;
    });
  });
  

















