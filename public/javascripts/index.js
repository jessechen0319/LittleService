 var app = angular.module('CFRD', []);
 app.controller('Index', function($scope, $rootScope,$http) {
  	
  	$scope.chosedTopic = [true, false, false, false];
    $scope.query = {};
  	$scope.query.tags = {0:[], 1:[], 2:[], 3:[]};
    $scope.query.tagFilter = $scope.query.tags[0].concat($scope.query.tags[1]).concat($scope.query.tags[2]).concat($scope.query.tags[3]);
    $rootScope.messages = [];
    $rootScope.remoteMessage = function(msg){
      var index = $rootScope.messages.indexOf(msg);
      $rootScope.messages.splice(index, 1);
    };
  	function getSelectedTopic(){
  		var selectedTopic = "";
  		$scope.chosedTopic.forEach(function(item, index){
  			if(item){
  				selectedTopic = index;
  			}
  		});
  		return selectedTopic;
  	}

  	function isTagExisted(topic, tag){
  		var isExisted = false;

  		$scope.query.tags[topic].forEach(function(item){
  			if(tag == item){
  				isExisted = true;
  			}
  		});
  		return isExisted;
  	}

  	$scope.choseTopic = function(index, event){
  		$scope.chosedTopic = [false,false,false,false];
  		$scope.chosedTopic[index-1] = true;
  	};

    function isAnyTagSelected(){

      var result = false;
      for(var i = 0; i<4; i++){
        if($scope.query.tags[i].length>0){
          result = true;
        }
      }
      return result;
    }

    function refreshChosenTags(){

      $scope.records = [];

      $scope.db.forEach(function(record){
        var flag = [true, true, true, true];
        for(var i = 0; i<4; i++){
          $scope.query.tags[i].forEach(function(tag){
            if(record.tags[i].indexOf(tag)>=0){
              flag[i]=true;
            } else {
              flag[i]=false;
            }
          });
        }
        var canInsert = !flag.some(function(item){return !item;});
        if(canInsert){
          $scope.records.push(record);
        }
      });
      for(var i = 0; i<4; i++){
        if($scope.query.tags[i].length>0){
          $scope.query.tags[i].forEach(function(item){
            
          });
        }
      }
    }

  	$scope.choseTag = function(tag, event){

  		if(!$scope.query.tags[getSelectedTopic()]){
  			return false;
  		}

  		var isExisted = isTagExisted(getSelectedTopic(), tag);
  		$scope.createNew = false//show the result tag.
  		if(isExisted){
  			var index = $scope.query.tags[getSelectedTopic()].indexOf(tag);
  			$scope.query.tags[getSelectedTopic()].splice(index, 1);
  			event.srcElement.className = "tag";
  		}else{
  			$scope.query.tags[getSelectedTopic()].push(tag);
  			event.srcElement.className = "tag selected-tag";
  		}
  		//event.srcElement.className
      refreshChosenTags();
  	};

    $http({
      method: 'GET',
      url: '/getAllRecords'
    }).then(function(data){
      $scope.db = data.data;
      $scope.records = data.data;
    }, function(){
      $rootScope.messages.push("can not fetch any record");
    });

    $http({
      method: 'GET',
      url: '/getAllTags'
    }).then(function(data){
      $scope.tags = data.data;
    }, function(){
      $rootScope.messages.push("can not fetch any tags");
    });

  });


