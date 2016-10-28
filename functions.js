var getRandomNumber = function (min, max){
	return Math.floor(Math.random() * max + min);
}

var dec2bin = function(dec){
    return (dec >>> 0).toString(2);
}

var getRandomNumberBinary = function() {
	var randomNumber = getRandomNumber(0, 15);
	var returnObject = { decimal: randomNumber, binario: pad(dec2bin(randomNumber), 4)}
	return returnObject;
}

var getRandomFloat2 = function(min, max){
	return Math.random() * max + min;
}


var getRandomFloat = function(min, max){
	var returnObject = { decimal: Math.random() * max + min, binario: "0000"}
	return returnObject;
}

var pad = function (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var getRandomItem = function(items){
	return items[Math.floor(Math.random()*items.length)];
}