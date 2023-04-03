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

const wealthThresholds2 = [12450, 20200, 35200, 60000, 300000];

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
    //console.log('aqui',taxResults2)
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
    const taxPercentagesCalculatedEvent2 = new CustomEvent(
      "taxPercentagesCalculated2",
      { detail: { taxPercentages } }
    );
    document.dispatchEvent(taxPercentagesCalculatedEvent2);

    let resultsHtml = "<h2>Porcentajes de impuestos en IRPF:</h2><ul>";
    for (let region in taxPercentages) {
      resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
    }
    resultsHtml += "</ul>";

    resultsDiv.innerHTML = resultsHtml;
  });
});

const taxRates = {
  //Se definen las tasas impositivas para cada región
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
  Pais_Vasco: [0.2, 0.2, 0.2, 0.6, 1, 1.5, 1.75, 2],
};

const wealthThresholds = [
  // Se definen los umbrales de patrimonio para determinar el tramo al que pertenece un patrimonio
  167129,
  334252, 668499, 1000000, 2500000, 5300000, 10000000,
];

function findTaxBracket(wealth) {
  //Se inicializa una variable llamada bracketIndex en 0. Esta variable se usa para llevar un conteo del índice del tramo impositivo en el que se encuentra el patrimonio ingresado
  let bracketIndex = 0;
  for (let threshold of wealthThresholds) {
    // Se itera sobre cada umbral de patrimonio en el array wealthThresholds,Si el patrimonio ingresado es menor o igual al umbral actual (threshold), se rompe el bucle. Esto significa que se ha encontrado el tramo impositivo correcto para el patrimonio ingresado.
    if (wealth <= threshold) break; // Si el patrimonio es mayor al umbral actual, se incrementa el contador bracketIndex en 1. Esto indica que aún no se ha encontrado el tramo correcto y se debe continuar buscando en el siguiente.
    bracketIndex++;
  }
  return bracketIndex; // Una vez que se ha encontrado el tramo impositivo correcto, se devuelve el índice del tramo (bracketIndex).
}

function calculateTaxRates(wealth) {
  // Se llama a la función findTaxBracket para determinar el índice del tramo impositivo correspondiente al patrimonio ingresado.
  const bracketIndex = findTaxBracket(wealth);
  let taxResults = {}; //Se inicializa un objeto vacío llamado taxResults para almacenar los resultados
  // Se itera sobre cada región en el objeto taxRates.
  for (let region in taxRates) {
    // Se accede al array de tasas impositivas de la región actual (taxRates[region])y se obtiene la tasa impositiva correspondiente al índice del tramo impositivo encontrado anteriormente (bracketIndex).
    taxResults[region] = taxRates[region][bracketIndex];
  }
  // Una vez que se han obtenido las tasas impositivas para todas las regiones en el tramo impositivo encontrado, se devuelve el objeto taxResults con los resultado
  return taxResults;
}

// Espera a que el contenido de la página web esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene una referencia al botón "Calcular" usando su ID "calculateButton"
  const button = document.getElementById("calculateButton");
  // Obtiene una referencia al elemento 'div' donde se mostrarán los resultados, usando su ID "results"
  const resultsDiv = document.getElementById("results");
  // Declara una variable para almacenar los porcentajes de impuestos de cada región
  let taxPercentages = {};

  // Agrega un controlador de eventos al botón "Calcular" para ejecutar la función cuando se haga clic en él
  button.addEventListener("click", function () {
    // Obtiene el valor numérico ingresado en el campo de entrada "wealth" y lo convierte a un entero
    const wealth = parseInt(document.getElementById("wealth").value);
    // Llama a la función 'calculateTaxRates' con el valor de 'wealth' y guarda el objeto resultante en 'taxPercentages'
    taxPercentages = calculateTaxRates(wealth);
    const taxPercentagesCalculatedEvent = new CustomEvent(
      "taxPercentagesCalculated",
      { detail: { taxPercentages } }
    );
    document.dispatchEvent(taxPercentagesCalculatedEvent);

    //console.log('aqui2',taxPercentages)

    // Prepara el HTML para mostrar los resultados
    let resultsHtml = "<h2>Porcentajes de impuestos al Patrimonio:</h2><ul>";
    // Itera sobre las regiones en 'taxPercentages' y agrega cada porcentaje de impuesto al HTML de los resultados
    for (let region in taxPercentages) {
      resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
    }
    resultsHtml += "</ul>";

    // Establece el contenido HTML de 'resultsDiv' con el HTML de los resultados
    resultsDiv.innerHTML = resultsHtml;
  });
});

