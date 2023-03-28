/**
 * Fecha creacion :: 2015-11-19
 * 
 * compendio de funcionalidades genericas de las calculadoras, como formateos, redondeos, etc
 * no operaciones especificas de cada herramienta (calculadora)
 * 
 * Autor :: David Castro
 * BU :: cincodias
 */



/**
* Trunca (no redondea) un number a los digitos enviados
* param: num, double, valor a convertir
* param: digits, double, valor a convertir
* return String: cadena truncada al numero de digitos
*/
var truncateNumber = function (num, digits)
{
  num +='';
  //ojo, tengo que forzar a decimal siempre
  if(num.indexOf(".") == -1)
  {
    //convierto al tipo number con 2 decimales
    num = f_format_string_to_number(num).toFixed(digits);
    num +='';
  }
  
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr[1].substring(0,digits);
  
  if(digits == 0)
    return splitLeft;
  else
    return splitLeft + "." +splitRight;
};//end truncateNumber

/**
* Calcula el porcentaje del valor frente al total, pasados como parametros, con precision decimal
* @param total int
* @param valor int
* @param num_dec int, precision decimal
* @return number, devuelve un number con precision decimal
*/
var getPercent = function(total, valor, num_dec)
{
  return ((100 * valor)/total).toFixed(num_dec);
}

/**
* Devuelve el valor mayor del array enviado como parametro
* @param numArray, array
* @return number
*/
var getMaxOfArray =  function(numArray) {
  return Math.max.apply(null, numArray);
} //end function getMaxOfArray


/**
* convierte una cadena a objeto Number
* param: dato, string
* return: NaN o Number object
*/
var f_format_string_to_number = function(dato)
{
  return new Number(dato.replace(".", "").replace(",", "."));
}

/**
* Formatea el number enviado como parametro al formato: x.xxx.xxx,xx
* @param num, number
* @retrun string
*/
var formatNumber = function (num){
  var separador = '.'; 
  var sepDecimal = ',';
  num +='';
  
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) 
  {
    splitLeft = splitLeft.replace(regx, '$1' + separador + '$2');
  }
  return splitLeft  +splitRight;
}; //end function formatNumber

/**
 * Marcado de la pÃ¡gina
 * @param {string} identificador marcado 
 */
function f_cal_marcado(valor){
    try {                
        DTM.trackEvent(DTM.events.FORMSUCESS, {formAnalysis:valor});
    }
    catch(err) {
        console.log('DTM no existe,  '+valor);
    }
}