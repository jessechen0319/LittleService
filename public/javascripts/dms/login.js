var app = angular.module('dms', []);
app.controller('LoginController', function($scope, $rootScope, $http) {
	
	$scope.loginButtonText = "Get Ping Code";
	$scope.loginTimeout = 0;
	$scope.validationCodeOK = false;
	function showMessages(msg){
		$(".register-messages").fadeIn();
		$scope.registerMessage = msg;
		setTimeout(function(){
			$(".register-messages").fadeOut();
		}, 1500);
	}
	

	$scope.getPingCode = function(event){
		var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
		if(!$scope.email||$scope.email.trim()==''||!regex.test($scope.email)){
			$('.input-email').addClass('has-error');
			return;
		}
		$('.input-email').removeClass('has-error');
		$scope.loginTimeout = 60;
		$scope.loginTimeout--;
		event.target.disabled = true;
		event.target.textContent = `Get Code After ${$scope.loginTimeout}`;

		$http({
		  method: 'GET',
		  url: `/dms/registerValicationCode?mail=${$scope.email}`
		}).then(function(data){
		  showMessages('Validation code has been sent, please check your email');
		  setInterval(function(){
		  	if ($scope.loginTimeout>0) {
		  		$scope.loginTimeout--;
		  		event.target.disabled = true;
		  		event.target.textContent = `Get Code After ${$scope.loginTimeout}`;
		  	} else {
		  		event.target.disabled = false;
		  		event.target.textContent = "Get Ping Code";
		  	}
		  }, 1000);
		}, function(){
		  showMessages("Cannot send validation message to your mail box");
		});
	};

	$scope.validateCode = function(){
		$http(
			{
			method: 'GET',
			url: `/dms/registerValicate?mail=${$scope.email}&code=${$scope.validationCode}`
			}
		).then(function(){
			showMessages("validation good");
		}, function(){
			showMessages("validation bad");
		});
	};
});