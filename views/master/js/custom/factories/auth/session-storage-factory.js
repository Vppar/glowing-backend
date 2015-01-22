App.factory('SessionStorageFactory', function($window) {
	var auth = {
		isLogged: false,
		check: function() {
			if ($window.sessionStorage.token && $window.sessionStorage.username) {
				this.isLogged = true;
			} else {
				this.isLogged = false;
				delete this.user;
			}
		}
	}
	return auth;
});