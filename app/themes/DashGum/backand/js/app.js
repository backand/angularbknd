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
            templateUrl: 'themes/DashGum/backand/partials/login/login.html'
        });
        $routeProvider.when('/grids', {
            templateUrl: 'themes/DashGum/backand/partials/grids/grids.html'
        });
        $routeProvider.when('/dashboard', {
            templateUrl: 'themes/DashGum/backand/partials/dashboard/dashboard.html'
        });
        $routeProvider.when('/content', {
            templateUrl: 'themes/DashGum/backand/partials/content/content.html'
        });
        $routeProvider.when('/forms', {
            templateUrl: 'themes/DashGum/backand/partials/forms/forms.html'
        });
        $routeProvider.when('/', {
            templateUrl: 'themes/DashGum/backand/partials/default/default.html'
        });

        /********************************************************/
        /* uncomment this route for the custom new page example */
        /********************************************************/
        //$routeProvider.when('/page1', {
        //    templateUrl: 'themes/DashGum/my-pages/page1/page1.html'
        //});

        $routeProvider.otherwise({
            redirectTo: ''
        });

    }
]);

angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);
