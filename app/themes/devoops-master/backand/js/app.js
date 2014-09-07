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
            templateUrl: 'themes/devoops-master/backand/partials/login/login.html'
        });
        $routeProvider.when('/grids', {
            templateUrl: 'themes/devoops-master/backand/partials/grids/grids.html'
        });
        $routeProvider.when('/dashboard', {
            templateUrl: 'themes/devoops-master/backand/partials/dashboard/dashboard.html'
        });
        $routeProvider.when('/content', {
            templateUrl: 'themes/devoops-master/backand/partials/content/content.html'
        });
        $routeProvider.when('/forms', {
            templateUrl: 'themes/devoops-master/backand/partials/forms/forms.html'
        });
        $routeProvider.when('/', {
            templateUrl: 'themes/devoops-master/backand/partials/default/default.html'
        });
        $routeProvider.otherwise({
            redirectTo: ''
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
