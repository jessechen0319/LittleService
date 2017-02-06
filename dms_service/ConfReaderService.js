var conf = {};
var fs = require('fs');
var content = fs.readFileSync(__dirname+"/../conf/dms.conf", 'utf-8');
var lines = content.split("\r\n");
if(lines&&lines.length>0){
	lines.forEach(function(line){
		var confContent = line.split("=");
		var key = confContent[0];
		var value = confContent[1];
		conf[key] = value;
	});
}
module.exports = conf;
