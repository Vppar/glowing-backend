myApp.controller("CompanyCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.products = [];

    // Access the factory and get the latest products list
    dataFactory.getProducts().then(function(data) {
      $scope.products = data.data;
    });

  }
]);