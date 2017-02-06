function generateSixRandom(){
	var num = Math.random()*1000000;
	return num.toFixed(0);
}

module.exports.generateSixRandom = generateSixRandom;