function ADN(genes) {

	var validarNumeros = function(x, y) {
		return (3*x + 2*y <= 6);
	}

	var forzarNumero1 = function(y) {
		var resultado = (6 - 2*y)/3;
		return resultado;//(resultado < 0 ? 0 : resultado);
	}

	var forzarNumero2 = function(x) {
		var resultado =(6 - 3*x)/2;
		return resultado;//(resultado < 0 ? 0 : resultado);
	}

	if(genes) {
		this.genes = genes;
	} else{
		var numero1 = getRandomFloat(0, 5);
		var numero2 = getRandomFloat(0, 5);

		while (!validarNumeros(numero1.decimal, numero2.decimal)){
			numero1 = getRandomFloat(0, 5);
			numero2 = getRandomFloat(0, 5);
		}
		this.genes = {x1: numero1, x2:  numero2};
 	}

	this.crossover = function(padre) {
		var newGenes = {x1: {decimal: 0, binario: "0000"}, x2: {decimal: 0, binario: "0000"}};
		// var longitudNumero = this.genes.x1.binario.length;

		 // var mitad = getRandomNumber(0, longitudNumero);
		// console.log(this.genes)
		// for(var i = 0; i < longitudNumero; i++) {
		// 	if(i > mitad-1) {
		// 		newGenes.x1.binario = newGenes.x1.binario.replaceAt(i, this.genes.x1.binario[i]);
		// 		newGenes.x2.binario = newGenes.x2.binario.replaceAt(i, this.genes.x2.binario[i]);
		// 	}else{
		// 		newGenes.x1.binario = newGenes.x1.binario.replaceAt(i, padre.x1.binario[i]);
		// 		newGenes.x2.binario = newGenes.x2.binario.replaceAt(i, padre.x2.binario[i]);
		// 	}
		// }

		// newGenes.x1.decimal = parseInt(newGenes.x1.binario, 2);
		// newGenes.x2.decimal = parseInt(newGenes.x2.binario, 2);

		newGenes.x1.decimal = parseFloat(((this.genes.x1.decimal + padre.x1.decimal) / 2).toFixed(2));
		newGenes.x2.decimal = parseFloat(((this.genes.x2.decimal + padre.x2.decimal) / 2).toFixed(2));

		// newGenes.x1.binario = pad(dec2bin(newGenes.x1.decimal), 4);
		// newGenes.x2.binario = pad(dec2bin(newGenes.x2.decimal), 4);

		this.genes = newGenes;
		this.calcularFitness();
		return new ADN(newGenes);
	}

	this.mutacion = function(porcentaje) {
			if(Math.random() < porcentaje) {
				//Se va a cambiar
				if(Math.random() < 0.25) {
					this.genes.x1.decimal = this.genes.x1.decimal + 0.1;
				}else if(Math.random > 0.25 && Math.random < 0.5){
					this.genes.x1.decimal = this.genes.x1.decimal - 0.1;
				}else if(Math.random > 0.5 && Math.random < 0.75){
					this.genes.x2.decimal = this.genes.x2.decimal - 0.1;
				}else{
					this.genes.x2.decimal = this.genes.x2.decimal + 0.1;
				}
				
			}

		if(!validarNumeros(this.genes.x1.decimal, this.genes.x2.decimal)){
			if(Math.random() < 0.5) {
				this.genes.x1.decimal = forzarNumero1(this.genes.x2.decimal);
			}else{
				this.genes.x2.decimal = forzarNumero2(this.genes.x1.decimal);
			}
		}

		
		this.calcularFitness();
	}

	this.calcularFitness = function(){
		var x1 = this.genes.x1.decimal;
		var x2 = this.genes.x2.decimal;

		this.fitness = parseFloat(((5 * x1) - (x1 * x1) + (8 * x2) - (2 * x2 * x2)).toFixed(2));
		if(this.fitness < 0) this.fitness = 0;
	}

	this.calcularFitness();

}