/*
USO:
var areaGraphID = new AreaGraph({                           // Â¡Â¡Â¡el ID de la variable SIEMPRE diferente!!!
    div: 'areaGraphWrapper',                                // string: id del grÃ¡fico contenedor del svg
    valueGraph: 851,                                        // number: si sabemos el id del Ã­ndice que se quiere pintar, lo ponemos aquí­
    period: false,                                          // boolean: true para periodo de 1mes-2aÃ±os y false para dÃ­a
    periodId: 'day',                                        // string: 'day', 'month_1', halfYear_6', 'year_12', 'bianual_24'
    minigraph: true,                                        // boolean: por defecto viene a false para pintar todo el grÃ¡fico, true si sÃ³lo se quiere pintar una lÃ­nea con el valor del dÃ­a y otra horizontal con el valor de ayer
    graphName: 'Ibex 35',                                   // string: nombre del grÃ¡fico para que se pinte en minigraph y bigGraph
    bigGraph: true,                                         // boolean: por defecto viene a false para pintar todo el grÃ¡fico, true si sÃ³lo se quiere pintar una lÃ­nea con el valor del dÃ­a y otra horizontal con el valor de ayer, mÃ¡s algunos datos como los Ãºltimos 5 dÃ­as, Ãºltimo aÃ±o y el Ãºltimo precio
    graphUrl: '/datosmercados/materias/02/2/2.js2'          // string: url para pintar grÃ¡ficos directamente llamado con AJAX a este json, porque no se conoce el valor o porque no estÃ¡ en el array de valores del javascript
    itemUrl: '/mercados/bolsa/ibex_35/582/'                 // url del Ã­ndice, empresa, materia....
    variacionNum: true/false								// la variaciÃ³n serÃ¡ nÃºmero, no porcentual.
});
No todas las opciones son necesarias, ver https://confluence.t-prisa.com/pages/viewpage.action?pageId=9273508
*/
(function() {
    function AreaGraph(options) {
  
        this.options = options;
  
        /* Urls del detalle de los Ã­ndices principales */
  this.detalleIndices = {
            'ibex35':["/mercados/bolsa/ibex_35/582/","Ver Ibex"],
            'eurostoxx':["/mercados/bolsa/eurostoxx_50/1321/","Ver Eurostoxx"],
            'dowjones':["/mercados/bolsa/dow_jones/2523/","Ver Dow Jones"]
        };
  
  
        /* Array con los posibles valores que pueden tener las grÃ¡ficas, para coger la url a travÃ©s de la opciÃ³n that.valueGraph */
        this.urlObject = {
            582:"/datosmercados/indices/48/582/582.js2",
            2523:"/datosmercados/indices/E4/2523/2523.js2",
            896:"/datosmercados/indices/83/896/896.js2",
            1321:"/datosmercados/indices/2E/1321/1321.js2",
            4915:"/datosmercados/indices/46/4915/4915.js2",
            55626:"/datosmercados/indices/24/55626/55626.js2",
            851:"/datosmercados/indices/56/851/851.js2",
            56561:"/datosmercados/indices/CE/56561/56561.js2",
            1668:"/datosmercados/indices/8A/1668/1668.js2",
            4951:"/datosmercados/indices/6A/4951/4951.js2",
            41:"/datosmercados/divisas/29/41/41.js2",
            1:"/datosmercados/materias/01/1/1.js2",
            2:"/datosmercados/materias/02/2/2.js2",
            3:"/datosmercados/materias/03/3/3.js2",
            4:"/datosmercados/materias/04/4/4.js2"
        };
        /* locale es una variable interna de d3 que pinta las cosas en formato americano (month/day/year o separa los miles con coma y los decimales con punto...). La sobreescribimos para que pinte las cosas en formato de EspaÃ±a */
        this.localeFormatter = d3.locale({
            'decimal': ',',
            'thousands': '.',
            'grouping': [3],
            'currency': ['', 'â‚¬'],
            'dateTime': '%a, %e %b %Y, %X',
            'date': '%d.%m.%Y',
            'time': '%H:%M:%S',
            'periods': ['AM', 'PM'],
            'days': ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
            'shortDays': ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
            'months': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            'shortMonths': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
        });
        /* Un par de constantes que se aÃ±aden a las urls para consumir los datos de los json necesarios para pintar las grÃ¡ficas */
        this.periodString = '_2_anios';
        this.periodLastPoint = '_ultimo_valor';
        /* Recogemos el valor de la url si lo hemos puesto en opciones, si no, viene vacÃ­o y la construÃ­mos a travÃ©s de this.valueGraph */
        this.graphUrl = (typeof(options.graphUrl) != 'undefined') ? options.graphUrl : '';
        // Url data
        this.jsonUrl = (this.graphUrl !== '') ? this.graphUrl : this.urlObject[options.valueGraph].replace('.js2', '').replace(this.periodString, '') + ((!!this.period) ? this.periodString : '') + '.js2';
  
  
    // Carga los datos de cotizaciÃ³n y pinta el grÃ¡fico
        var that = this;
        d3.json(this.jsonUrl, function(error, data) {
            that.initializeAreaGraph(error, data);
            return data;
        });
  
    } // function AreaGraph
  
  
  
    AreaGraph.prototype = {
  
        initializeAreaGraph: function(error, data) {
  
            var that =  this;
  
            /* Incluimos las opciones que vienen desde el html en la plantilla */
            this.div = document.getElementById(this.options.div);
  
            this.valueGraph = this.options.valueGraph;
            this.period = this.options.period;
            this.periodId = this.options.periodId;
            this.minigraph = (typeof(this.options.minigraph) != 'undefined') ? this.options.minigraph : false;
            this.bigGraph = (typeof(this.options.bigGraph) != 'undefined') ? this.options.bigGraph : false;
            this.graphName = (typeof(this.options.graphName) != 'undefined') ? this.options.graphName : '';
            this.graphSub = (typeof(this.options.graphSub) != 'undefined') ? this.options.graphSub : '';
            this.itemUrl = (typeof(this.options.itemUrl) != 'undefined') ? this.options.itemUrl : '';
  
            /* Primer selector de d3 para meter en una variable del prototipo el div padre de la grÃ¡fica a travÃ©s del id pasado por las opciones [El nombre se corresponde con la clase que tenga luego al pintarse en el html, y si la variable comienza con "svg" es porque estÃ¡ dentro del svg, si no, es un elemento diferente, como un <div> o un <p>] */
            this.svgWrapper = d3.select(this.div)
                .classed('loading', true);
  
            if (error) {
                this.showError();
                return false;
            }
  
            /* MÃ¡rgenes, width y height para el grÃ¡fico, OJO con el responsive, que se calcula con esto */
            graphMargin = (!this.minigraph) ? {top: 10, right: 45, bottom: 30, left: 0} : {top: 5, right: 0, bottom: 5, left: 0},
                graphTotalWidth = this.div.offsetWidth,
                graphTotalHeight = this.div.offsetHeight,
                graphInnerWidth = graphTotalWidth - graphMargin.left - graphMargin.right,
                graphInnerHeight = graphTotalHeight - graphMargin.top - graphMargin.bottom;
  
            /* DefiniciÃ³n de la escala x de la grÃ¡fica */
            this.x = d3.time.scale()
                .range([0, graphInnerWidth]);
  
            /* DefiniciÃ³n de la escala y de la grÃ¡fica */
            this.y = d3.scale.linear()
                .range([graphInnerHeight, 0]);
  
            /* DefiniciÃ³n del eje x de la grÃ¡fica */
            this.xAxis = d3.svg.axis()
                .scale(this.x)
                .orient('bottom');
  
            /* DefiniciÃ³n del eje y de la grÃ¡fica */
            this.yAxis = d3.svg.axis()
                .scale(this.y)
                .orient('right')
                .ticks(5)
                .tickFormat(this.localeFormatter.numberFormat(','));
  
            /* d3 crea los grÃ¡ficos de forma lineal, por lo que como en los minigraphs o bigGraphs no queremos que pinte elementos, nos vamos a encontrar ifs como Ã©ste a lo largo de todo el javascript */
            if (!this.minigraph) {
                /* DefiniciÃ³n de la funciÃ³n de grid del eje x de la grÃ¡fica */
                this.x_grid = d3.svg.axis()
                    .scale(this.x)
                    .orient('bottom')
                    .tickSize(-graphInnerHeight)
                    .tickFormat('');
  
                /* DefiniciÃ³n de la funciÃ³n de grid del eje y de la grÃ¡fica */
                this.y_grid = d3.svg.axis()
                    .scale(this.y)
                    .orient('left')
                    .tickSize(-graphInnerWidth)
                    .ticks(5)
                    .tickFormat('');
  
                /* DefiniciÃ³n de la funciÃ³n de Ã¡rea que pintarÃ¡ los datos de la grÃ¡fica */
                this.area = d3.svg.area()
                    .x(function(d) { return that.x(d.ts); })
                    .y0(graphInnerHeight)
                    .y1(function(d) { return that.y(d.cotizacion); });
            }
  
            /* DefiniciÃ³n de la funciÃ³n de la lÃ­nea que pintarÃ¡ los datos de la grÃ¡fica */
            this.area_line = d3.svg.line()
                .x(function(d) { return that.x(d.ts); })
                .y(function(d) { return that.y(d.cotizacion); });
  
            if (this.minigraph && this.graphName && !this.bigGraph) {
        /* DefiniciÃ³n del <p> o <a>(si tiene itemUrl) con el nombre de la grÃ¡fica que se le haya pasado en las opciones */
        if (this.itemUrl != ''){
          var graphName = this.svgWrapper.append('a')
          .attr('class', 'sliderTitle')
          .attr('href', this.itemUrl)
          .html(this.graphName);
        }
        else{
          var graphName = this.svgWrapper.append('p')
          .attr('class', 'sliderTitle')
          .html(this.graphName);
        }
      }
  
  
            if (this.bigGraph) {
                /* DefiniciÃ³n del contenedor para los Ãºltimos datos si es bigGraph */
                this.lastData = this.svgWrapper.append('div')
                    .attr('class', 'lastData');
            }
  
            /* DefiniciÃ³n del contenedor para el wrapper header de la grÃ¡fica */
            var svgHeaderWrapper = this.svgWrapper.append('div')
                .attr('class', 'dataHeaderWrapper');
  
            /* DefiniciÃ³n del contenedor para el header de la grÃ¡fica */
            this.svgHeader = svgHeaderWrapper.append('div')
                .attr('class', 'dataHeader');
  
            if (!this.minigraph) {
                /* DefiniciÃ³n del contenedor para pintar la fecha y hora de la grÃ¡fica */
                this.dateHour = this.svgHeader.append('p')
                    .attr('class', 'dateHour');
            }
  
            if (!this.bigGraph) {
                /* DefiniciÃ³n del contenedor para pintar el valor actual de la grÃ¡fica */
                this.currentValue = this.svgHeader.append('p')
                    .attr('class', 'currentValue')
            }
  
            if (!this.minigraph) {
                /* DefiniciÃ³n del contenedor para pintar el <nav> con los links a dÃ­a, mes, 6 meses, aÃ±o y 2 aÃ±os de la grÃ¡fica */
                this.svgNav = svgHeaderWrapper.append('div')
                    .attr('id', this.periodId)
                    .attr('class', 'dataNav');
  
                /* DefiniciÃ³n los elementos necesarios para este <nav> e iteramos sobre Ã©l */
                var navArray = [{'id': 'day', 'text': '1D', 'title': '1 dÃ­a'}, {'id': 'month_1', 'text': '1M', 'title': '1 mes'}, {'id': 'halfYear_6', 'text': '6M', 'title': '6 meses'}, {'id': 'year_12', 'text': '1A', 'title': '1 aÃ±o'}, {'id': 'bianual_24', 'text': '2A', 'title': '2 aÃ±os'}];
                for (var i in navArray) {
                    this.svgNav.append('a')
                        .attr('href', '#')
                        .attr('id', navArray[i].id)
                        .attr('class', (i === '0') ? 'selected' : '')
                        .attr('title', navArray[i].title)
                        .text(navArray[i].text)
                        .on('click',
                           (function(_that){
                               return function(){
                                   _that.clickPeriod(this);
                               }
                           })(this)
                       );
                }
            }
  
            /* DefiniciÃ³n del <svg> sobre el que se pinta la grÃ¡fica */
            this.svgArea = this.svgWrapper.append('svg')
                .attr('width', graphInnerWidth + graphMargin.left + graphMargin.right)
                .attr('height', graphInnerHeight + graphMargin.top + graphMargin.bottom)
                .attr('viewBox', '0 0 ' + graphTotalWidth + ' ' + graphTotalHeight)
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .style('width', '100%')
                .append('g')
                    .attr('transform', 'translate(' + graphMargin.left + ',' + graphMargin.top + ')');
  
            /* DefiniciÃ³n del <clipPath> sobre el que se pinta la grÃ¡fica: RectÃ¡ngulo que recorta la parte de path que se va a ver para que la grÃ¡fica no se salga del grid aunque Ã©sta tenga mÃ¡s datos */
            this.clipPath = this.svgArea
                .append('defs').append('clipPath')
                .attr("class", "clipPath")
                    .append("rect")
                    .attr("id" , "clipPath-"+this.valueGraph)
                    .attr("width", graphInnerWidth)
                    .attr("height", graphInnerHeight);
  
            if (!this.minigraph) {
                /* DefiniciÃ³n de la lÃ­nea del eje x de la grÃ¡fica */
                this.xAxisLine = this.svgArea.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + graphInnerHeight + ')');
  
                /* DefiniciÃ³n de la lÃ­nea del eje y de la grÃ¡fica */
                this.yAxisLine = this.svgArea.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + graphInnerWidth + ',0)');
  
                /* DefiniciÃ³n de las lÃ­neas del grid x de la grÃ¡fica */
                this.xGrid = this.svgArea.append('g')
                    .attr('class', 'x grid')
                    .attr('transform', 'translate(0,' + graphInnerHeight + ')');
  
                /* DefiniciÃ³n de las lÃ­neas del grid y de la grÃ¡fica */
                this.yGrid = this.svgArea.append('g')
                        .attr('class', 'y grid');
  
                /* DefiniciÃ³n del Ã¡rea (path) que pintarÃ¡ la grÃ¡fica */
                this.pathArea = this.svgArea.append('path')
                    .attr("id", "pathArea-" + this.valueGraph)
                    .attr('class', 'area')
                    .attr("clip-path", "url(.clipPath)")
                    .on('mousemove',
                           (function(_that){
                               return function(){
                                   _that.mousemove(this);
                               }
                           })(this)
                    )
                    .on('mouseout',
                           (function(_that){
                               return function(){
                                   _that.mouseout(this);
                               }
                           })(this)
                    );
  
            }
  
            /* DefiniciÃ³n de la lÃ­nea (path) que pintarÃ¡ la grÃ¡fica */
            this.pathLine = this.svgArea.append('path')
                .attr('class', 'areaLine')
                .attr("clip-path", "url(.clipPath)");
  
            /* DefiniciÃ³n de la lÃ­nea horizontal del valor del dÃ­a anterior de la grÃ¡fica */
            this.closeLine =  this.svgArea.append('line')
                .attr('class', 'closeLine')
                .attr('x1', 0)
                .attr('x2', graphInnerWidth);
  
            if (!this.minigraph) {
                /* DefiniciÃ³n de los valores mÃ¡ximo, mÃ­nimo y valor de ayer de la grÃ¡fica. Iteramos para definir sus siblings: rect, polygon y text */
                this.maxMinMarkers = this.svgArea.append('g')
                    .attr('class', 'maxMinMarkers');
  
                for (var i = 0; i < 3; i++) {
                    var currentMarker = (i === 0) ? 'closeMarker' : ((i === 1) ? 'maxMarker' : 'minMarker');
  
                    this.maxMinMarkers
                        .append('g')
                        .attr('class', currentMarker + ((i > 0) ? ' maxMin' : ''))
                        .append('rect')
                        .attr('height', 15)
                        .attr('width', 45);
  
                    this.maxMinMarkers.select('.' + currentMarker)
                        .append('text');
  
                    this.maxMinMarkers.select('.' + currentMarker)
                        .append('polygon')
                        .attr('transform', 'translate(0, 3)');
                }
  
                /* DefiniciÃ³n de los cÃ­rculos para los valores mÃ¡ximo y mÃ­nimo de la grÃ¡fica. Iteramos porque son dos */
                this.maxMinCircles = this.svgArea.append('g')
                    .attr('class', 'maxMinCircles')
  
                for (var i = 0; i < 2; i++) {
                    this.maxMinCircles
                        .append('circle')
                        .attr('class', (i === 0) ? 'maxCircle' : 'minCircle')
                        .attr('r', 3);
                }
  
                /* DefiniciÃ³n del cÃ­rculo que se mueve con el tooltip sobre la lÃ­nea de la grÃ¡fica */
                this.tooltipCircle = this.svgArea.append('circle')
                    .attr('class', 'tooltipCircle hiddenTooltip')
                    .attr('r', 4);
  
                /* DefiniciÃ³n del tooltip que aparece sobre la lÃ­nea de la grÃ¡fica */
                this.svgTooltip = this.svgWrapper.append('div')
                    .attr('class', 'svgTooltip hiddenTooltip');
  
                /* DefiniciÃ³n del gradiente que hace el efecto de azul a blanco en el Ã¡rea de la grÃ¡fica */
                this.gradient = this.svgArea.append("linearGradient")
                    .attr("id", "areaGradient")
                    .attr("gradientUnits", "userSpaceOnUse")
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "0%")
                    .attr("y2", "100%")
                    .selectAll("stop")
                        .data([
                            {offset: "0%", color: "#215085", 'opacity': 1},
                            {offset: "100%", color: "#fef5ed", 'opacity': 0}
                        ])
                    .enter().append("stop")
                        .attr("offset", function(d) { return d.offset; })
                        .attr("stop-color", function(d) { return d.color; })
                        .attr("stop-opacity", function(d) { return d.opacity; });
            }
  
            if (this.minigraph) {
                if (this.bigGraph) {
                    /* DefiniciÃ³n del contenedor para mostrar el Ãºltimo valor de la grÃ¡fica */
                    this.bigLastPrice = this.svgWrapper.append('p')
                        .attr('class', 'bigLastPrice');
  
                    /* DefiniciÃ³n del contenedor para mostrar el nombre de la grÃ¡fica */
                    this.bigGraphName = this.svgWrapper.append('p')
                        .attr('class', 'bigGraphName')
                        .html(this.graphName);
                }
  
                /* DefiniciÃ³n del contenedor para mostrar el valor actual de la grÃ¡fica */
                this.miniCurrentValue = this.svgWrapper.append('p')
                    .attr('class', 'miniCurrentValue');
            }
  
            /* Todo estÃ¡ definido ya, ahora vamos a pasar a pintar los valores dentro de estos contenedores creados. Como parÃ¡metro hay que pasarle siempre el data, que es el json devuelto por el ajax */
            this.createGraph(data);
        },
        showError: function() {
            /* Quitamos el cargando y pintamos un texto diciendo que hay un error */
            this.svgWrapper
                .text('No se ha podido cargar el grÃ¡fico.')
                .classed('loading', false);
        },
        createGraph: function(data) {
            /* Quitamos el cargando */
            this.svgWrapper
                .classed('loading', false);
  
            /* Formateamos el json al formato d3 */
            data = Object.keys(data).map(function(key) {
                var newObj = data[key];
                newObj['ts'] = key;
                return newObj;
            });
  
            /* Formateamos algunos values para que sean enteros o ts */
            data.forEach(function(d) {
                d.ts = new Date(d.ts * 1000);
                d.cotizacion = +d.cotizacion;
            });
  
            /* Metemos los valores del eje x en funciÃ³n del periodo que estamos pintando */
            this.x.domain(d3.extent(data, function(d) { return d.ts; })); // default x axis
            var day = (this.periodId === 'day') ?  true : false;
            if (day === true) {
                var finalHour = (this.valueGraph === '2523' || this.valueGraph === 2523) ? 22 : 18;
                this.x.domain([ new Date(this.x.domain()[0]).getTime(), new Date(this.x.domain()[0].setHours(finalHour, 0)).getTime() ]); // custom x axis
            } else {
                var auxPeriod = this.periodId.split('_')[1];
                this.x.domain([ new Date(this.x.domain()[1].setMonth(this.x.domain()[1].getMonth()-auxPeriod)).getTime(), new Date(this.x.domain()[1]).getTime()]);
            }
  
            /* Creamos la variable cutData para recortar el megajson de los 2 aÃ±os al periodo necesario para pintarlo */
            var startTs = new Date(this.x.domain()[0]).getTime();
            var cutData = data.filter(function(d) {
                return +startTs <= +d.ts;
            });
  
            /* Calculamos puntos necesarios para pintar la grÃ¡fica: mÃ¡ximo, mÃ­nimo, valor de ayer... */
            var maxCotization = d3.max(cutData.map(function(d) { return +d.cotizacion; }));
            var minCotization = d3.min(cutData.map(function(d) { return +d.cotizacion; }));
            var rest = (maxCotization - minCotization) / 10;
            var lastPoint = data[data.length - 1];
            var closeData = (day === true) ? +data[0].cierre_anterior : maxCotization;
            var maxObject = cutData.filter(function(d) { return +d.cotizacion === maxCotization; });
            var minObject = cutData.filter(function(d) { return +d.cotizacion === minCotization; });
  
            /* Metemos el dominio en el eje y, los puntos a pintar en el eje */
            if (closeData < minCotization) {
                this.y.domain([closeData - rest, maxCotization + rest]);
            } else if (closeData > maxCotization) {
                this.y.domain([minCotization - rest, closeData + rest]);
            } else {
                this.y.domain([minCotization - rest, maxCotization + rest]);
            }
  
            if (!this.minigraph) {
                /* Pintamos la hora y la fecha */
                this.dateHour
                    .text((this.period === false)
                        ? dateHourString = d3.time.format('%d-%m-%y')(new Date(lastPoint.fecha)) + ' ' + lastPoint.hora.slice(0, 5) + 'h.'
                        : dateHourString = 'Del ' + d3.time.format('%d-%m-%y')(new Date(this.x.domain()[0])) + ' al ' + d3.time.format('%d-%m-%y')(new Date(this.x.domain()[1])));
  
                    // pinta la fecha de la Ãºltima cotizaciÃ³n
                if (this.period === false && this.graphSub !== ''){
                    document.getElementById(this.graphSub).innerHTML = d3.time.format('%d-%m-%y')(new Date(lastPoint.fecha)) + ' <span>' + lastPoint.hora.slice(0, 5) + 'h.</span>';
                }
  
            }
  
            if (!this.bigGraph) {
                /* Pintamos el valor actual */
        if (this.options.variacionNum != 1) {
          var diferencia = lastPoint.diferencia_porcentaje;
          var txtDiferencia = '%';
        }
        else{
          var diferencia = lastPoint.diferencia;
          var txtDiferencia = '';
        }
  
                this.currentValue
                    .html((this.period === false)
                        ? '<span>' + this.localeFormatter.numberFormat(',')(lastPoint.cotizacion) +
                          (!this.minigraph ? '</span><span class="currentPercentage">' +
                          this.localeFormatter.numberFormat(',')(diferencia) + txtDiferencia + '</span>' : '')
                        : this.getLastValue(cutData[0]));
            }
  
            if (this.minigraph) {
                if (this.bigGraph) {
                    /* Pintamos el Ãºltimo precio */
                    this.bigLastPrice
                        .html('<p>Last price <span>' + this.localeFormatter.numberFormat(',')(closeData) + '</span></p>');
  
                    /* Pintamos el nombre que nos viene en las opciones */
                    this.bigGraphName
                        .append('span')
                        .html((this.period === false)
                            ? '<span>' + this.localeFormatter.numberFormat(',')(lastPoint.cotizacion) + (!this.minigraph ? '</span><span class="currentPercentage">' + this.localeFormatter.numberFormat(',')(lastPoint.diferencia_porcentaje) + '%</span>' : '')
                            : this.getLastValue(cutData[0]));
                }
  
                /* Pintamos el valor actual */
                this.miniCurrentValue
                    .html(this.localeFormatter.numberFormat(',')(lastPoint.diferencia_porcentaje) + '%');
            }
  
            /* Pintamos el porcentaje de subida o bajada del valor actual */
            this.svgWrapper.select('.currentPercentage, .miniCurrentValue')
                .classed((Math.sign(+lastPoint.diferencia_porcentaje) >= 0) ? 'currentUp' : 'currentDown', true);
  
            if (!this.minigraph) {
                /* Preparamos los ticks o divisiones del grid en funciÃ³n del periodo */
                var tickRange = (day == true) ? d3.time.hours : ((this.periodId.indexOf("month_1",0)>=0) ? d3.time.days : d3.time.months);
                var tickFormat = (day == true) ? '%H:%M' : '%d-%m-%y';
  
                var tickNumber = 3;
                switch (this.periodId) {
                    case 'month_1':
                        tickNumber = 7;
                        break
                    case 'halfYear_6':
                        tickNumber = 2;
                        break
                    case 'year_12':
                        tickNumber = 3;
                        break
                    case 'bianual_24':
                        tickNumber = 6;
                        break
                }
  
                /* Pintamos los ticks o divisiones del grid x en funciÃ³n del periodo */
                this.xAxis
                    .ticks(tickRange, tickNumber)
                    .tickFormat(d3.time.format(tickFormat));
  
                /* Pintamos los ticks o divisiones del grid y en funciÃ³n del periodo */
                this.x_grid
                    .ticks(tickRange, tickNumber);
  
                /* Pintamos la lÃ­nea x de la grÃ¡fica */
                this.xAxisLine
                    .transition()
                    .duration(150)
                    .call(this.xAxis);
  
                /* Pintamos la lÃ­nea y de la grÃ¡fica */
                this.yAxisLine
                    .transition()
                    .duration(150)
                    .call(this.yAxis);
  
                /* Pintamos el grid x de la grÃ¡fica */
                this.xGrid
                    .transition()
                    .duration(150)
                    .call(this.x_grid);
  
                /* Pintamos el grid y de la grÃ¡fica */
                this.yGrid
                    .transition()
                    .duration(150)
                    .call(this.y_grid);
  
                /* Pintamos los letreros con los valores mÃ¡ximo, mÃ­nimo y valor de ayer de la grÃ¡fica, e iteramos para colocar sus siblings */
                var markersArray = [closeData, maxCotization, minCotization];
                if (this.period === true) {
                    var maxTimestamp = this.x(+maxObject[0].ts) - ((this.x(+maxObject[0].ts) > 0) ? 22.5 : 0);
                    var minTimestamp = this.x(+minObject[0].ts) - ((this.x(+minObject[0].ts) > 0) ? 22.5 : 0);
                }
  
                for (var i in markersArray) {
                    var currentMarker = (i === '0') ? 'closeMarker' : ((i === '1') ? 'maxMarker' : 'minMarker');
  
                    this.maxMinMarkers.select('.' + currentMarker + ' rect')
                        .transition()
                        .duration(150)
                        .attr('y', this.y(markersArray[i]) - 7.5 + ((this.period === true) ? (i === '0') ? 0 : ((i === '1') ? -17 : +17) : 0))
                        .attr('x', (this.period === false) ? graphInnerWidth : ((i === '1') ? maxTimestamp : minTimestamp));
  
                    var markers_actual = markersArray[i].toString();
                    if (markers_actual.length > 6) markers_actual = Math.floor(markersArray[i]);
                    else markers_actual = markersArray[i].toFixed(2);
  
                    this.maxMinMarkers.select('.' + currentMarker + ' text')
                        .text(this.localeFormatter.numberFormat(',')(markers_actual))
                        .transition()
                        .duration(150)
                        .attr('y', this.y(markersArray[i]) + 3.75 + ((this.period === true) ? (i === '0') ? 0 : ((i === '1') ? -17 : +17) : 0))
                        .attr('x', (this.period === false) ? graphInnerWidth + 10 : ((i === '1') ? maxTimestamp + 10 : minTimestamp + 10));
  
                    this.maxMinMarkers.select('.' + currentMarker + ' polygon')
                        .transition()
                        .duration(150)
                        .attr('points', (this.period === false)
                            ? graphInnerWidth + ',' + (this.y(markersArray[i]) - 10.5) + ' ' + (graphInnerWidth - 5) + ',' + (this.y(markersArray[i]) - 2.5) + ' ' + graphInnerWidth + ',' + (this.y(markersArray[i]) + 4)
                            : ((i === '1')
                                ? (maxTimestamp + 16.75) + ',' + (this.y(markersArray[i]) - 12.5) + ' ' + (maxTimestamp + 27.75) + ',' + (this.y(markersArray[i]) - 12.5) + ' ' + (maxTimestamp + 22.25) + ',' + (this.y(markersArray[i]) - 8)
                                : (minTimestamp + 16.75) + ',' + (this.y(markersArray[i]) + 6) + ' ' + (minTimestamp + 27.75) + ',' + (this.y(markersArray[i]) + 6) + ' ' + (minTimestamp + 22.25) + ',' + (this.y(markersArray[i]) + 1.5))
                        );
                }
  
                /* Pintamos los puntos con los valores mÃ¡ximo y mÃ­nimo de la grÃ¡fica, e iteramos para colocarlos */
                var circlesArray = ['maxCircle', 'minCircle'];
                for (var i in circlesArray) {
                    this.maxMinCircles.select('.' + circlesArray[i])
                        .transition()
                        .duration(150)
                        .attr("cx", this.x((i === '0') ? +maxObject[0].ts : +minObject[0].ts))
                        .attr("cy", this.y((i === '0') ?  maxCotization : minCotization));
                }
  
                /* Pintamos el Ã¡rea */
                this.pathArea
                    .datum(data)
                    .attr('d', this.area);
            }
  
            /* Pintamos la lÃ­nea */
            this.pathLine
                .datum(data)
                .attr('d', this.area_line);
  
            /* Pintamos la lÃ­nea horizontal del valor de ayer */
            this.closeLine
                .transition()
                .duration(150)
                .attr('y1', this.y(closeData))
                .attr('y2', this.y(closeData));
  
            if (!this.minigraph) {
                /* Pasamos al prototipo variables necesarias para pintar el tooltip */
                this.bisectDate = d3.bisector(function(d) { return d.ts; }).left;
                this.allData = data;
            }
  
            if (this.bigGraph) {
                /* Pintamos el contenedor del valor de los Ãºltimos 5 dÃ­as */
                this.lastData.append('p')
                    .html('Last 5 days <strong class="fiveDaysAgo">&nbsp;</strong>');
  
                /* Pintamos el contenedor del valor del Ãºltimo aÃ±o */
                this.lastData.append('p')
                    .html('1 year <strong class="oneYearAgo">&nbsp;</strong>');
  
                /* Llamamos a esta funciÃ³n para realizar los cÃ¡lculos necesarios para rellenar con datos lo anterior */
                this.getLastDays(this.lastData, this.jsonUrl);
            }
  
            /* FunciÃ³n para dar estilo a las grÃ¡ficas. Lo que viene dentro del svg estÃ¡ aquÃ­, lo que son <div> o <p> fuera de Ã©l estÃ¡n con css */
            this.styling(this.svgArea);
  
            if (!this.minigraph) {
  
                /* ItearaciÃ³n para poner el evento al menÃº superior para cambiar el valor de la grÃ¡fica */
                graphsArray = d3.selectAll('.changeGraph')[0];
                var that = this;
                for (var i = 0; i < graphsArray.length; i++) {
                    d3.select('#' + graphsArray[i].id)
                        .on('click',
                           (function(_that){
                               return function(){
                                   _that.clickGraph(this);
                               }
                           })(this)
                       );
                }
            }
        },
  
  
        mousemove: function(obj) {
            /* Rellenamos y movemos el tooltip */
            var x0 = this.x.invert(d3.mouse(obj)[0]),
                i = this.bisectDate(this.allData, x0, 1),
                d0 = this.allData[i - 1],
                d1 = this.allData[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  
            var areaZone = this.svgArea.select('.area');
            var xPoint = d3.event.pageX - d3.select(this.div).node().getBoundingClientRect().left;
            var beginning = xPoint, end = this.svgArea.select('.areaLine').node().getTotalLength(), target;
  
            while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = areaZone.node().getPointAtLength(target);
                if ((target === end || target === beginning) && pos.x !== xPoint) {
                    break;
                }
                if (pos.x > xPoint)      end = target;
                else if (pos.x < xPoint) beginning = target;
                else                     break; //position found
            }
  
            var horaCot = (typeof(d.hora) != 'undefined') ? '<span>'+d.hora.slice(0, 5) + 'h.</span>' : '';
  
            this.svgTooltip
                .style('left', xPoint + 7 + 'px')
                .style('top', pos.y + 93 + 'px')
                .html('<p><span>' + d3.time.format('%d-%m-%Y')(new Date(d.fecha)) + '</span>' + horaCot
                    + '</p><p><span><strong>'
                    + this.localeFormatter.numberFormat(',')(d.cotizacion)
                    + '</strong></span><span><strong class="tooltipPercentage">'
                    + this.localeFormatter.numberFormat(',')(d.diferencia_porcentaje)
                    + '%</strong></span></p>')
                .classed('hiddenTooltip', false);
  
            this.svgTooltip.select('.tooltipPercentage').classed((Math.sign(+d.diferencia_porcentaje) >= 0) ? 'currentUp' : 'currentDown', true);
  
            this.tooltipCircle
                .attr("cx", xPoint)
                .attr("cy", pos.y);
  
            this.tooltipCircle.classed('hiddenTooltip', false);
  
            if (xPoint > graphInnerWidth / 2) this.svgTooltip.classed('leftTooltip', true);
            else this.svgTooltip.classed('leftTooltip', false);
        },
  
  
        mouseout : function(obj) {
            this.svgTooltip.html('');
            this.tooltipCircle
                .attr("cx", 0)
                .attr("cy", 0);
            d3.selectAll('.svgTooltip, .tooltipCircle').classed('hiddenTooltip', true);
        },
  
  
  
         clickPeriod : function(obj) {
            /* Cambiamos los datos de la grÃ¡fica en funciÃ³n del dÃ­a, mes, 6 meses, 1 aÃ±o Ã³ 2 aÃ±os seleccionados */
            d3.event.preventDefault();
            if (d3.select(obj).classed('selected')) return false;
  
            this.svgNav.selectAll('a').classed('selected', false);
            this.svgNav.select('.dataNav a#' + obj.id).classed('selected', true);
  
            this.period = (obj.id === 'day') ? false : true;
            this.periodId = obj.id;
            this.div = document.getElementById(obj.parentElement.parentElement.parentElement.id);
            this.jsonUrl = (typeof(this.options.graphUrl) !== 'undefined' && this.options.graphUrl != '') ? this.options.graphUrl : this.urlObject[this.valueGraph];
            this.jsonUrl = this.jsonUrl.replace('.js2', '').replace(this.periodString, '') + ((!!this.period) ? this.periodString : '') + '.js2';
  
            var that = this;
            d3.json(this.jsonUrl, function(error, data) {
                if (error) {
                    that.showError();
                    return false;
                }
                that.createGraph(data);
            });
  
        },
  
        clickGraph : function(obj) {
            /* Cambiamos los datos de la grÃ¡fica en funciÃ³n del valor seleccionado, y mostramos/ocultamos la tabla de portada correspondiente */
            d3.event.preventDefault();
            if (d3.select(obj.parentNode).classed('selected')) return;
  
            this.div = document.getElementById(d3.select(obj.parentElement.parentElement.nextElementSibling).select('.stockGraph').node().id);
            if (d3.select(this.div).select('svg').classed('loading')) return;
  
            d3.select(graphsArray[0].parentElement.parentElement).selectAll('li')
                .classed('selected', false);
  
            d3.select(obj.parentNode)
                .classed('selected', true);
  
            this.valueGraph = obj.id.split('_')[1];
            this.jsonUrl = this.urlObject[this.valueGraph].replace('.js2', '').replace(this.periodString, '') + ((!!this.period) ? this.periodString : '') + '.js2';
            var that = this;
            d3.json(this.jsonUrl, function(error, data) {
                if (error) {
                    that.showError();
                    return false;
                }
                that.createGraph(data);
            });
  
            var bestWorst = d3.selectAll('#capa_mejorespeores > div')[0];
            for (var i = 0; i < bestWorst.length; i++) {
                d3.select(bestWorst[i])
                    .style('display', (bestWorst[i].id.split('_')[1] === obj.parentElement.id.split('_')[1] ? 'block' : 'none'));
            }
  
  
        if (document.getElementById('a_detalle')!=null){
          this.detalle = document.getElementById('a_detalle');
            var pestania = obj.parentElement.id.split('_')[1];
          this.detalle.href=this.detalleIndices[pestania][0];
          this.detalle.innerHTML=this.detalleIndices[pestania][1];
      }
        },
  
        getLastValue: function(cutData) {
  
            /* Pintamos los datos del Ãºltimo valor en las grÃ¡ficas de periodo igual o superior a 1 mes */
            var lastValueUrl = this.jsonUrl.replace('.js2', '').replace(this.periodString, '') + this.periodLastPoint + '.js2';
            var that = this;
            d3.json(lastValueUrl, function(error, data) {
                if (error) {
                    that.currentValue
                        .html('No hay datos.');
                    return;
                }
  
                if (that.options.variacionNum != 1){
                  var txtDiferencia = '%';
                  var diferencia = (((+data[Object.keys(data)].cotizacion - +cutData.cotizacion) * 100) / +cutData.cotizacion).toFixed(2);
                }
                else{
                  var txtDiferencia = '';
                  var diferencia = (+data[Object.keys(data)].cotizacion - +cutData.cotizacion).toFixed(2);
                }
  
                that.currentValue
                    .html('<span>' + that.localeFormatter.numberFormat(',')(+data[Object.keys(data)].cotizacion) +
                     '</span><span class="currentPercentage">' + that.localeFormatter.numberFormat(',')(diferencia) + txtDiferencia+'</span>');
  
                if (that.minigraph) {
                    that.miniCurrentValue
                        .text(diferencia);
                }
  
                that.svgWrapper.select('.currentPercentage, .miniCurrentValue')
                    .classed((Math.sign(+diferencia) >= 0) ? 'currentUp' : 'currentDown', true);
            });
        },
  
  
        getLastDays: function(lastDataDiv) {
  
            /* Pintamos los datos de los últimos 5 dÃ­as o último año */
            var lastDaysUrl = this.urlObject[this.valueGraph].replace('.js2', '') + this.periodString + '.js2';
            d3.json(lastDaysUrl, function(error, data) {
                if (error) {
                    lastDataDiv.selectAll('.fiveDaysAgo, .oneYearAgo')
                        .html('Sin datos');
                    return false;
                }
                data = Object.keys(data).map(function(key) {
                    var newObj = data[key];
                    newObj['ts'] = key;
                    return newObj;
                });
                data = data.reverse();
                var lastFiveDays = [];
                for (var i = 0; i < 5; i++ ) {
                    lastFiveDays.push(data[i]);
                }
                var lastFiveDaysPercentage = (((+lastFiveDays[0].cotizacion - +lastFiveDays[4].cotizacion) * 100) / +lastFiveDays[4].cotizacion).toFixed(2);
  
                var lastYearDate = data[0].fecha.replace(data[0].fecha.split('-')[0], +data[0].fecha.split('-')[0] - 1);
                var lastYearData = data.filter(function(d) {
                    return lastYearDate === d.fecha;
                });
                var lastYearPercentage = (((+lastYearData[0].cotizacion - +lastFiveDays[0].cotizacion) * 100) / +lastFiveDays[0].cotizacion).toFixed(2);
  
                lastDataDiv.select('.fiveDaysAgo')
                    .html(lastFiveDaysPercentage + '%');
  
                lastDataDiv.select('.oneYearAgo')
                    .html(lastYearPercentage + '%');
            });
        },
        styling: function(svgArea) {
  
            svgArea.selectAll('.tick text')
                .style({'font-size': '10px', 'fill': '#000000'});
            svgArea.selectAll('.axis .tick line')
                .style({'opacity': 0});
            svgArea.selectAll('.axis path, .axis line, .grid path, .grid line')
                .style({'fill': 'none', 'stroke': '#000', 'shape-rendering': 'crispEdges'});
            svgArea.selectAll('.grid path, .grid line')
                .style({'stroke': '#E3D7CE'});
            svgArea.selectAll('.axis .domain, .y.grid .domain')
                .style('stroke', 'rgba(0, 0, 0, 0)');
            svgArea.selectAll('path.area')
                .style({'fill': '#F7E7DB', 'opacity': .5});
            svgArea.selectAll('path.areaLine')
                .style({'fill': 'none', 'stroke': (!this.minigraph ? '#8f7e63' : '#111111'),
                    'stroke-width': (!this.minigraph ? '1px' : '1.5px'), 'opacity': (!this.minigraph ? .5 : 1)});
            svgArea.selectAll('line.closeLine')
                .style({'fill': 'none', 'stroke': ((!!this.minigraph) ? '#1a3f6c' : '#1A406D'), 'shape-rendering': 'crispEdges', 'display': ((!!this.period) ? 'none' : 'block'), 'stroke-dasharray': ((!!this.minigraph && !this.bigGraph) ? ('2, 4') : 'none')});
            svgArea.selectAll('.maxMinMarkers text')
                .style({'font-size': '10px', 'font-weight': 'bold', 'fill':'#fff'});
            svgArea.selectAll('.closeMarker rect, .closeMarker polygon')
                .style({'fill': '#1A406D', 'stroke': '#1A406D'});
            svgArea.selectAll('.closeMarker')
                .style('display', (!!this.period) ? 'none' : 'block');
            svgArea.selectAll('.maxMin rect, .maxMin polygon')
                .style({'fill': '#000', 'stroke': '#000'});
            svgArea.selectAll('.maxMin text')
                .style({'fill': '#fff'});
            svgArea.selectAll('.x.axis .tick:last-of-type text')
                .style({'fill': (this.valueGraph != '2523' || this.valueGraph != 2523) ? ((this.period === false) ? '#fff' : '#000') : '#000'});
            svgArea.selectAll('.tooltipCircle')
                .style({'fill': '#215085', 'stroke': 'transparent'});
            svgArea.selectAll('.maxMinCircles circle')
                .style({'fill': '#215085', 'stroke': '#215085', 'display': ((!!this.period) ? 'block' : 'none')});
        }
  
    } //prototype
  
    window.AreaGraph = AreaGraph;
  }());
  
  
  
  /*  ----------------------------------------------------------------------------- */
  /* Plugin escrito en d3 para el slider de minigrÃ¡ficas */
  /*  ----------------------------------------------------------------------------- */
  function slideGraphs(id, desktop, mobile) {
    var sliderWrapper = d3.select('#' + id),
    slides = sliderWrapper.selectAll('.slidesCarousel .stockGraph')[0],
    slideWidth = slides[0].clientWidth,
    slideMargin = parseFloat(window.getComputedStyle(slides[0]).marginRight),
    iOSwidth = document.body.clientWidth;
  
    // Se calcula el nÃºmero de grÃ¡ficas visibles
    desktop = Math.round( sliderWrapper.select('.slidesWrapper')[0][0].offsetWidth / (slideWidth+slideMargin));
    isResized = false;
    slideInterval = (document.body.clientWidth < 600) ? mobile : desktop;
    mobile = mobile;
    desktop = desktop;
  
    sliderWrapper.selectAll('.slidesCarousel .stockGraph')
        .style('width', slideWidth + 'px')
        .style('margin-right', slideMargin + 'px');
  
    var movingDiv = sliderWrapper.select('.slidesCarousel')
        .style('width', (slideWidth + slideMargin) * slides.length + 'px');
  
    var currentSlide = 0;
    sliderWrapper.select('.arrowPrev')
        .style('display', 'none');
  
    sliderWrapper.selectAll('.arrowPrev, .arrowNext')
        .on('click', moveSlider);
  
    function moveSlider() {
        d3.event.preventDefault();
        if (!!isResized) {
            currentSlide = 0;
            isResized = false;
        }
  
        currentSlide += (this.className === 'arrowPrev') ? - 1 : + 1;
        var movedPx = (movingDiv.node().style.left != '') ? parseFloat(movingDiv.node().style.left) : 0;
  
        sliderWrapper.select('.arrowPrev')
            .style('display', (currentSlide === 0) ? 'none' : 'block');
  
        sliderWrapper.select('.arrowNext')
            .style('display', (currentSlide === slides.length - slideInterval) ? 'none' : 'block');
  
        movingDiv
            .style('left', (this.className === 'arrowPrev')
                ? (movedPx + slideWidth + slideMargin) + 'px'
                : (movedPx - slideWidth - slideMargin) + 'px');
    }
  
    function resizeSlider() {
        if (document.body.clientWidth != iOSwidth) {
            currentSlide = 0;
  
            setTimeout(function() {
                isResized = true;
                slideInterval = (document.body.clientWidth < 600) ? mobile : desktop;
  
                d3.selectAll('.slidesCarousel, .stockGraph')
                    .attr('style', null);
  
                var allSliders = d3.selectAll('.graphSlider')[0];
                for (var i = 0; i < allSliders.length; i++) {
                    var newSliderWrapper = d3.select(allSliders[i]);
                    var newSlideWidth = newSliderWrapper.select('.stockGraph').node().clientWidth;
                    var newSlideMargin = parseFloat(window.getComputedStyle(newSliderWrapper.select('.graphSlider .stockGraph').node()).marginRight);
  
                    newSliderWrapper.selectAll('.slidesCarousel .stockGraph')
                        .style('width', newSlideWidth + 'px')
                        .style('margin-right', newSlideMargin + 'px');
  
                    newSliderWrapper.selectAll('.slidesCarousel')
                        .style('width', (newSlideWidth + newSlideMargin) * newSliderWrapper.selectAll('.stockGraph')[0].length + 'px');
  
                    var todGra = newSliderWrapper.selectAll('.slidesCarousel .stockGraph')[0];
                    //slidesWrapper contenedor de las grÃ¡ficas
                    newSliderWrapper.selectAll('.arrowNext').style('display',
                        ( todGra[todGra.length-1].offsetLeft < newSliderWrapper.selectAll('.slidesWrapper')[0][0].offsetWidth ) ? 'none' : 'block' );
  
                    newSliderWrapper.selectAll('.arrowPrev').style('display', 'none');
                }
  
                iOSwidth = document.body.clientWidth;
            }, 400);
        }
    }
  
    d3.select(window).on('resize', resizeSlider);
  }