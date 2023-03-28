function f_calcular_sueldo_neto(bruto_anual, categoria_profesional, irpf)
{
    var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(bruto_anual, categoria_profesional);
    var cuota_acumulado_anio =  (cuota_mensual_pagar * 12);

    return bruto_anual - irpf - cuota_acumulado_anio;
}

function f_calcular_tipo_medio_sobre_rendimiento_neto( bruto_anual, categoria_profesional, irpf)
{
    var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(bruto_anual, categoria_profesional);
    var cuota_acumulado_anio = (cuota_mensual_pagar * 12);
    var rendimiento_neto =  bruto_anual - cuota_acumulado_anio;

    return ((irpf * 100)/rendimiento_neto);

}

function f_calcular_minimo_descendientes(hijos_menores_25_anos)
{
    if(hijos_menores_25_anos == 0)
        return 0;
    else if(hijos_menores_25_anos == 1)
        return 2400;
    else if(hijos_menores_25_anos == 2)
        return (2400 + 2700);
    else if(hijos_menores_25_anos == 3)
        return (2400 + 2700 + 4000);
    else if(hijos_menores_25_anos == 4)
        return (2400 + 2700 + 4000 + 4500);
    else
        return ((2400 + 2700 + 4000 + 4500) + (4500 * (hijos_menores_25_anos - 4)));
}

function f_calcular_deduccion_400_euros(base_imponible)
{
    if(base_imponible > 12000)
       return 0;
    else if (base_imponible < 8000)
        return 400;
    else
        return (400-((base_imponible - 8000)*0.1));
}

function f_calcular_tramos_base_liquidable_comunidad(base_imponible, comunidad, datos){
    var datos = {
        // (*) ESTATAL
        '0':[
            [0, 12450, 9.5],
            [12450, 20200, 12],
            [20200, 35200, 15],
            [35200, 60000, 18.5],
            [60000, 300000, 22.5],
            [300000, 999999999999, 24.5],
        ],
        //AndalucÃ­a
        '1':[
           [0, 12450, 9.5],
           [12450, 20200, 12],
           [20200, 28000, 15],
           [28000, 35200, 15.6],
           [35200, 50000, 18.7],
           [50000, 60000, 18.9],
           [60000, 120000, 22.9],
           [120000, 999999999999, 23.7],
        ],
        // AragÃ³n
        '2':[
            [0, 12450, 10],
            [12450, 20200, 12.5],
            [20200, 34000, 15.5],
            [34000, 50000, 19],
            [50000, 60000, 21],
            [60000, 70000, 22],
            [70000, 90000, 22.5],
            [90000, 130000, 23.5],
            [130000, 150000, 24.5],
            [150000, 999999999999, 25],
        ],
        // Asturias
        '3':[
            [0, 12450, 10],
            [12450, 17707.2, 12],
            [17707.2, 33007.2, 14],
            [33007.2, 53407.2, 18.5],
            [53407.2, 70000, 21.5],
            [70000, 90000, 22.5],
            [90000, 175000, 25],
            [175000, 999999999999, 25.5],
        ],

        // Baleares
        '4':[
           [0, 10000, 9.5],
           [10000, 18000, 11.75],
           [18000, 30000, 14.75],
           [30000, 48000, 17.75],
           [48000, 70000, 19.25],
           [70000, 90000, 22],
           [90000, 120000, 23],
           [120000, 175000, 24],
           [175000, 999999999999, 25],
        ],

        // Canarias
        '5':[
            [0, 12450.01, 9],
            [12450.01, 17707.21, 11.5],
            [17707.21, 33007.21, 14],
            [33007.21, 53407.21, 18.5],
            [53407.21, 90000.01, 23.5],
            [90000.01, 120000, 25],
            [120000.01, 999999999999, 26],
        ],

        // Cantabria
        '6':[
            [0, 12450, 9.5],
            [12450, 20200, 12],
            [20200, 34000, 15],
            [34000, 46000, 18.5],
            [46000, 60000, 19.5],
            [60000, 90000, 24.5],
            [90000, 999999999999, 25.5],
        ],

        // Castilla y LeÃ³n
        '7':[
           [0, 12450, 9.5],
           [12450, 20200, 12],
           [20200, 35200, 14],
           [35200, 53407.20, 18.5],
           [53407.20, 999999999999, 21.5],
        ],

        // Castilla-La Mancha
        '8':[
            [0, 12450, 9.5],
            [12450, 20200, 12],
            [20200, 35200, 15],
            [35200, 60000, 18.5],
            [60000, 999999999999, 22.5],
           ],

        // CataluÃ±a
       '9':[
               [0, 17707.2, 12],
               [17707.2, 33007.2, 14],
               [33007.2, 53407.2, 18.5],
               [53407.2, 90000, 21.5],
               [90000, 120000.2, 23.5],
               [120000.2, 175000.2, 24.5],
               [175000.2, 999999999999, 25.5],
        ],


        // Comunidad Valenciana
        '10':[
               [0, 12450, 10],
               [12450, 17000, 11],
               [17000, 30000, 13.9],
               [30000, 50000, 18],
               [50000, 65000, 23.5],
               [65000, 80000, 24.5],
               [80000, 120000, 25],
               [120000, 140000, 25.5],
               [140000, 175000, 27.5],
               [175000, 999999999999, 29.5],
        ],

        // Extremadura
        '11':[
               [0, 12450, 9.5],
               [12450, 20200, 12.5],
               [20200, 24200, 15.5],
               [24200, 35200, 16.5],
               [35200, 60000, 20.5],
               [60000, 80200, 23.5],
               [80200, 99200, 24],
               [99200, 120200, 24.5],
               [120200, 999999999999, 25],
           ],
        // Galicia
        '12':[
           [0, 12450, 9.5],
           [12450, 20200, 11.75],
           [20200, 27700, 15.5],
           [27700, 35200, 17],
           [35200, 47600, 18.5],
           [47600, 60000, 20.5],
           [60000, 999999999999, 22.5],
        ],
        // La Rioja
        '13':[
           [0, 12450, 9],
           [12450, 20200, 11.6],
           [20200, 35200, 14.6],
           [35200, 50000, 18.8],
           [50000, 60000, 19.5],
           [60000, 120000, 25],
           [120000, 999999999999, 27],
           ],


        //
        // Madrid
        '14':[
           [0, 12450, 9],
           [12450, 17707, 11.2],
           [17707, 33007, 13.3],
           [33007, 53407, 17.9],
           [53407, 999999999999, 21],
        ],

        // Murcia
        '15':[
           [0, 12450, 9.7],
           [12450, 20200, 11.72],
           [20200, 34000, 14.18],
           [34000, 60000, 18.54],
           [60000, 999999999999, 22.9],
        ],
          // Navarra
        '16':[
            [0, 12450, 12],
            [12450, 20200, 16],
            [20200, 34000, 17],
            [34000, 60000, 23],
            [60000, 999999999999, 26.5],
         ],
           // Pais Vasco 
        '17':[
            [0, 12450, 12.5],
            [12450, 20200, 18],
            [20200, 34000, 20],
            [34000, 60000, 23],
            [60000, 999999999999, 24.5],
         ]

    };

    var totalTramos = 0;
    if ( datos[comunidad] != 'undefined' ){
        dComunidad = datos[comunidad];
        for (var i=0; i<dComunidad.length; i++) {
                var tramo = 0;
                //Ãºltimo
                if (i== (dComunidad.length-1) ){
                    if (base_imponible > dComunidad[i][0] )
                        tramo = (base_imponible - dComunidad[i][0]);
                    else
                        tramo = 0;
                }
                else{
                    if (base_imponible > dComunidad[i][0] ) {
                        if ( base_imponible <= dComunidad[i][1] )
                            tramo = (base_imponible - dComunidad[i][0]);
                        else
                            tramo = dComunidad[i][1] - dComunidad[i][0];
                    }
                    else
                        tramo = 0;

                }

                tramo = (tramo < 0) ? 0 : tramo;
                totalTramos = totalTramos + ( (tramo*dComunidad[i][2])/100 );
            }//for
    }//if

    return totalTramos;
}

