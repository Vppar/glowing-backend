//FIX ME
myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'LoginFactory', 'SessionStorageFactory',
    function($scope, $window, $location, LoginFactory, SessionStorageFactory) {

        $scope.user = {};

        $scope.login = function() {

            var username = $scope.user.username,
                password = $scope.user.password,
                domain = $scope.user.domain;
            if (username !== undefined && password !== undefined && domain !== undefined) {
                LoginFactory.login(username, password, domain).success(function(data) {
                    SessionStorageFactory.isLogged = true;
                    SessionStorageFactory.username = data.username;
                    SessionStorageFactory.userRole = data.role;
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.username = data.username;
                    $window.sessionStorage.userRole = data.role;
                    $location.path("/");
                }).error(function(status) {
                    console.log(status);
                    alert('Oops something went wrong!');
                });
            } else {
                alert('Invalid credentials');
            }
        };
    }
]);