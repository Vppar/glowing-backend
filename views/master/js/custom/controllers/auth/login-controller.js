//FIX ME
App.controller('LoginCtrl', ['$scope', '$http', '$rootScope', '$window', '$location', 'LoginFactory', 'SessionStorageFactory',
    function($scope, $http, $rootScope, $window, $location, LoginFactory, SessionStorageFactory) {

        $scope.user = {};
        console.log($scope.user);

        $scope.login = function() {

            var username = $scope.user.username,
                password = $scope.user.password,
                domainName = $scope.user.domainName;
                

            if (username !== undefined && password !== undefined && domainName !== undefined) {
                LoginFactory.login(username, password, domainName).success(function(data) {
                    $http.get('http://localhost:8080/api/v1/users/'+data.userId+'?token='+data.token).success(function(dataGet){
                        $rootScope.user = {
                            name:     dataGet.firstName +' '+dataGet.lastName,
                            job:      dataGet.role,
                            picture:  'app/img/user/01.jpg'
                        };

                    SessionStorageFactory.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.username = dataGet.username;
                    $window.sessionStorage.userRole = dataGet.role;
                    $location.path("/");
                    });
                    
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