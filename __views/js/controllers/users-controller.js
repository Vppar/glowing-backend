App.controller('UserCtrl', ['$scope', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', 'AlertFactory',
    function($scope, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, AlertFactory) {
    	var ng = $scope;
    	
    	$http.get('http://localhost:8080/api/v1/users', $scope.user).success(function(data){
    		ng.users = data;
        });

        console.log(ng.users);

    	ng.user = {
	    	username:'',
			password:'',
			domain:'',
			role:'',
		}

		ng.addUser = function(){
			$http.post('http://localhost:8080/api/v1/users', $scope.user).success(function(data){
				ng.msg = AlertFactory.request('success','Usuario cadastrado com sucesso. ID:'+data._id);;
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