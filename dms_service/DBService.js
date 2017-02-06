var jsonfile = require('jsonfile')
var file = __dirname+'/../db/dms.json'
function readDB(){
	return jsonfile.readFileSync(file);
}

function writeDB(obj){
	jsonfile.writeFileSync(file, obj);
}


exports.readDB = readDB;
exports.writeDB = writeDB;