function calcularTramosParaTodasLasComunidades(base_imponible) {
    var datos = {
      // (*) ESTATAL
      // ...
    };
  
    var resultados = {};
  
    for (const comunidad in datos) {
      if (datos.hasOwnProperty(comunidad)) {
        resultados[comunidad] = f_calcular_tramos_base_liquidable_comunidad(
          base_imponible,
          comunidad,
          datos
        );
      }
    }
  
    return resultados;
}
let base_imponible = 40000
let tramosComunidades = calcularTramosParaTodasLasComunidades(base_imponible);
console.log(tramosComunidades)



function f_calcular_tramos_base_liquidable(base_liquidable) {
    // tramo 1
    if(base_liquidable < 12450)
        var tramo_1 = base_liquidable * 0.19;
    else
        var tramo_1 = 12450 * 0.19;

    //tramo 2, si hay exceso en el tramo
    if(base_liquidable < 12450)
        var tramo_2 = 0;
    else
    {
        if(base_liquidable > 20200)
            var tramo_2 = ((20200 - 12450)*0.24);
        else
            var tramo_2 = ((base_liquidable - 12450)*0.24);
    }

    //tramo 3, si hay exceso en el tramo
    if(base_liquidable < 20200)
        var tramo_3 = 0;
    else
    {
        if(base_liquidable > 35200)
            var tramo_3 = ((35200 - 20200)*0.3);
        else
            var tramo_3 = ((base_liquidable - 20200)*0.3);
    }

    //tramo 4, si hay exceso en el tramo
    if(base_liquidable < 35200)
        var tramo_4 = 0;
    else
    {
        if(base_liquidable > 60000)
            var tramo_4 = ((60000 - 35200)*0.37);
        else
            var tramo_4 = ((base_liquidable - 35200)*0.37);
    }


    //tramo 5, ultimo tramo
    if(base_liquidable < 60000)
        var tramo_5 = 0;
    else
        var tramo_5 = ((base_liquidable - 60000)*0.45);

    //devuelvo el sumatorio de todos los tramos!!!!
    return tramo_1+tramo_2+tramo_3+tramo_4+tramo_5;
}


