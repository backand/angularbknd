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
        backand.options.url = 'http://rivka.backand.info:8099';
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
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
