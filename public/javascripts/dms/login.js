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
		if(!$scope.email||$scope.email.trim()==''||!$scope.validationCode||$scope.validationCode.trim()==''){
			showMessages("Please input your email and validation code firstly");
		}
		$http(
			{
			method: 'GET',
			url: `/dms/registerValicate?mail=${$scope.email}&code=${$scope.validationCode}`
			}
		).then(function(){
			$scope.validationCodeOK = true;
		}, function(){
			$scope.validationCodeOK = false;
		});
	};

	$scope.submitRegister = function(){

		$('.pass1').removeClass('has-error');
		$('.pass2').removeClass('has-error');
		if(!$scope.validationCodeOK){
			showMessages("Please verify you email firstly.");
		}
		if($scope.pass1&&$scope.pass2&&$scope.pass1.trim()!=''&&$scope.pass2.trim()!=''){
			if($scope.pass1.trim()!=$scope.pass2.trim()){
				showMessages("two input are not equal");
				$('.pass2').addClass('has-error');
			} else {
				$http(
					{
					method: 'GET',
					url: `/dms/registerConfirm?mail=${$scope.email}&pass=${$scope.pass1.trim()}`
					}
				).then(function(){
					showMessages("register finished, will redirect you to login page");
					setTimeout(function(){
						location.pathname='/dms'
					}, 3000);
				}, function(){
					showMessages("Register fail, please contact you admin");
				});
			}
		} else {
			showMessages("password and confirm should not be empty");
			$('.pass1').addClass('has-error');
			$('.pass2').addClass('has-error');
		}
	};

	$scope.submitLogin = function(){
		if($scope.user&&$scope.pass&&$scope.user.trim()!=''&&$scope.pass.trim()!=''){
			$http(
				{
				method: 'GET',
				url: `/dms/loginConfirm?user=${$scope.user}&pass=${$scope.pass.trim()}`
				}
			).then(function(res){
				if(res.data.validate){
					showMessages('Login successfully');
					location.pathname='/dms/mainPage';
				}else{
					showMessages('Login failed, please check your user name or password.');
				}
			}, function(){
				showMessages('Login fail, please contact your administrator');
			});
		} else {
			showMessages('user name and password could not be empty');
		}
	};
});