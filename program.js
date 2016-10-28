var p = new Poblacion();
var contarIguales = 0;
var generacion = 0;
var igual = 0;
while (contarIguales < 50 && generacion < 5000){
	p.evaluar();
	p.seleccion();
	console.log(generacion, p.mejorFitness);
	if(p.mejorFitness == igual) {
		contarIguales ++;
	}else{
		igual = p.mejorFitness;
		contarIguales = 1;
	}
	generacion ++;
}
console.log(p.mejorElemento);

