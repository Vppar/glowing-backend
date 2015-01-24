myApp.factory('TokenInterceptorFactory', function($q, $window) {
	return {
		request: function(config) {
			config.url = config.url || {};
			if ($window.sessionStorage.token) {
				config.url = config.url+'?token='+$window.sessionStorage.token;
			}
			return config || $q.when(config);
		},
		response: function(response) {
			return response || $q.when(response);
		}
	};
});