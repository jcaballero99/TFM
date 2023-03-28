function calcularImpuestos() {
    const patrimonio = document.getElementById("patrimonio").value;
  
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
  
    let resultado = "";
  
    territorios.forEach((territorio) => {
      let porcentajeTerritorio = 0;
      tramos.forEach((tramo, index) => {
        const [limiteInferior, limiteSuperior] = tramo;
        if (patrimonio >= limiteInferior && patrimonio <= limiteSuperior) {
          porcentajeTerritorio = territorio.tramos[index];
        }
      });
      resultado += `En ${territorio.nombre}, con un patrimonio de ${patrimonio} euros, pagarías un porcentaje de ${porcentajeTerritorio}.\n`;
});
// nosotros necesitamos 17 variables, los 17 tramos de cada comunidad 

document.getElementById("resultado").textContent = resultado;
}
  