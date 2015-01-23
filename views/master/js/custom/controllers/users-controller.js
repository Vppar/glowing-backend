App.controller('UserCtrl', ['$scope', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope',
    function($scope, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope) {
    	var ng = $scope;
    	console.log($rootScope.title);
    	console.log($rootScope.iconCategory);
    	
    	$http.get('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token, $scope.user).success(function(data){
    		ng.users = data;
        });


    	ng.user = {
	    	username:'',
			password:'',
			domain:'',
			role:'',
		}

		ng.addUser = function(){
			$http.post('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token, $scope.user).success(function(data){
				ng.user = {
			    	username:'',
					password:'',
					domain:'',
					role:'',
				}
            });
		}


    }
]);