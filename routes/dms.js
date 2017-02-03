var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('dms/login');
});

router.get('/index', function(req, res, next) {
	res.render('dms/index_content');
});

router.get('/register', function(req, res, next) {
	res.render('dms/register');
});

module.exports = router;
