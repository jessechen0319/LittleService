var express = require('express');
var router = express.Router();
var util = require('../dms_service/Util');
var mailService = require('../EmailService');
var dbService = require('../dms_service/DBService');

router.get('/', function(req, res, next) {
	res.render('dms/login');
});

router.get('/index', function(req, res, next) {
	res.render('dms/index_content');
});

router.get('/register', function(req, res, next) {
	res.render('dms/register');
});

router.get('/registerValicationCode', function(req, res, next) {
	var mail = req.query.mail;
	if(!mail||mail.trim()==''){
		throw new Error(`mail should not be null`);
	} else {
		var validationCode = util.generateSixRandom();
		var body = `Your register code is: ${validationCode}`;
		mailService.sendSimpleMessage(mail, body, function(err){
			if (err) {
				throw err;
			}else{
				var db = dbService.readDB();
				db.mailNotification[mail]=validationCode;
				dbService.writeDB(db);
				res.statusCode=200;
				res.end();
			}
		});
	}
	
});

router.get('/registerValicate', function(req, res, next) {
	var mail = req.query.mail;
	var code = req.query.code;
	if(!mail||mail.trim()==''||!code||code.trim()==''){
		throw new Error(`mail or code should not be null`);
	} else {
		var db = dbService.readDB();
		if(db.mailNotification[mail]==code){
			res.statusCode=200;
			res.end();
		}else {
			throw new Error(`Validation Code is not correct`);
		}
	}
});

module.exports = router;
