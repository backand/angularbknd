'use strict';

angular.module('backAnd', [
    'ngRoute',
    'ngResource',
    'ngGrid',
    'ui.bootstrap',
    'backAnd.filters',
    'backAnd.services',
    'backAnd.directives',
    'backAnd.controllers'
]).config(['$routeProvider',
    function($routeProvider) {
        backand.options.url = backandGlobal.url;
        $routeProvider.when('/login', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/login/login.html'
        });
        $routeProvider.when('/grids', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/grids/grids.html'
        });
        $routeProvider.when('/index', {
            templateUrl: 'index-lte.html'
        });
        $routeProvider.when('/dashboard', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/dashboard/dashboard.html'
        });
        $routeProvider.when('/content', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/content/content.html'
        });
        $routeProvider.when('/forms', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/forms/forms.html'
        });
        $routeProvider.when('/404', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/custom/404.html'
        });
        $routeProvider.when('/error', {
            templateUrl: 'themes/AdminLTE-master/backand/partials/custom/error.html'
        });
        $routeProvider.otherwise({
            redirectTo: ''
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