function f_calcular_minimo_personal(datos) {

    var hijos_menores_25_anos =  datos['hijos_menores_25_anos'];
    var ascendente_mayor_65_menor_75 = datos['ascendente_mayor_65_menor_75'];
    var ascendente_mayor_75 = datos['ascendente_mayor_75'];
    var divisor_para_minimos_deduccion_ascendientes = datos['divisor_para_minimos_deduccion_ascendientes'];
    divisor_para_minimos_deduccion_ascendientes = (divisor_para_minimos_deduccion_ascendientes > 0) ? divisor_para_minimos_deduccion_ascendientes : 1;

    var hijos_en_exclusiva    = datos['hijos_en_exclusiva'];
    var minusvalia_33_al_65   = datos['minusvalia_33_al_65'];
    var minusvalia_sup_al_65  = datos['minusvalia_sup_al_65'];
    var hijos_menores_3_anos = datos['hijos_menores_3_anos'];
    var menor_65_con_discapacidad_cargo = datos['menor_65_con_discapacidad_cargo'];
    var descendientes_con_minusvalia_33_al_65 = datos['descendientes_con_minusvalia_33_al_65'];
    var descendientes_con_minusvalia_sup_al_65 = datos['descendientes_con_minusvalia_sup_al_65'];
    var ascendientes_con_minusvalia_33_al_65 = datos['ascendientes_con_minusvalia_33_al_65'];
    var ascendientes_con_minusvalia_sup_al_65 = datos['ascendientes_con_minusvalia_sup_al_65'];
    var edad = datos['edad'];

    var minimo_personal = 0;

    var minimo_descendientes = f_calcular_minimo_descendientes(hijos_menores_25_anos);
    //hijos en exclusiva
    if(hijos_en_exclusiva) {
        var minimo_hijos_beneficiarios = minimo_descendientes;
    } else  {
        var minimo_hijos_beneficiarios = (minimo_descendientes/2);
    }
    minimo_personal +=  minimo_hijos_beneficiarios;


    var minimo_hijos_menores_3_anos  = (hijos_menores_3_anos * 2800);
    if(hijos_en_exclusiva)   {
        var minimo_hijos_menores_3_anos_beneficiarios = minimo_hijos_menores_3_anos;
    } else  {
        var minimo_hijos_menores_3_anos_beneficiarios = (minimo_hijos_menores_3_anos/2);
    }
    minimo_personal +=  minimo_hijos_menores_3_anos_beneficiarios;


    /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
    var minimo_ascendente_mayor_65_menor_75    = ((ascendente_mayor_65_menor_75 * 1150)/divisor_para_minimos_deduccion_ascendientes);
    minimo_personal +=  minimo_ascendente_mayor_65_menor_75;

    var minimo_ascendente_mayor_75             = ((ascendente_mayor_75 * 2550)/divisor_para_minimos_deduccion_ascendientes);
    minimo_personal +=  minimo_ascendente_mayor_75;

    var minimo_menor_65_con_discapacidad_cargo = ((menor_65_con_discapacidad_cargo * 1150)/ divisor_para_minimos_deduccion_ascendientes);
    minimo_personal +=  minimo_menor_65_con_discapacidad_cargo;



    /* Minusvalias  */
    var minimo_descendientes_con_minusvalia_33_al_65 = (descendientes_con_minusvalia_33_al_65 * 3000);
    if(hijos_en_exclusiva)  {
        var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios = minimo_descendientes_con_minusvalia_33_al_65;
    } else  {
        var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios = (minimo_descendientes_con_minusvalia_33_al_65/2);
    }
    minimo_personal += minimo_descendientes_con_minusvalia_33_al_65_beneficiarios;



    var minimo_descendientes_con_minusvalia_sup_al_65 = (descendientes_con_minusvalia_sup_al_65 * 12000);
    if(hijos_en_exclusiva) {
        var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios = minimo_descendientes_con_minusvalia_sup_al_65;
    } else {
        var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios = (minimo_descendientes_con_minusvalia_sup_al_65/2);
    }
    minimo_personal += minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios;

    /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
    var minimo_ascendientes_con_minusvalia_33_al_65 = ((ascendientes_con_minusvalia_33_al_65 * 3000)/divisor_para_minimos_deduccion_ascendientes);
    minimo_personal += minimo_ascendientes_con_minusvalia_33_al_65;

    var minimo_ascendientes_con_minusvalia_sup_al_65 = ((ascendientes_con_minusvalia_sup_al_65 * 12000)/divisor_para_minimos_deduccion_ascendientes);
    minimo_personal += minimo_ascendientes_con_minusvalia_sup_al_65;

    /* Si esta selccionado la opcion "MinusvalÃ­a entre el 33% y el 65%" tiene un valor fijo en caso contrario el dato es 0 */
    if(minusvalia_33_al_65) {
        var minimo_minusvalia_33_al_65 = 3000;
    }  else {
        var minimo_minusvalia_33_al_65 = 0;
    }
    minimo_personal += minimo_minusvalia_33_al_65;


    /* Si esta selccionado la opcion "MinusvalÃ­a superior al 65% o con movilidad reducida" tiene un valor fijo en caso contrario el dato es 0 */
    if(minusvalia_sup_al_65) {
        var minimo_minusvalia_sup_al_65 = 12000;
    } else {
        var minimo_minusvalia_sup_al_65 = 0;
    }

    minimo_personal += minimo_minusvalia_sup_al_65;

    /* Edad */
    var minimoEdad = 0;
    if (edad <= 65)    {
        minimoEdad = 5550;
    } else if(edad > 75) {
        minimoEdad =  (5550 + 1150 + 1400);
    } else {
        minimoEdad =  (5550 + 1150);
    }
    minimo_personal += minimoEdad;
    return minimo_personal;
}




function f_calcuar_cuota_mensual_pagar(bruto_anual, categoria_profesional)
{
    // cÃ¡lculo para Pensionistas
    if (categoria_profesional == 'PENSIONISTA') {
        return 0;
    }

    var datos = {
        A:[{min: 1466.40, max: 4070.10}],
        B:[{min: 1215.90, max: 4070.10}],
        C:[{min: 1057.8, max: 4070.10}],
        D:[{min: 1050, max: 4070.10}],
        E:[{min: 1050, max: 4070.10}],
        F:[{min: 1050, max: 4070.10}],
        G:[{min: 1050, max: 4070.10}],
        H:[{min: 770, max: 2984.74}],
        I:[{min: 770, max: 2984.74}],
        J:[{min: 770, max: 2984.74}],
        K:[{min: 770, max: 2984.74}]};

    var cuota_mensual_pagar = 0;
    if((bruto_anual/12) <  datos[categoria_profesional][0].min)
    {
        cuota_mensual_pagar = (datos[categoria_profesional][0].min * 0.0635);
    }
    else if((bruto_anual/12) >  datos[categoria_profesional][0].max)
    {
        cuota_mensual_pagar = (datos[categoria_profesional][0].max * 0.0635);
    }
    else
    {
        if (categoria_profesional == 'J'){
            cuota_mensual_pagar = ((bruto_anual/12) * 0.0192);
        }
        else
            cuota_mensual_pagar = ((bruto_anual/12) * 0.0635);
    }
    return cuota_mensual_pagar;
}

