var email = require("./node_modules/emailjs/email");
var server 	= email.server.connect({
   user:    "jesse_001@163.com", 
   password:"4035535", 
   host:    "smtp.163.com", 
   ssl:     true
});
 
// send the message and get a callback with an error or details of the message that was sent 
server.send({
   text:    "i hope this works", 
   from:    "jesse_001@163.com", 
   to:      "48510049@qq.com",
   subject: "testing emailjs"
}, function(err) { console.log(err); });