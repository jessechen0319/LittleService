function generateSixRandom(){
	var num = Math.random()*1000000;
	return num.toFixed(0);
}

function getColumnAndConf(conf){
	var keysets = Object.keys(conf);
	var columns = [];
	keysets.forEach(function(key){
		if(key.indexOf('column')>=0){
			let val = conf[key];
			let columnKey = key.slice(7, key.length);
			let columnKeyArr = columnKey.split('.');
			let columnNum = columnKeyArr[0];
			let columnKeyVal = columnKeyArr[1];
			var columnObj = {};
			columnObj.index = columnNum;
			columnObj[columnKeyVal] = val;
			columns.push(columnObj);
		}
	});

	return columns;
}

module.exports.generateSixRandom = generateSixRandom;
module.exports.getColumnAndConf = getColumnAndConf;