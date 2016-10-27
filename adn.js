function ADN(genes) {

	var validarNumeros = function(x, y) {
		return (x + 2*y <= 30);
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
		this.genes = {x1: numero1, x2: numero2};
 	}

	this.crossover = function(padre) {
		var newGenes = {x1: {decimal: 0, binario: "0000"}, x2: {decimal: 0, binario: "0000"}};
		var longitudNumero = this.genes.x1.binario.length;
		var mitad = Math.floor(longitudNumero / 2);
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

		this.genes = newGenes;
	}

	this.mutation = function() {
		for(var i = 0; i < this.genes.x1.binario.length; i++) {
			if(Math.random() < 0.2) {
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
	}
}