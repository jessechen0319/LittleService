var express = require('express');
var router = express.Router();
var util = require('../dms_service/Util');
var mailService = require('../EmailService');
var dbService = require('../dms_service/DBService');
var conf = require('../dms_service/ConfReaderService');

router.get('/', function(req, res, next) {
	res.render('dms/login');
});

router.get('/index', function(req, res, next) {
	res.render('dms/index_content');
});

router.get('/register', function(req, res, next) {
	res.render('dms/register');
});

router.get('/mainPage', function(req, res, next) {
	res.render('dms/main', {'columnDefine':util.getColumnAndConf(conf)});
});


router.get('/loginConfirm', function(req, res, next) {

	var user = req.query.user;
	var pass = req.query.pass;
	var db = dbService.readDB();
	var isUserOk = db.users.some(function(item){
		return item.mail==user&&item.pass==pass
	});
	if(isUserOk){
		req.session.user={'mail':user, 'pass':pass};
	}
	res.statusCode=200;
	res.end(JSON.stringify({"validate":isUserOk}));
});

router.get('/registerConfirm', function(req, res, next) {
	var mail = req.query.mail;
	var pass = req.query.pass;
	if(!mail||mail.trim()==''||!pass||pass.trim()==''){
		throw new Error(`mail and pass are not correct, please check.`);
	} else {
		var db = dbService.readDB();
		db.users.push({'mail':mail, 'pass':pass, 'id':db.users.length, 'status':'active'});
		dbService.writeDB(db);
		res.statusCode=200;
		res.end();
	}
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
