define(["esri/dijit/AttributeInspector","esri/graphic",'dojo/dom','dojo/_base/declare', 'jimu/BaseWidget'],
  function(AttributeInspector,Graphic, dom, declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
        console.log('postCreate');
        this.calculationsDone = 0;

      },

      startup: function() {
       console.log('startup');
       console.log(this.map)
       let idCapa = this.map.itemInfo.itemData.operationalLayers[0].id
       this.comunidadesFL = this.map.getLayer(idCapa)
      //  let params = this.comunidadesFL.infoTemplate.info.fieldInfos
      //  this.attinspect = new AttributeInspector(params,this.map)
      //  console.log(this.attinspect)
       console.log('comunidades',this.comunidadesFL)   
      },

      patrimoniocalc: function(){
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
      },

      findTaxBracketPatri: function(wealth){
        const wealthThresholds = [  
          167129,
          334252,
          668499,
          1000000,
          2500000,
          5300000,
          10000000,
        ];
        let bracketIndex = 0; 
        for (let threshold of wealthThresholds) { 
          if (wealth <= threshold) break; 
          bracketIndex++;
        }
        return bracketIndex; 
      },

      calculateTaxRatesPatri: function(wealth){
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
        const bracketIndex = this.findTaxBracketPatri(wealth);
        this.taxResults = {};  
        for (let region in taxRates) {
          this.taxResults[region] = taxRates[region][bracketIndex];
        }
        console.log('taxResults:', this.taxResults)
        this.percentPatriFinal()
        return this.taxResults;    
      },

      addPatrimonioResults: function(){
        const resultsDiv = document.getElementById("results");
        let taxPercentages = {};
      
        const wealth = parseInt(document.getElementById("wealth").value);
        taxPercentages = this.calculateTaxRatesPatri(wealth);
        const taxPercentagesCalculatedEvent = new CustomEvent('taxPercentagesCalculated', { detail: { taxPercentages } });
        document.dispatchEvent(taxPercentagesCalculatedEvent);
      
        let resultsHtml = "<h2>Porcentajes de impuestos al Patrimonio:</h2><ul>";
        for (let region in taxPercentages) {
            resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
          }
        resultsHtml += "</ul>";
      
        resultsDiv.innerHTML = resultsHtml;
                
          },

      irpfcalc: function(){
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
      }, 

      findTaxBracket: function (wealth) {
        const wealthThresholds2 = [
          12450,
          20200,
          35200,
          60000,
          300000,
        ];
        let bracketIndex = 0;
        for (let threshold of wealthThresholds2) {
          if (wealth <= threshold) break;
          bracketIndex++;
        }
        return bracketIndex;
      },
      
      calculateTaxirpf: function (wealth) {
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
        
        const bracketIndex = this.findTaxBracket(wealth);
        this.taxResults2 = {};
      
        for (let region in taxirpf) {
          this.taxResults2[region] = taxirpf[region][bracketIndex];
          //console.log('aqui',taxResults2)
        }
        console.log('taxResults2',this.taxResults2); 
        this.irpfPercentFinal()
        return this.taxResults2;
      }, 

      addirpfResults: function(){
               
        const resultsDiv = dom.byId("results2");
        let taxPercentages = {};
      
        const wealth = parseInt(dom.byId("wealth2").value);
        taxPercentages = this.calculateTaxirpf(wealth);
        const taxPercentagesCalculatedEvent2 = new CustomEvent('taxPercentagesCalculated2', { detail: { taxPercentages } });
        document.dispatchEvent(taxPercentagesCalculatedEvent2);
      
        let resultsHtml = "<h2>Porcentajes de impuestos en IRPF:</h2><ul>";
        for (let region in taxPercentages) {
          resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
        }
        resultsHtml += "</ul>";
      
        resultsDiv.innerHTML = resultsHtml;
      }, 

      percentPatriFinal: function(){
        const taxPercentagesPatrimonio = this.taxResults;
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
    
        this.finalPercentagesIP = {};
        for (let region in adjustedPercentagesIP) {
          this.finalPercentagesIP[region] = adjustedPercentagesIP[region] * 0.3;
        }
    
        console.log('this.finalPercentagesIP', this.finalPercentagesIP);
    
        this.calculationsDone++;
      },

      irpfPercentFinal: function(){
        const taxPercentagesIRPF = this.taxResults2;
        console.log('taxPercentagesIRPF',taxPercentagesIRPF);
    
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
    
        this.finalPercentagesIRPF = {};
        for (let region in adjustedPercentagesIRPF) {
          this.finalPercentagesIRPF[region] = adjustedPercentagesIRPF[region] * 0.3;
        }
    
        console.log('finalPercentagesIRPF', this.finalPercentagesIRPF);
    
        this.calculationsDone++;
      },

      sumPercentages: function() {
        const totaldatos = {
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
        if (this.calculationsDone === 2) {
          let puntosInversion = {};
      
          for (let region in this.finalPercentagesIP) {
            puntosInversion[region] = (this.finalPercentagesIP[region] + this.finalPercentagesIRPF[region] + totaldatos[region]).toFixed(2);

            this.comunidadesFL.queryFeatures({}, (featureSet) => {
              const featuresToUpdate = featureSet.features.map((feature) => {
                feature.attributes.Index_Invest = puntosInversion;
                return feature;
              });
              this.comunidadesFL.applyEdits(null, featuresToUpdate, null, function () {
                alert('Tax index updated for all features.');
              }, function (error) {
                alert('Error updating tax index: ' + error);
              });
            });
                        // let attributes = {
            //   'NAMEUNIT': region,
            //   'Index_Invest': puntosInversion[region]
            // }
            // console.log('atributos:', attributes)
            // let nuevoField = new Graphic(null, null, attributes)
            // this.comunidadesFL.applyEdits(null, [nuevoField])
          }
      
          console.log('puntosInversion', puntosInversion);
          console.log('comunidades',this.comunidadesFL)   

        }
          // this.comunidadesFL.applyEdits(null,)
        },
      


      
      // onOpen: function(){
      //   console.log('onOpen');
      // },

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });