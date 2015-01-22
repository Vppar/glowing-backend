App.controller("HeaderCtrl", ['$scope', '$location', 'LoginFactory',
  function($scope, $location, LoginFactory) {
    $scope.isActive = function(route) {
      return route === $location.path();
    }
    $scope.logout = function() {
      LoginFactory.logout();
    }
  }
]);