function f_calcular_reduccion_rendimiento_neto(rendimiento_neto, categoria_profesional)
{
    var movilidad_geografica    = (document.getElementById("movilidad_geografica")!= null) ? document.getElementById("movilidad_geografica").checked : false;
    var minusvalia_33_al_65     = (document.getElementById("minusvalia_33_al_65") != null) ? document.getElementById("minusvalia_33_al_65").checked : false;
    var minusvalia_sup_al_65    = (document.getElementById("minusvalia_sup_al_65") != null) ? document.getElementById("minusvalia_sup_al_65").checked : false;
    var hijos_menores_25        = (document.getElementById("hijos_menores_25_anos") != null) ? document.getElementById("hijos_menores_25_anos").value : 0;

    if(rendimiento_neto <= 13115)
        var reduccion_rendimiento_neto = 5565
    else if(rendimiento_neto >= 16825)
        var reduccion_rendimiento_neto = 0;
    else
        var reduccion_rendimiento_neto = (5565-(1.5*(rendimiento_neto - 13115)));

    var reduccion_comun_todos = 2000;
    var incremento_prolongacion_vida_laboral = 0;

    //si el check de movilidad_geografica esta seleccionado
    if(movilidad_geografica)
        var incremento_movilidad_geografica = reduccion_comun_todos;
    else
        var incremento_movilidad_geografica = 0;

    if(minusvalia_33_al_65 && categoria_profesional != 'PENSIONISTA')
        var minusvalia_igual_superior_33 = 3500;
    else
        var minusvalia_igual_superior_33 = 0;

    if(minusvalia_sup_al_65  && categoria_profesional != 'PENSIONISTA')
        var minusvalia_sup_65_o_movilidad_reducida = 7750;
    else
        var minusvalia_sup_65_o_movilidad_reducida = 0;

    var reduccion_tener_mas_dos_hijos = 0;
    // if (hijos_menores_25 > 2 )
    //     var reduccion_tener_mas_dos_hijos = 600;

    //por el momento no tenemos los calculos para desempleados o pensionistas
    var reduccion_desempleado = 0;
    var reduccion_pesionista  = 0;

    return (reduccion_rendimiento_neto + reduccion_comun_todos + incremento_prolongacion_vida_laboral + incremento_movilidad_geografica + minusvalia_igual_superior_33 + minusvalia_sup_65_o_movilidad_reducida + reduccion_desempleado + reduccion_pesionista+ reduccion_tener_mas_dos_hijos);
}

function f_calcular_base_imponible(bruto_anual, categoria_profesional, bruto_anual_flex)
{
    var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(bruto_anual, categoria_profesional);
    var cuota_acumulado_anio = (cuota_mensual_pagar * 12);
    var rendimiento_neto = bruto_anual - cuota_acumulado_anio;
    var reduccion_rendimiento_neto = f_calcular_reduccion_rendimiento_neto(rendimiento_neto, categoria_profesional);
    var base_imponible = bruto_anual - cuota_acumulado_anio - reduccion_rendimiento_neto;

    if (typeof bruto_anual_flex != 'undefined'){
        var base_imponible = bruto_anual_flex - cuota_acumulado_anio - reduccion_rendimiento_neto;
    }

    //PENSIONISTAS
    if (categoria_profesional == 'PENSIONISTA'){
        base_imponible = base_imponible - 600;
    }

    if(base_imponible < 0) return 0;
    else return base_imponible.toFixed(2);
}


function f_calcular_base_imponible_aportaciones (bruto_anual, categoria_profesional){
    var base_imponible = f_calcular_base_imponible(bruto_anual, categoria_profesional);

    // planes de pensiones
    var planes_pensiones =0;

    return (base_imponible-planes_pensiones);
}


function f_calcula_limite_pensionistas(tipo_contribuyente, hijos_menores_25_anos, tipo_medio_sobre_rendimiento_neto, bruto_anual){
    var valores = {
            A:[{0:600,      1:14866,    2:16403}],
            B:[{0:14296,   1:15585,   2:17738}],
            C:[{0:12600,   1:13207,   2:13875}],
        };

    var tipo = (hijos_menores_25_anos <= 1) ? hijos_menores_25_anos : 2;
    var valorTipoContribuyente = valores[tipo_contribuyente][0];

    var tipo_limite = 0;
    if (tipo_contribuyente == 'A' ){
        if (hijos_menores_25_anos == 0)
            tipo_limite = tipo_medio_sobre_rendimiento_neto;
        else
            tipo_limite = (bruto_anual<= valorTipoContribuyente[tipo]) ? 0 : tipo_medio_sobre_rendimiento_neto;
    }
    else {
        tipo_limite = (bruto_anual<= valorTipoContribuyente[tipo]) ? 0 : tipo_medio_sobre_rendimiento_neto;
    }

    tipo_limite = (tipo_limite < 0) ? 0 : tipo_limite;
    limite = valorTipoContribuyente[tipo];

    return {'l': limite, 'tl':tipo_limite};
}

/**
* Detecta la pulsaciÃ³n de la tecla return o intro...
*/
function ponerFoco()        {
    var el = document.getElementById('bruto_anual');
    if(el)
        el.focus();
}

function f_mostar_por_consola(literal, value)        {
    console.log(literal+"="+value);
}

