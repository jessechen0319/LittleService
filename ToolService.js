var db = require('./DBService');

function removeduplicate(arr){
	var uniqueNames = [];
	arr.forEach(function(i, el){
	    if(uniqueNames.indexOf(i)<0) uniqueNames.push(i);
	});
	return uniqueNames;
}

function getAllTags(){
	var data = db.readDB();
	var tags={"0":[],"1":[],"2":[],"3":[]};
	data.items.forEach(function(item){
		item.tags["0"].forEach(function(tag){
			tags["0"].push(tag);
		});
		item.tags["1"].forEach(function(tag){
			tags["1"].push(tag);
		});
		item.tags["2"].forEach(function(tag){
			tags["2"].push(tag);
		});
		item.tags["3"].forEach(function(tag){
			tags["3"].push(tag);
		});
	});
	tags["0"] = removeduplicate(tags["0"]);
	tags["1"] = removeduplicate(tags["1"]);
	tags["2"] = removeduplicate(tags["2"]);
	tags["3"] = removeduplicate(tags["3"]);
	return tags;
}

exports.removeduplicate = removeduplicate;
exports.getAllTags = getAllTags;