/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES', '$httpProvider',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires, $httpProvider) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  // LAZY MODULES
  // ----------------------------------- 

  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: appRequires.modules
  });

  // $httpProvider.interceptors.push('TokenInterceptorFactory');

  // defaults to dashboard
  $urlRouterProvider.otherwise('/app/dashboard');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        // abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        data:{
            requiredLogin: true
        },
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
    })
    .state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        templateUrl: basepath('dashboard.html'),
        data:{
            requiredLogin: true,
            iconCategory: "fa fa-dashboard"
        },
        resolve: resolveFor('flot-chart','flot-chart-plugins')

    })
    .state('app.admin-list', {
        url: '/user-list',
        title: 'Listagem de Usuários',
        templateUrl: basepath('user-list.html'),
        data:{
            requiredLogin: true,
            iconCategory: "fa fa-user"

        },
        controller: 'UserCtrl',
        resolve: resolveFor('datatables', 'datatables-pugins')
    })
    .state('app.user-add', {
        url: '/user-add',
        title: 'Cadastro de Usuários',
        templateUrl: basepath('user-add.html'),
        data:{
            requiredLogin: true,
            iconCategory: "fa fa-user"

        },
        controller: 'UserCtrl',
    })

    .state('app.comercial-vendas', {
        url: '/ComercialVendas',
        title: 'Cadastro de Usuários',
        templateUrl: basepath('comercial-vendas.html'),
        data:{
            requiredLogin: true,
            iconCategory: "fa fa-building"

        },
        controller: 'UserCtrl',
    })

    .state('app.produtos-cadastro', {
        url: '/CadastroProdutos',
        title: 'Cadastro de Produtos',
        templateUrl: basepath('produtos-cadastro.html'),
        data:{
            requiredLogin: true,
            iconCategory: "fa fa-folder-open"

        },
        controller: 'UserCtrl',
    })
    // 
    // Single Page Routes
    // ----------------------------------- 
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        data: {
            requiredLogin:false
        },
        resolve: resolveFor('modernizr', 'icons', 'parsley')
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html',
        controller: 'LoginCtrl'
    });


    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;
      return {
        deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
          // Creates a promise chain for each argument
          var promise = $q.when(1); // empty promise
          for(var i=0, len=_args.length; i < len; i ++){
            promise = andThen(_args[i]);
          }
          return promise;

          // creates promise to chain dynamically
          function andThen(_arg) {
            // also support a function that returns a promise
            if(typeof _arg == 'function')
                return promise.then(_arg);
            else
                return promise.then(function() {
                  // if is a module, pass the name. If not, pass the array
                  var whatToLoad = getRequired(_arg);
                  // simple error check
                  if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  // finally, return a promise
                  return $ocLL.load( whatToLoad );
                });
          }
          // check and returns required data
          // analyze module items with the form [name: '', files: []]
          // and also simple array of script files (for not angular js)
          function getRequired(name) {
            if (appRequires.modules)
                for(var m in appRequires.modules)
                    if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                        return appRequires.modules[m];
            return appRequires.scripts && appRequires.scripts[name];
          }

        }]};
    }

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }])
.controller('NullController', function() {});

App.run(function ($rootScope, $state, $window, SessionStorageFactory) {
  SessionStorageFactory.check();
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requiredLogin = toState.data.requiredLogin;
    if (requiredLogin && !SessionStorageFactory.isLogged) {
      event.preventDefault();
      $state.go('page.login');
    } else {
      if (!SessionStorageFactory.user) SessionStorageFactory.user = $window.sessionStorage.user;
      if (!SessionStorageFactory.userRole) SessionStorageFactory.userRole = $window.sessionStorage.userRole;
      $rootScope.title = toState.title;
      $rootScope.iconCategory = toState.data.iconCategory;

    }
  });

});