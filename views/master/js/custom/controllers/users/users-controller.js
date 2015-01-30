App.controller('UserCtrl', ['$scope', 'toaster', '$modal', '$window', '$http', '$sce', '$location', 'LoginFactory', 'SessionStorageFactory', '$rootScope', 'TableOrder',
    function($scope, toaster, $modal, $window, $http, $sce, $location, LoginFactory, SessionStorageFactory, $rootScope, TableOrder) {
		
		$scope.sorting = function(col){
			currentCol = $scope.sort.col;
			currentDesc = $scope.sort.desc;
			$scope.sort = TableOrder.sort(col, currentCol, currentDesc);
		}

		$scope.select = function(index, id){
			if($scope.index.rowIndex == index){
				$scope.index = {
					rowIndex:undefined,
					rowUser:undefined
				}
			}else{
				$scope.index = {
					rowIndex:index,
					rowUser:id
				}
			}
		}

		$scope.editUser = function(){
			if($scope.index.rowIndex == undefined || $scope.index.rowUser == undefined){
				toaster.pop('warning', 'Selecione', 'Selecione um usuário para editar');
			}else{
				var id = $scope.index.rowUser;
				$scope.go("app.user-edit", {"id":id});
			}
		};

		$scope.deleteUser = function(id){

			if($scope.index.rowIndex == undefined || $scope.index.rowUser == undefined){
				toaster.pop('warning', 'Selecione', 'Selecione um usuário para excluir');
			}else{
				$http.delete('http://localhost:8080/api/v1/users/'+id+'?token='+$window.sessionStorage.token).success(function(data){
					alert('Usuario deletado com sucesso');
				});
			}

		};

		var init = function(){
	    	$http.get('http://localhost:8080/api/v1/users?token='+$window.sessionStorage.token).success(function(data){
	    		$scope.users = data;
	    		console.log(data);
	        });

	        $scope.index = {
					rowIndex:undefined,
					rowUser:undefined
				}
	    	
	    	$scope.sort = {
				col:'',
				desc:false
			}
		
		}

		init();
    }
]);