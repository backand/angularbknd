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
            templateUrl: 'backand/partials/login/login.html'
        });
        $routeProvider.when('/grids', {
            templateUrl: 'backand/partials/grids/grids.html'
        });
        $routeProvider.when('/index', {
            templateUrl: 'index.html'
        });
        $routeProvider.when('/chartsExample', {
            templateUrl: 'partials/chartsExample.html'
        });
        $routeProvider.when('/formsExample', {
            templateUrl: 'partials/main-forms/forms.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
