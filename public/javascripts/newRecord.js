app.controller("CreateNewRecord", function($rootScope, $scope, $http){
	$scope.showTagTitles=[false, false, false, false];
	$scope.addedTags={0:[], 1:[], 2:[], 3:[]};

	function isTagsEmpty(){
		var notEmpty = $scope.addedTags[0].length>0||$scope.addedTags[1].length>0||$scope.addedTags[2].length>0||$scope.addedTags[3].length>0;
		return !notEmpty;
	}

	function checkCanInsert(){
		 let isCanSubmit = !isTagsEmpty();
		  isCanSubmit = isCanSubmit && $scope.discription.trim() !="";
		  isCanSubmit = isCanSubmit && $scope.solution.trim() !="";
		 return isCanSubmit;
	}

	function cleanInput(){
		$scope.showTagTitles=[false, false, false, false];
		$scope.addedTags={0:[], 1:[], 2:[], 3:[]};
		$scope.discription = '';
		$scope.solution = '';
	}

	$scope.submitRecord = function(){

		if(checkCanInsert()){
			$scope.isDisable = true;
			var submitObject = {
				"discription": $scope.discription.trim(),
				"solution": $scope.solution.trim(),
				"tags": $scope.addedTags
			};

			$http({
			  method: 'POST',
			  url: '/insertRecord',
			  data: submitObject
			}).then(function(){
				$scope.isDisable = false;
				cleanInput();
				$rootScope.messages.push('The record is added!');
			}, function(){
				$scope.isDisable = false;
				$rootScope.messages.push('The record is not added, error happened!');
			});
		}
	};

	$scope.addTag = function(tagNum){
		
		var tagContent = $(".input-group>input").val();
		if(tagContent && tagContent != ""){
			$scope.showTagTitles[tagNum] = true;
			$scope.addedTags[tagNum].push(tagContent);
			$(".input-group>input").val("");
		}
	};
});

app.directive("createNewRecord", function(){
	return {
		templateUrl: "/createNewRecord",
		controller: "CreateNewRecord"
	};

});