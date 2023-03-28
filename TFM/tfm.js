// function calcularImpuestos() {
//   const patrimonio = document.getElementById("patrimonio").value;
//   const tramos = [
//     [0, 167129],
//     [167130, 334252],
//     [334253, 668499],
//     [668500, 1000000],
//     [1000001, 2500000],
//     [2500001, 5300000],
//     [5300001, 10000000],
//     [10000001, Infinity],
//   ];

//   const territorios = [
//     {
//       nombre: "Cataluña",
//       tramos: [0.21, 0.315, 0.525, 0.945, 1.365, 1.785, 2.205, 3.2],
//     },
//     {
//       nombre: "Aragón",
//       tramos: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
//     },
//   ];

//   let menorImpuesto = Infinity;
//   let territorioMenorImpuesto = "";

//   territorios.forEach((territorio) => {
//     let impuestoTerritorio = 0;
//     tramos.forEach((tramo, index) => {
//       const [limiteInferior, limiteSuperior] = tramo;
//       if (patrimonio >= limiteInferior && patrimonio <= limiteSuperior) {
//         impuestoTerritorio += patrimonio * territorio.tramos[index];
//       } else if (patrimonio > limiteSuperior) {
//         impuestoTerritorio +=
//           (limiteSuperior - limiteInferior + 1) * territorio.tramos[index];
//       }
//     });
//     if (impuestoTerritorio < menorImpuesto) {
//       menorImpuesto = impuestoTerritorio;
//       territorioMenorImpuesto = territorio.nombre;
//     }
//   });

//   document.getElementById(
//     "resultado"
//   ).textContent = `El territorio en el que pagarías menos impuestos con un patrimonio de ${patrimonio} euros es ${territorioMenorImpuesto}.`;
// }

function calcularImpuestos() {
  const patrimonio = document.getElementById("patrimonio").value;
  //se define dos array que contiene rangos de patrimonio y sus correspondientes porcentajes de impuestos a pagar.
  const tramos = [
    [0, 167129],
    [167130, 334252],
    [334253, 668499],
    [668500, 1000000],
    [1000001, 2500000],
    [2500001, 5300000],
    [5300001, 10000000],
    [10000001, Infinity],
  ];

  const territorios = [
    {
      nombre: "Cataluña",
      tramos: [0.21, 0.315, 0.525, 0.945, 1.365, 1.785, 2.205, 3.2],
    },
    {
      nombre: "Aragón",
      tramos: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
    },
  ];
//se definen tres variables: "menorImpuesto" para almacenar el valor más bajo de impuestos a pagar, "territorioMenorImpuesto" para almacenar el nombre del territorio con el menor impuesto a pagar y "porcentajeMenorImpuesto" para almacenar el porcentaje de impuestos correspondiente al territorio con el menor impuesto.
  let menorImpuesto = Infinity;  //Esto se hace para que cualquier valor que se compare con esta variable sea menor que ella y pueda ser reemplazado por ese valor.
  let territorioMenorImpuesto = "";  // se utilizará para almacenar el nombre del territorio donde se pagaría menos impuesto.
  let porcentajeMenorImpuesto = 0;  //almacenar el porcentaje de impuesto que se pagaría en el territorio donde se paga menos impuesto.

  territorios.forEach((territorio) => {
    let impuestoTerritorio = 0; //almacenar el valor del impuesto que se pagaría en ese territorio
    let porcentajeTerritorio = 0; //almacenar el porcentaje de impuesto que se pagaría en ese territorio, para realizar la comparación y determinar el territorio donde se pagaría el menor impuesto
    tramos.forEach((tramo, index) => {  //recorrer tramos,cada elemento del array es una matriz de dos valores: el límite inferior y superior del tramo.
      const [limiteInferior, limiteSuperior] = tramo;
      if (patrimonio >= limiteInferior && patrimonio <= limiteSuperior) {
        impuestoTerritorio += patrimonio * territorio.tramos[index];
        porcentajeTerritorio = territorio.tramos[index];
      } else if (patrimonio > limiteSuperior) {
        impuestoTerritorio +=
          (limiteSuperior - limiteInferior + 1) * territorio.tramos[index];
      }
    //verificar si el patrimonio del contribuyente se encuentra dentro de los límites del tramo actual. Si el patrimonio está dentro del rango del tramo, se calcula el impuesto correspondiente multiplicando el patrimonio por el porcentaje del tramo actual y se almacena en la variable impuestoTerritorio. Además, el porcentaje del tramo actual se almacena en la variable porcentajeTerritorio.
    });
    if (impuestoTerritorio < menorImpuesto) {
      menorImpuesto = impuestoTerritorio;
      territorioMenorImpuesto = territorio.nombre;
      porcentajeMenorImpuesto = porcentajeTerritorio;
    }
  });
  //si el impuesto del territorio actual es menor que el impuesto del territorio con el impuesto más bajo encontrado hasta ahora. Si el impuesto actual es menor, entonces se actualizan las variables menorImpuesto, territorioMenorImpuesto y porcentajeMenorImpuesto con los valores correspondientes del territorio actual.

  document.getElementById(
    "resultado"
  ).textContent = `El territorio en el que pagarías menos impuestos con un patrimonio de ${patrimonio} euros es ${territorioMenorImpuesto}, con un porcentaje de ${porcentajeMenorImpuesto}.`;
}
