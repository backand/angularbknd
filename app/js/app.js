'use strict';

angular.module('backAnd', [
    'ngRoute',
    'ngResource',
    'ngGrid',
    'backAnd.filters',
    'backAnd.services',
    'backAnd.directives',
    'backAnd.controllers'
]).config(['$routeProvider',
    function($routeProvider) {
        backand.options.url = backandGlobal.url;
        $routeProvider.when('/login', {
            templateUrl: 'views/login.html'
        });
        $routeProvider.when('/tables', {
            templateUrl: 'views/tables.html'
        });
        $routeProvider.when('/index', {
            templateUrl: 'index.html'
        });
        $routeProvider.when('/chartsExample', {
            templateUrl: 'views/chartsExample.html'
        });
        $routeProvider.when('/formsExample', {
            templateUrl: 'views/forms.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