function f_muestra_error(error){
    var div_error = document.getElementById("error");
    div_error.innerHTML = error;
    document.getElementById("calcular_nomina").scrollIntoView();

    //oculta la capa resultados
    if (document.getElementById('resultados_calculadora_nomina') != null){
        document.getElementById('resultados_calculadora_nomina').classList.toggle('oculto');
    }
}

/**
* Detecta la pulsaciÃ³n de la tecla return o intro...
*/
function checkSubmit(e)        {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;
    if (keycode == 13 || keycode == 3) {
        f_calcular_resultado();
    }
}


function f_calcula_pension_bruta(elemento){
    if (elemento.id == 'bruto_anual'){

        valor = f_format_string_to_number(elemento.value);
        document.getElementById("bruto_mensual").value = formatNumber((valor/14).toFixed(0));
        elemento.value = formatNumber(valor);
    }
    if (elemento.id == 'bruto_mensual'){
        valor = f_format_string_to_number(elemento.value);
        document.getElementById("bruto_anual").value = formatNumber((valor*14).toFixed(0));
        elemento.value = formatNumber(valor)
    }

}

function f_comunidades_autonomas (){   //Desplegable elección comunidad
    var ca = [];
    ca[1] = ["1","Andaluci­a"];
    ca[2] = ["2","Aragon"];
    ca[3] = ["3","Asturias"];
    ca[4] = ["4","Baleares"];
    ca[5] = ["5","Canarias"];
    ca[6] = ["6","Cantabria"];
    ca[7] = ["7","Castilla y Leon"];
    ca[8] = ["8","Castilla-La Mancha"];
    ca[9] = ["9","Cataluña"];
    ca[10] = ["10","Comunidad Valenciana"];
    ca[11] = ["11","Extremadura"];
    ca[12] = ["12","Galicia"];
    ca[13] = ["13","La Rioja"];
    ca[14] = ["14","Comunidad de Madrid"];
    ca[15] = ["15","Region de Murcia"];
    ca[16] = ["16", "Navarra"]; 
    ca[17] = ["17", "País Vasco"]

    return ca;
}


function f_carga_comunidades(idElemento){
    document.getElementById(idElemento).innerHTML = '';
    ca =  f_comunidades_autonomas();
    for (i in ca){
        ele = document.createElement('option');
        ele.value = i;
        ele.text = ca[i][1];
        document.getElementById(idElemento).appendChild(ele);
    }
}

function f_gastos_admCentral(){
    var gasto =  {
        1: {    'n': 'Servicios pÃºblicos generales',
                'i': '58097',
                'sc': [
                    ['Ã“rganos ejecutivos y legislativos ',15747],
                    ['Ayuda econÃ³mica extranjera',513],
                    ['Servicios generales',2877],
                    ['InvestigaciÃ³n bÃ¡sica',4861],
                    ['I+D en relaciÃ³n con los servicios pÃºblicos generales',236],
                    ['Servicios pÃºblicos generales n.e.c.',274],
                    ['Intereses de la deuda pÃºblica',33589],
                    //['Transferencias entre Administraciones',0],

                ],
         },
        2: {    'n': 'Defensa', 'i': '10904',
                'sc':[
                        ['Defensa militar',9533],
                        //['Defensa civil',0],*
                        ['Ayuda militar en el extranjero',1141],
                        ['I+D Defensa',230],
                        //['Defensa n.e.c.',0],
                    ]
            },
        3: {    'n': 'Orden pÃºblico y seguridad', 'i': '16101',
                'sc':[
                        ['Servicios de policÃ­a',9724],
                        ['Servicios de protecciÃ³n contra incendios',473],
                        ['Tribunales de justicia',3812],
                        ['Prisiones',1923],
                        //['I+D en orden pÃºblico y seguridad',0],
                        ['Otros',169]
                    ]
             },
        4: { 'n': 'Asuntos econÃ³micos', 'i': '31216',
                'sc':[
                        ['Asuntos grales de economÃ­a, comerciales y laborales',7310],
                        ['Agricultura, silvicultura, pesca y caza',3434],
                        ['Combustible y energÃ­a  ',4116],
                        ['Minas, fabricaciÃ³n y construcciÃ³n  ',367],
                        ['Transporte ',9484],
                        ['ComunicaciÃ³n   ',671],
                        ['Otras industrias   ',1514],
                        ['I+D en asuntos econÃ³micos  ',3915],
                        ['Otros  ',405]
                    ]
           },
        5: { 'n': 'ProtecciÃ³n del medio ambiente', 'i': '2607',
                'sc':[
                        ['GestiÃ³n de los residuos',266],
                        ['GestiÃ³n de las aguas residuales',435],
                        ['ReducciÃ³n de la contaminaciÃ³n  ',122],
                        ['ProtecciÃ³n de la diversidad y del paisaje  ',793],
                        ['I+D en protecciÃ³n ambiental',417],
                        ['Otros  ',574]
                    ]
            },
        6: { 'n': 'Vivienda y servicios comunitarios', 'i': '1706',
                'sc':[
                        ['Desarrollo de la comunidad ',798],
                        ['Desarrollo de la vivienda  ',104],
                        ['Abastecimiento de agua ',612],
                        //['Alumbrado pÃºblico  ',0],
                        ['I+D en servicios a la comunidad y la vivienda  ',124],
                        ['Servicios de la comunidad y la vivienda n.e.c. ',68]
                    ]
            },
        7: { 'n': 'Salud', 'i': '65179',
                'sc':[
                        ['Equipo, instrumental y productos mÃ©dicos   ',11111],
                        ['Servicios a pacientes externos + Servicios hospitalarios   ',50179],
                        ['Servicios de salud pÃºblica ',718],
                        ['I+D en salud',2718],
                        ['Otros  ',453]
                    ]
            },
        8: { 'n': 'Ocio, cultura y religiÃ³n', 'i': '5044',
                'sc':[
                        ['Servicios deportivos y de ocio ',444],
                        ['Servicios culturales   ',1727],
                        ['Servicios de ediciÃ³n y radiofusiÃ³n ',2098],
                        ['Servicios religiosos y otros servicios comunitarios',552],
                        ['I+D en ocio, cultura y religiÃ³n',110],
                        ['Otros  ',113],
                    ]
            },
        9: { 'n': 'EducaciÃ³n', 'i': '42621',
                'sc':[
                        ['EducaciÃ³n prescolar y primaria',15736],
                        ['EducaciÃ³n Secundaria',16701],
                        ['EducaciÃ³n postsecundaria, no terciaria',3],
                        ['EducaciÃ³n de tercer ciclo',6319],
                        ['EducaciÃ³n no reglada por niveles',713],
                        ['Servicios complementarios a la educaciÃ³n',1210],
                        ['I+D en educaciÃ³n',779],
                        ['Otros',1160]
                    ]
            },
        10: { 'n': 'ProtecciÃ³n social', 'i': '28427',
                'sc':[
                        ['Enfermedad e incapacidad',4054],
                        ['Vejez',14453],
                        ['Supervivientes (Viudedad)',2254],
                        ['Familia y niÃ±os',3490],
                        ['Desempleo',709],
                        ['Vivienda',287],
                        ['ExclusiÃ³n social   ',2438],
                        ['I+D en protecciÃ³n social',3],
                        ['Otros',739],
                    ]
            },
        T: { 'n': 'TOTALES', 'i': '196723'},
    }

    return gasto;
}