let finalPercentagesIP = {};
let finalPercentagesIRPF = {};
let calculationsDone = 0;

document.addEventListener("taxPercentagesCalculated", function (event) {
  const taxPercentagesPatrimonio = event.detail.taxPercentages;
  console.log("taxPercentagesPatrimonio", taxPercentagesPatrimonio);

  let taxPercentagesPatrimonioCopy = { ...taxPercentagesPatrimonio };
  for (let region in taxPercentagesPatrimonioCopy) {
    taxPercentagesPatrimonioCopy[region] += 1;
  }

  let lowestPercentage = Infinity;
  for (let region in taxPercentagesPatrimonioCopy) {
    if (taxPercentagesPatrimonioCopy[region] < lowestPercentage) {
      lowestPercentage = taxPercentagesPatrimonioCopy[region];
    }
  }

  let adjustedPercentagesIP = {};
  for (let region in taxPercentagesPatrimonioCopy) {
    adjustedPercentagesIP[region] =
      (lowestPercentage / taxPercentagesPatrimonioCopy[region]) * 100;
  }

  console.log("adjustedPercentagesIP", adjustedPercentagesIP);

  finalPercentagesIP = {};
  for (let region in adjustedPercentagesIP) {
    finalPercentagesIP[region] = adjustedPercentagesIP[region] * 0.3;
  }

  console.log("finalPercentagesIP", finalPercentagesIP);

  calculationsDone++;
  sumPercentages();
});

document.addEventListener("taxPercentagesCalculated2", function (event) {
  const taxPercentagesIRPF = event.detail.taxPercentages;
  console.log("taxPercentagesIRPF", taxPercentagesIRPF);

  let lowestPercentage2 = Infinity;
  for (let region in taxPercentagesIRPF) {
    if (taxPercentagesIRPF[region] < lowestPercentage2) {
      lowestPercentage2 = taxPercentagesIRPF[region];
    }
  }

  let adjustedPercentagesIRPF = {};
  for (let region in taxPercentagesIRPF) {
    adjustedPercentagesIRPF[region] =
      (lowestPercentage2 / taxPercentagesIRPF[region]) * 100;
  }

  console.log("adjustedPercentagesIRPF", adjustedPercentagesIRPF);

  finalPercentagesIRPF = {};
  for (let region in adjustedPercentagesIRPF) {
    finalPercentagesIRPF[region] = adjustedPercentagesIRPF[region] * 0.3;
  }

  console.log("finalPercentagesIRPF", finalPercentagesIRPF);

  calculationsDone++;
  sumPercentages();
});

let totaldatos = {
  Andalucia: 143.6,
  Aragon: 121.98,
  Asturias: 111.83,
  Baleares: 138.91,
  Canarias: 112.75,
  Cantabria: 149.85,
  C_Leon: 135.47,
  C_La_Mancha: 127.08,
  Cataluña: 167.96,
  C_Valenciana: 130.83,
  Extremadura: 115.16,
  Galicia: 142.88,
  Madrid: 201.06,
  Murcia: 132.38,
  Navarra: 157.55,
  Pais_Vasco: 169.86,
  La_Rioja: 126.29,
};

function sumPercentages() {
  if (calculationsDone === 2) {
    let puntosInversion = {};

    for (let region in finalPercentagesIP) {
      puntosInversion[region] = (
        finalPercentagesIP[region] +
        finalPercentagesIRPF[region] +
        totaldatos[region]
      ).toFixed(2);
    }

    console.log("puntosInversion", puntosInversion);
  }
}
