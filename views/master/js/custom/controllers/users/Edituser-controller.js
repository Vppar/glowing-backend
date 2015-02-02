App.controller('EditUserCtrl', ['$scope', 'toaster', '$stateParams', '$modal', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope', 'TableOrder',
    function($scope, toaster, $stateParams, $modal, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope, TableOrder) {
    	console.log($stateParams);
    	
		$scope.editUser = function(){
			var id = $stateParams.id;
			$scope.userSend = {
		    	username: $scope.user.username,
				role:$scope.user.role,
				domainName:$scope.user.domainName,
				firstName:$scope.user.firstName,
				lastName:$scope.user.lastName,
				phone:$scope.user.phone,
				active:$scope.user.active 
			}

		  	$http.put('http://localhost:8080/api/v1/users/'+id+'?token='+$window.sessionStorage.token, $scope.userSend).success(function(data){
				toaster.pop('success', 'Atualizado', 'Cadastro atualizado com sucesso');
	    	});	
		};

		var init = function(){
			var id = $stateParams.id;
	    	$http.get('http://localhost:8080/api/v1/users/'+id+'?token='+$window.sessionStorage.token).success(function(data){
	    		$scope.user = data;
	    		console.log($scope.user);
	    	});
	    }
		init();
	}
]);