function f_crearElemento(tipo, clase, id){
    var elemento   = document.createElement(tipo);
    elemento.className = clase;
    if (id!='' && typeof id != 'undefined'){
        elemento.id = id;
    }
    return elemento;
}

function f_cal_oculto_visible(id, clase){
    if (document.getElementById(id) != null){
        document.getElementById(id).classList.toggle(clase);
    }
}

function f_cal_valida_datos(){
    //datos por defecto, combos y checks

        var respuesta = {
            'num_decimales': 2,
            'categoria_profesional': (document.getElementById("categoria_profesional")!=null) ? document.getElementById("categoria_profesional").value : 'A',
            'hijos_en_exclusiva': (document.getElementById("hijos_en_exclusiva")!=null) ? document.getElementById("hijos_en_exclusiva").checked : false,
            'minusvalia_33_al_65': (document.getElementById("minusvalia_33_al_65")!=null) ? document.getElementById("minusvalia_33_al_65").checked : false,
            'minusvalia_sup_al_65': (document.getElementById("minusvalia_sup_al_65")!=null) ? document.getElementById("minusvalia_sup_al_65").checked : false,
            'comunidad_autonoma': (document.getElementById("comunidad_autonoma")!=null) ? document.getElementById("comunidad_autonoma").value : '',
        };

        /* Start: Validacion del formulario */
        if (document.getElementById("bruto_anual") != null){
            var bruto_anual = f_format_string_to_number(document.getElementById("bruto_anual").value);
            if((isNaN(bruto_anual)) || (bruto_anual <= 0)) {
                f_muestra_error("El sueldo bruto anual no es un dato correcto");
                return false;
            }
            respuesta['bruto_anual'] = bruto_anual;
        }

        var edad = 30;
        if (document.getElementById("edad") != null){
            var edad = f_format_string_to_number(document.getElementById("edad").value);
            if((isNaN(edad)) || (edad <= 0)){
                f_muestra_error("La edad no es un dato correcto");
                return false;
            }
        }
        respuesta['edad'] = edad;

        /* para evitar datos absurdos como hijos menores de 25 = -1 */
        var hijos_menores_25_anos = 0;
        if (document.getElementById("hijos_menores_25_anos") != null){
            var hijos_menores_25_anos = f_format_string_to_number(document.getElementById("hijos_menores_25_anos").value);
            if((isNaN(hijos_menores_25_anos))) {
                f_muestra_error("El nÃºmero de hijos menores de 25 aÃ±os no es un dato correcto");
                return false;
            }
            if(hijos_menores_25_anos < 0) {
                hijos_menores_25_anos = 0;
                document.getElementById("hijos_menores_25_anos").value = hijos_menores_25_anos;
            }
        }
        respuesta['hijos_menores_25_anos'] = hijos_menores_25_anos;

        var hijos_menores_3_anos = 0;
        if (document.getElementById("hijos_menores_3_anos") != null){
            var hijos_menores_3_anos = f_format_string_to_number(document.getElementById("hijos_menores_3_anos").value);
            if((isNaN(hijos_menores_3_anos))) {
                f_muestra_error("El nÃºmero de hijos menores de 3 aÃ±os no es un dato correcto");
                return false;
            }
            if(hijos_menores_3_anos < 0) {
                hijos_menores_3_anos = 0;
                document.getElementById("hijos_menores_3_anos").value = hijos_menores_3_anos;
            }
        }
        respuesta['hijos_menores_3_anos'] = hijos_menores_3_anos;

        var ascendente_mayor_65_menor_75 = 0;
        if (document.getElementById("ascendente_mayor_65_menor_75") != null){
            var ascendente_mayor_65_menor_75 = f_format_string_to_number(document.getElementById("ascendente_mayor_65_menor_75").value);
            if((isNaN(ascendente_mayor_65_menor_75))) {
                f_muestra_error("El nÃºmero de mayores de 65 aÃ±os y menores de 75 aÃ±os a cargo no es un dato correcto");
                return false;
            }
            if(ascendente_mayor_65_menor_75 < 0) {
                ascendente_mayor_65_menor_75 = 0;
                document.getElementById("ascendente_mayor_65_menor_75").value = ascendente_mayor_65_menor_75;
            }
        }
        respuesta['ascendente_mayor_65_menor_75'] = ascendente_mayor_65_menor_75;

        var ascendente_mayor_75 = 0;
        if (document.getElementById("ascendente_mayor_75") != null){
            var ascendente_mayor_75 = f_format_string_to_number(document.getElementById("ascendente_mayor_75").value);
            if((isNaN(ascendente_mayor_75)))  {
                f_muestra_error("El nÃºmero de ascendientes mayores de 75 aÃ±os a cargo no es un dato correcto");
                return false;
            }
            if(ascendente_mayor_75 < 0)        {
                ascendente_mayor_75 = 0;
                document.getElementById("ascendente_mayor_75").value = ascendente_mayor_75;
            }
        }
        respuesta['ascendente_mayor_75'] = ascendente_mayor_75;

        var menor_65_con_discapacidad_cargo = 0;
        if (document.getElementById("menor_65_con_discapacidad_cargo") != null){
            var menor_65_con_discapacidad_cargo = f_format_string_to_number(document.getElementById("menor_65_con_discapacidad_cargo").value);
            if((isNaN(menor_65_con_discapacidad_cargo)))   {
                f_muestra_error("El nÃºmero de menores de 65 aÃ±os a cargo con discapacidad a cargo no es un dato correcto");
                return false;
            }
            if(menor_65_con_discapacidad_cargo < 0)        {
                menor_65_con_discapacidad_cargo = 0;
                document.getElementById("menor_65_con_discapacidad_cargo").value = menor_65_con_discapacidad_cargo;
            }
        }
        respuesta['menor_65_con_discapacidad_cargo'] = menor_65_con_discapacidad_cargo;

        var numero_personas_deduccion_ascendientes = 0;
        if (document.getElementById("numero_personas_deduccion_ascendientes") != null){
            var numero_personas_deduccion_ascendientes = f_format_string_to_number(document.getElementById("numero_personas_deduccion_ascendientes").value);
            if((isNaN(numero_personas_deduccion_ascendientes)))        {
                f_muestra_error("El nÃºmero de contribuyentes que aplican los mÃ­nimos por ascendiente no es un dato correcto");
                return false;
            }
            if(numero_personas_deduccion_ascendientes < 0)  {
                numero_personas_deduccion_ascendientes = 0;
                document.getElementById("numero_personas_deduccion_ascendientes").value = numero_personas_deduccion_ascendientes;
            }
        }
        respuesta['numero_personas_deduccion_ascendientes'] = numero_personas_deduccion_ascendientes;


        //NOTA: este valor se emplea como divisor (en los calculos de mÃ­nimos) no puede ser 0
        if(numero_personas_deduccion_ascendientes > 0)
            var divisor_para_minimos_deduccion_ascendientes = numero_personas_deduccion_ascendientes;
        else
            var divisor_para_minimos_deduccion_ascendientes = 1;

        respuesta['divisor_para_minimos_deduccion_ascendientes'] = divisor_para_minimos_deduccion_ascendientes;

        var descendientes_con_minusvalia_33_al_65 = 0;
        if (document.getElementById("descendientes_con_minusvalia_33_al_65") != null){
            var descendientes_con_minusvalia_33_al_65 = f_format_string_to_number(document.getElementById("descendientes_con_minusvalia_33_al_65").value);
            if((isNaN(descendientes_con_minusvalia_33_al_65)))  {
                f_muestra_error("El nÃºmero de descendientes con grado de minusvalÃ­a entre 33% y 65%  no es un dato correcto");
                return false;
            }
            if(descendientes_con_minusvalia_33_al_65 < 0)  {
                descendientes_con_minusvalia_33_al_65 = 0;
                document.getElementById("descendientes_con_minusvalia_33_al_65").value = descendientes_con_minusvalia_33_al_65;
            }
        }
        respuesta['descendientes_con_minusvalia_33_al_65'] = descendientes_con_minusvalia_33_al_65;

        var descendientes_con_minusvalia_sup_al_65 = 0;
        if (document.getElementById("descendientes_con_minusvalia_sup_al_65") != null){
            var descendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(document.getElementById("descendientes_con_minusvalia_sup_al_65").value);
            if((isNaN(descendientes_con_minusvalia_sup_al_65)))  {
                f_muestra_error("El nÃºmero de descendientes con grado de minusvalÃ­a superior al 65% no es un dato correcto");
                return false;
            }
            if(descendientes_con_minusvalia_sup_al_65 < 0)  {
                descendientes_con_minusvalia_sup_al_65 = 0;
                document.getElementById("descendientes_con_minusvalia_sup_al_65").value = descendientes_con_minusvalia_sup_al_65;
            }
        }
        respuesta['descendientes_con_minusvalia_sup_al_65'] = descendientes_con_minusvalia_sup_al_65;

        var ascendientes_con_minusvalia_33_al_65 = 0;
        if (document.getElementById("ascendientes_con_minusvalia_33_al_65") != null){
            var ascendientes_con_minusvalia_33_al_65 = f_format_string_to_number(document.getElementById("ascendientes_con_minusvalia_33_al_65").value);
            if((isNaN(ascendientes_con_minusvalia_33_al_65)))     {
                f_muestra_error("El nÃºmero de ascendientes con grado de minusvalÃ­a >=33% y <65% no es un dato correcto");
                return false;
            }
            if(ascendientes_con_minusvalia_33_al_65 < 0) {
                ascendientes_con_minusvalia_33_al_65 = 0;
                document.getElementById("ascendientes_con_minusvalia_33_al_65").value = ascendientes_con_minusvalia_33_al_65;
            }
        }
        respuesta['ascendientes_con_minusvalia_33_al_65'] = ascendientes_con_minusvalia_33_al_65;

        var ascendientes_con_minusvalia_sup_al_65 = 0;
        if (document.getElementById("ascendientes_con_minusvalia_sup_al_65") != null){
            var ascendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(document.getElementById("ascendientes_con_minusvalia_sup_al_65").value);
            if((isNaN(ascendientes_con_minusvalia_sup_al_65)))   {
                f_muestra_error("El nÃºmero de ascendientes con grado de minusvalÃ­a >=65% no es un dato correcto");
                return false;
            }
            if(ascendientes_con_minusvalia_sup_al_65 < 0)  {
                ascendientes_con_minusvalia_sup_al_65 = 0;
                document.getElementById("ascendientes_con_minusvalia_sup_al_65").value = ascendientes_con_minusvalia_sup_al_65;
            }
        }
        respuesta['ascendientes_con_minusvalia_sup_al_65'] = ascendientes_con_minusvalia_sup_al_65;




        /* End: validaciÃ³n del formulario */

        return respuesta;
}

