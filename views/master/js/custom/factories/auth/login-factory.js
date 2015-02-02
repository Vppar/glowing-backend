App.factory('LoginFactory', function($window, $location, $state, $http, SessionStorageFactory) {
	return {
		login: function(username, password, domainName) {
			return $http.post('http://localhost:8080/api/authentication', {
				username: username,
				password: password,
				domainName: domainName
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
				$state.go('page.login');
			}
		}
	}
});