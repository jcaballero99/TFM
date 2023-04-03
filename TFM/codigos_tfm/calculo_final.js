let finalPercentagesIP = {};
let finalPercentagesIRPF = {};
let calculationsDone = 0;

document.addEventListener('taxPercentagesCalculated', function (event) {
    const taxPercentagesPatrimonio = event.detail.taxPercentages;
    console.log('taxPercentagesPatrimonio', taxPercentagesPatrimonio);

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
      adjustedPercentagesIP[region] = (lowestPercentage / taxPercentagesPatrimonioCopy[region]) * 100;
    }

    console.log('adjustedPercentagesIP', adjustedPercentagesIP);

    finalPercentagesIP = {};
    for (let region in adjustedPercentagesIP) {
      finalPercentagesIP[region] = adjustedPercentagesIP[region] * 0.3;
    }

    console.log('finalPercentagesIP', finalPercentagesIP);

    calculationsDone++;
    sumPercentages();
});

document.addEventListener('taxPercentagesCalculated2', function (event) {
    const taxPercentagesIRPF = event.detail.taxPercentages;
    console.log('taxPercentagesIRPF', taxPercentagesIRPF);

    let lowestPercentage2 = Infinity;
    for (let region in taxPercentagesIRPF) {
      if (taxPercentagesIRPF[region] < lowestPercentage2) {
        lowestPercentage2 = taxPercentagesIRPF[region];
      }
    }

    let adjustedPercentagesIRPF = {};
    for (let region in taxPercentagesIRPF) {
      adjustedPercentagesIRPF[region] = (lowestPercentage2 / taxPercentagesIRPF[region]) * 100;
    }

    console.log('adjustedPercentagesIRPF', adjustedPercentagesIRPF);

    finalPercentagesIRPF = {};
    for (let region in adjustedPercentagesIRPF) {
      finalPercentagesIRPF[region] = adjustedPercentagesIRPF[region] * 0.3;
    }

    console.log('finalPercentagesIRPF', finalPercentagesIRPF);

    calculationsDone++;
    sumPercentages();
});

let totaldatos = {
  "Andalucia": 143.60,
  "Aragon": 121.98,
  "Asturias": 111.83,
  "Baleares": 138.91,
  "Canarias": 112.75,
  "Cantabria": 149.85,
  "C_Leon": 135.47,
  "C_La_Mancha": 127.08,   
  "Cataluña": 167.96,
  "C_Valenciana": 130.83,
  "Extremadura": 115.16,
  "Galicia": 142.88,
  "Madrid": 201.06,
  "Murcia": 132.38,
  "Navarra": 157.55,
  "Pais_Vasco": 169.86,
  "La_Rioja": 126.29
};
function sumPercentages() {
  if (calculationsDone === 2) {
    let puntosInversion = {};

    for (let region in finalPercentagesIP) {
      puntosInversion[region] = (finalPercentagesIP[region] + finalPercentagesIRPF[region] + totaldatos[region]).toFixed(2);
    }

    console.log('puntosInversion', puntosInversion);
  }
}




