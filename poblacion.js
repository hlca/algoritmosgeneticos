function Poblacion() {
	this.elementos = [];
	this.cantidadElementos = 1000;
	this.elementosSeleccion = [];
	this.porcentajeMutacion = 0.01;
	this.mejorFitness = 0;
	this.mejorElemento = {};


	for (var i = 0; i < this.cantidadElementos; i++) {
    this.elementos[i] = new ADN();
  }

  this.evaluar = function(){
  	this.mejorFitness = 0;
  	var sumaFitness = 0;
    for (var i = 0; i < this.cantidadElementos; i++) {
      if (this.elementos[i].fitness > this.mejorFitness) {
        this.mejorFitness = this.elementos[i].fitness;
        this.mejorElemento = this.elementos[i];
      }
      sumaFitness = sumaFitness + this.elementos[i].fitness;
    }

    this.elementosSeleccion = [];
    for (var i = 0; i < this.cantidadElementos; i++) {    	
      var n = Math.floor((this.elementos[i].fitness/sumaFitness) * this.cantidadElementos);
      if((this.elementos[i].fitness/sumaFitness) * 100 > 0.99) n = 1;
      for (var j = 0; j < n; j++) {
        this.elementosSeleccion.push(this.elementos[i]);
      }
    }
    // if(this.elementosSeleccion.length == 0){
    // 	console.log("NOVIENE NADA")
    // 	console.log(sumaFitness);
    // 	for (var i = 0; i < this.cantidadElementos; i++) {   
    // 		console.log(this.elementos[i].fitness/sumaFitness * 100)
	   //  	console.log(Math.round((this.elementos[i].fitness/sumaFitness) * 100));
	   //  }
    // }
  }

  this.seleccion = function() {
    var nuevosElementos = [];
    for (var i = 0; i < this.cantidadElementos; i++) {
      var padreA = getRandomItem(this.elementosSeleccion);
      var padreB = getRandomItem(this.elementosSeleccion);
      var child ;

      if(Math.random() < 0.5) {
				child = padreA.crossover(padreB.genes);
			}else{
				child = padreB.crossover(padreA.genes);
			}
      child.mutacion(this.porcentajeMutacion);
      nuevosElementos[i] = child;
    }
    this.elementos = nuevosElementos;
  }

}