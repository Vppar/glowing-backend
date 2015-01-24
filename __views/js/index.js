var myApp = angular.module('index', ['ngRoute']);
myApp.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptorFactory');
  $routeProvider
    .when('/login', {
      templateUrl: 'html/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'html/main.html',
      controller: 'MainCtrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/login'
    });
});
myApp.run(function($rootScope, $window, $location, SessionStorageFactory) {  
  SessionStorageFactory.check();
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !SessionStorageFactory.isLogged) {
      $location.path("/login");
    } else {
      if (!SessionStorageFactory.user) SessionStorageFactory.user = $window.sessionStorage.user;
      if (!SessionStorageFactory.userRole) SessionStorageFactory.userRole = $window.sessionStorage.userRole;
    }
  });
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = SessionStorageFactory.isLogged;
    $rootScope.role = SessionStorageFactory.userRole;
    if (SessionStorageFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});