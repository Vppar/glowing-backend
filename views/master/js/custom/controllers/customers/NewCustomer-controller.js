App.controller('NewCustomerCtrl', ['$scope', 'toaster', '$modal', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope', 'TableOrder',
    function($scope, toaster, $modal, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope, TableOrder) {
    			
		$scope.addUser = function(){
			// console.log($scope.user);
			$http.post('http://localhost:8080/api/v1/customer?token='+$window.sessionStorage.token, $scope.user).success(function(data){
				toaster.pop('success', 'Cadastrado', 'Cadastro efetuado com sucesso');
				$scope.user = {
			    	username:'',
					role:'',
					domainName:'',
					firstName:'',
					lastName:'',
					phone:''
				}
            });
		};

		var init = function(){
	    	var ng = $scope;

	    	$scope.user = {
		    	username:'',
				role:'',
				domainName:'',
				firstName:'',
				lastName:'',
				phone:''
			}
		}

		init();
    }
]);