// ------------
// DEDUCCIONES
// ------------
function f_cal_valida_datos_deducciones(respuesta){

        var planes_pensiones = f_format_string_to_number(document.getElementById("planes_pensiones").value);
        if((isNaN(planes_pensiones)) || (planes_pensiones < 0)) {
            f_muestra_error("El importe de planes pensiones no es un dato correcto");
            return false;
        }
        respuesta['planes_pensiones'] = planes_pensiones;


        var vivienda_habitual = f_format_string_to_number(document.getElementById("vivienda_habitual").value);
        if((isNaN(vivienda_habitual)) || (vivienda_habitual < 0)) {
            f_muestra_error("El importe vivienda habitual no es un dato correcto");
            return false;
        }
        respuesta['vivienda_habitual'] = vivienda_habitual;


        var ong_entidad_1 = f_format_string_to_number(document.getElementById("ong_entidad_1").value);
        if((isNaN(ong_entidad_1)) || (ong_entidad_1 < 0)) {
            f_muestra_error("El importe donaciones entidad 1 no es un dato correcto");
            return false;
        }
        respuesta['ong_entidad_1'] = ong_entidad_1;
        respuesta['ong_entidad_1_aportado'] = document.getElementById("ong_entidad_1_aportado").checked;


        var ong_entidad_2 = f_format_string_to_number(document.getElementById("ong_entidad_2").value);
        if((isNaN(ong_entidad_2)) || (ong_entidad_2 < 0)) {
            f_muestra_error("El importe donaciones entidad 2 no es un dato correcto");
            return false;
        }
        respuesta['ong_entidad_2'] = ong_entidad_2;
        respuesta['ong_entidad_2_aportado'] = document.getElementById("ong_entidad_2_aportado").checked;


        var ong_entidad_3 = f_format_string_to_number(document.getElementById("ong_entidad_3").value);
        if((isNaN(ong_entidad_3)) || (ong_entidad_3 < 0)) {
            f_muestra_error("El importe donaciones entidad 3 no es un dato correcto");
            return false;
        }
        respuesta['ong_entidad_3'] = ong_entidad_3;
        respuesta['ong_entidad_3_aportado'] = document.getElementById("ong_entidad_3_aportado").checked;


    return respuesta;

}


