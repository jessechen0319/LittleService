var express = require('express');
var db = require('../DBService');
var tool = require('../ToolService');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/createNewRecord', function(req, res, next) {
  res.render('createNewRecord');
});

router.get('/getAllTags', function(req, res, next) {
	res.write(JSON.stringify(tool.getAllTags()));
	res.statusCode=200;
	res.end();
});

router.get('/getAllRecords', function(req, res, next) {

	res.write(JSON.stringify(db.readDB().items));
	res.statusCode=200;
	res.end();
});

router.post('/insertRecord', function(req, res, next) {
  
  var data = db.readDB();
  data.items.push(req.body);
  db.writeDB(data);
  res.statusCode=200;
  res.end();
});

router.get("/task", function(req, res, next){
	if(!req.query.code||req.query.code.trim()==''){
		throw new Error('ping code is necessary');
	} else {
		res.render('task',{code: req.query.code});
	}
	
});

module.exports = router;
