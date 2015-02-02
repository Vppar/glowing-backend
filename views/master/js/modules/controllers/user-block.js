App.controller('UserBlockController', ['$scope', function($scope) {

  $scope.userBlockVisible = false;
  
  $scope.$on('toggleUserBlock', function(event, args) {

    $scope.userBlockVisible = ! $scope.userBlockVisible;
    
  });

}]);