function f_cal_valida_datos_retribuciones_flexibles(){
    var respuesta = {
            'num_decimales': 2,
            'categoria_profesional': 'A',
        };

    if (document.getElementById("bruto_anual") != null){
        var bruto_anual = f_format_string_to_number(document.getElementById("bruto_anual").value);
        if((isNaN(bruto_anual)) || (bruto_anual <= 0)) {
            f_muestra_error("El sueldo bruto anual no es un dato correcto");
            return false;
        }
        respuesta['bruto_anual'] = bruto_anual;
    }

    /* para evitar datos absurdos como hijos menores de 25 = -1 */
    var hijos_menores_25_anos = 0;
    if (document.getElementById("hijos_menores_25_anos") != null){
        var hijos_menores_25_anos = f_format_string_to_number(document.getElementById("hijos_menores_25_anos").value);
        if((isNaN(hijos_menores_25_anos))) {
            f_muestra_error("El nÃºmero de hijos menores de 25 aÃ±os no es un dato correcto");
            return false;
        }
        if(hijos_menores_25_anos < 0) {
            hijos_menores_25_anos = 0;
            document.getElementById("hijos_menores_25_anos").value = hijos_menores_25_anos;
        }
    }
    respuesta['hijos_menores_25_anos'] = hijos_menores_25_anos;

    var hijos_menores_3_anos = 0;
    if (document.getElementById("hijos_menores_3_anos") != null){
        var hijos_menores_3_anos = f_format_string_to_number(document.getElementById("hijos_menores_3_anos").value);
        if((isNaN(hijos_menores_3_anos))) {
            f_muestra_error("El nÃºmero de hijos menores de 3 aÃ±os no es un dato correcto");
            return false;
        }
        if(hijos_menores_3_anos < 0) {
            hijos_menores_3_anos = 0;
            document.getElementById("hijos_menores_3_anos").value = hijos_menores_3_anos;
        }
    }
    respuesta['hijos_menores_3_anos'] = hijos_menores_3_anos;

    var gasto_guarderia = f_format_string_to_number(document.getElementById("gasto_guarderia").value);
    if((isNaN(gasto_guarderia)) || gasto_guarderia<0 ) {
        f_muestra_error("El importe mensual de guarderÃ­a no es un dato correcto");
        return false;
    }
    respuesta['gasto_guarderia'] = gasto_guarderia;


    

    return respuesta;
}
