var email = require("./node_modules/emailjs/email");
var conf = require(__dirname+"/dms_service/ConfReaderService");
var server 	= email.server.connect({
   user:    conf.user, 
   password:conf.password, 
   host:    conf.smtp, 
   ssl:     true
});
 
// send the message and get a callback with an error or details of the message that was sent 


function sendSimpleMessage(reciver, message, callback){
	server.send({
	   text:    message, 
	   from:    conf.user, 
	   to:      reciver,
	   subject: "AMD DMS Notification Message"
	}, function(err) { callback(err); });
}

module.exports.sendSimpleMessage = sendSimpleMessage;