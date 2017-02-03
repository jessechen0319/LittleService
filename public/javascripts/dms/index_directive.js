app.controller('IndexContentController', function($scope, $rootScope,$http) {

});

app.directive("dmsIndex", function(){
	return {
		templateUrl: "/dms/index",
		controller: "IndexContentController"
	};
});