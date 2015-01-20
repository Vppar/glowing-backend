myApp.factory('LoginFactory', function($window, $location, $http, SessionStorageFactory) {
	return {
		login: function(username, password, domain) {
			return $http.post('http://localhost:8080/api/authentication', {
				username: username,
				password: password,
				domain: domain
			});
		},
		logout: function() {
			if (SessionStorageFactory.isLogged) {
				SessionStorageFactory.isLogged = false;
				delete SessionStorageFactory.user;
				delete SessionStorageFactory.userRole;
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.user;
				delete $window.sessionStorage.userRole;
				$location.path("/login");
			}
		}
	}
});