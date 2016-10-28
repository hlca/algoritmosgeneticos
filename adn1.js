function ADN(genes) {

	var validarNumeros = function(x, y) {
		return (x + 2*y <= 30);
	}

	var forzarNumero1 = function(y) {
		return 30 - 2*y;
	}

	var forzarNumero2 = function(x) {
		return Math.floor((30 - x)/2);
	}

	if(genes) {
		this.genes = genes;
	} else{
		var numero1 = getRandomNumberBinary();
		var numero2 = getRandomNumberBinary();

		while (!validarNumeros(numero1.decimal, numero2.decimal)){
			numero1 = getRandomNumberBinary();
			numero2 = getRandomNumberBinary();
		}
		this.genes = {x1: numero1, x2:  numero2};
 	}

	this.crossover = function(padre) {
		var newGenes = {x1: {decimal: 0, binario: "0000"}, x2: {decimal: 0, binario: "0000"}};
		var longitudNumero = this.genes.x1.binario.length;
		var mitad = getRandomNumber(0, longitudNumero);//Math.floor(longitudNumero / 2);
		for(var i = 0; i < longitudNumero; i++) {
			if(i > mitad-1) {
				newGenes.x1.binario = newGenes.x1.binario.replaceAt(i, this.genes.x1.binario[i]);
				newGenes.x2.binario = newGenes.x2.binario.replaceAt(i, this.genes.x2.binario[i]);
			}else{
				newGenes.x1.binario = newGenes.x1.binario.replaceAt(i, padre.x1.binario[i]);
				newGenes.x2.binario = newGenes.x2.binario.replaceAt(i, padre.x2.binario[i]);
			}
		}

		newGenes.x1.decimal = parseInt(newGenes.x1.binario, 2);
		newGenes.x2.decimal = parseInt(newGenes.x2.binario, 2);


		if(!validarNumeros(newGenes.x1.decimal, newGenes.x2.decimal)){
			if(Math.random() < 0.5) {
				newGenes.x1.decimal = forzarNumero1(newGenes.x2.decimal);
				newGenes.x1.binario = pad(dec2bin(newGenes.x1.decimal) ,4)
			}else{
				newGenes.x2.decimal = forzarNumero2(newGenes.x1.decimal);
				newGenes.x2.binario = pad(dec2bin(newGenes.x2.decimal) ,4)
			}
		}

		// newGenes.x1.decimal = (this.genes.x1.decimal + padre.x1.decimal) / 2;
		// newGenes.x2.decimal = (this.genes.x2.decimal + padre.x2.decimal) / 2;

		// newGenes.x1.binario = dec2bin(newGenes.x1.decimal);
		// newGenes.x2.binario = dec2bin(newGenes.x2.decimal);

		this.genes = newGenes;
		this.calcularFitness();
		return new ADN(newGenes);
	}

	this.mutacion = function(porcentaje) {
		for(var i = 0; i < this.genes.x1.binario.length; i++) {
			if(Math.random() < porcentaje) {
				//Se va a cambiar
				if(Math.random() < 0.5) {
					//X1
					var reemplazo = this.genes.x1.binario[i];
					reemplazo = (reemplazo == "1" ? "0" : "1");
					this.genes.x1.binario = this.genes.x1.binario.replaceAt(i, reemplazo);
				}else{
					//X2
					var reemplazo = this.genes.x2.binario[i];
					reemplazo = (reemplazo == "1" ? "0" : "1");
					this.genes.x2.binario = this.genes.x2.binario.replaceAt(i, reemplazo);
				}
				
			}
		}

		this.genes.x1.decimal = parseInt(this.genes.x1.binario, 2);
		this.genes.x2.decimal = parseInt(this.genes.x2.binario, 2);

		if(!validarNumeros(this.genes.x1.decimal, this.genes.x2.decimal)){
			if(Math.random() < 0.5) {
				this.genes.x1.decimal = forzarNumero1(this.genes.x2.decimal);
				this.genes.x1.binario = pad(dec2bin(this.genes.x1.decimal) ,4)
			}else{
				this.genes.x2.decimal = forzarNumero2(this.genes.x1.decimal);
				this.genes.x2.binario = pad(dec2bin(this.genes.x2.decimal) ,4)
			}
		}

		
		this.calcularFitness();
	}

	this.calcularFitness = function(){
		var x1 = this.genes.x1.decimal;
		var x2 = this.genes.x2.decimal;

		this.fitness = (15 * x1) + (30 * x2) + (4 * x1 * x2) - (2 * x1 * x1) - (4 * x2 * x2);
		if(this.fitness < 0) this.fitness = 0;
	}

	this.calcularFitness();

}