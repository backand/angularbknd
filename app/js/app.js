'use strict';


// Declare app level module which depends on filters, and services


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
        $routeProvider.when('/login', {templateUrl: 'views/login.html'});
        $routeProvider.when('/tables', {templateUrl: 'views/tables.html'});

        $routeProvider.otherwise({redirectTo: '/view1'});
 
    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
