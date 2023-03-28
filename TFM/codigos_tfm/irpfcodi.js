const taxirpf = {
    Cataluña: [21.5, 26, 33.5, 40, 46, 48],
    Aragon: [19.5, 24.5, 35, 40.5, 46, 47.5],
    Baleares: [19, 23.75, 31, 38.5, 45.5, 47],
    Asturias: [19.5, 22, 31, 38.5, 45, 48],
    Extremadura: [19, 24.5, 31.5, 42, 47, 47.5],
    C_La_Mancha: [19, 24, 30, 37, 45, 45],
    C_Leon: [19, 24, 29, 37, 44, 44],
    Cantabria: [19, 24, 32, 40.5, 46.5, 48],
    Andalucia: [19.25, 24, 30, 37.4, 43, 47.4],
    C_Valenciana: [19.5, 25, 33, 42, 46.5, 49],
    Murcia: [19.4, 24.24, 30.06, 37.68, 45.8, 45.8],
    Galicia: [19, 23.75, 30.5, 37, 43, 45],
    Navarra: [21.5, 28, 32, 41.5, 49, 52],
    La_Rioja: [18.5, 23.6, 30, 37.5, 46, 48],
    Canarias: [18.5, 23.5, 33.5, 42, 44.5, 46.5],
    Madrid: [18.5, 23.2, 28.3, 36.4, 43.5, 43.5],
    Pais_Vasco: [22, 30, 35, 42, 46.5, 49],   
  };
  
  
  const wealthThresholds2 = [
    12450,
    20200,
    35200,
    60000,
    300000,
  ];
  
  function findTaxBracket(wealth) {
    let bracketIndex = 0;
    for (let threshold of wealthThresholds2) {
      if (wealth <= threshold) break;
      bracketIndex++;
    }
    return bracketIndex;
  }
  
  function calculateTaxirpf(wealth) {
    const bracketIndex = findTaxBracket(wealth);
    let taxResults2 = {};
  
    for (let region in taxirpf) {
      taxResults2[region] = taxirpf[region][bracketIndex];
      console.log('aqui',taxResults2)
    }
  
    return taxResults2;
   
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("calculateButton2");
    const resultsDiv = document.getElementById("results2");
    let taxPercentages = {};
  
    button.addEventListener("click", function () {
      const wealth = parseInt(document.getElementById("wealth2").value);
      taxPercentages = calculateTaxirpf(wealth);
  
      let resultsHtml = "<h2>Porcentajes de impuestos en IRPF:</h2><ul>";
      for (let region in taxPercentages) {
        resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
      }
      resultsHtml += "</ul>";
  
      resultsDiv.innerHTML = resultsHtml;
    });
  });
  
