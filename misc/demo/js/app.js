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
    function ($routeProvider) {
        backand.options.url = backandGlobal.url;
        $routeProvider.when('/', {
            templateUrl: 'partials/overview.html'
        });
        $routeProvider.when('/overview', {
            templateUrl: 'partials/overview.html'
        });
        $routeProvider.when('/grid', {
            templateUrl: 'partials/grid.html'
        });
        $routeProvider.otherwise({
            redirectTo: ''
        });
    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);

