App.controller('UserCtrl', ['$scope', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope', 'TableOrder',
    function($scope, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope, TableOrder) {
    	var ng = $scope;
    	
    	ng.sort = {
			col:'',
			desc:false
		}

		currentCol = ng.sort.col;
		currentDesc = ng.sort.desc;

		ng.sorting = function(col, currentCol, currentDesc){
			console.log(col);
			ng.sort = TableOrder.sort(col, currentCol, currentDesc);
			console.log(ng.sort);
		}

    	$http.get('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token).success(function(data){
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

		}


    }
]);