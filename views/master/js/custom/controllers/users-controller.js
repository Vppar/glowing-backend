App.controller('UserCtrl', ['$scope', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope',
    function($scope, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope) {
    	var ng = $scope;
    	
    	$http.get('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token, $scope.user).success(function(data){
    		ng.users = data;
    		console.log(ng.users);
        });


    	ng.user = {
	    	username:'',
			password:'',
			domain:'',
			role:'',
		}

		ng.addUser = function(){
			// console.log(ng.user);
			$http.post('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token, $scope.user).success(function(data){
				console.log(data);
				ng.user = {
			    	username:'',
					password:'',
					domain:'',
					role:'',
				}
            });
		}

		ng.editUser = function(user){
			console.log("EDIT"+user.username);
		}

		ng.deleteUser = function(user){
			console.log("DELETE"+user.username);

		}


    }
]);