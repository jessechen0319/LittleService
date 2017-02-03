var app = angular.module('dms', []);
app.controller('LoginController', function($scope, $rootScope, $http) {
	
	$scope.loginButtonText = "Get Ping Code";
	$scope.loginTimeout = 0;

	$scope.getPingCode = function(event){
		$scope.loginTimeout = 60;
		$scope.loginTimeout--;
		event.target.disabled = true;
		event.target.textContent = `Get Code After ${$scope.loginTimeout}`;
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
	};
});