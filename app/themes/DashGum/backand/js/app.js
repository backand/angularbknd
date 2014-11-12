'use strict';

angular.module('backAnd.directives', []);
angular.module('backAnd.filters', []);
angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);

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

        $routeProvider
            .when('/', {
                templateUrl: 'themes/DashGum/backand/partials/default/default.html'
            })
            .when('/login', {
                templateUrl: 'themes/DashGum/backand/partials/login/login.html'
            })
            .when('/grids', {
                templateUrl: 'themes/DashGum/backand/partials/grids/grids.html'
            })
            .when('/dashboard', {
                templateUrl: 'themes/DashGum/backand/partials/dashboard/dashboard.html'
            })
            .when('/content', {
                templateUrl: 'themes/DashGum/backand/partials/content/content.html'
            })
            .when('/forms', {
                templateUrl: 'themes/DashGum/backand/partials/forms/forms.html'
            })

            /********************************************************/
            /* uncomment this route for the custom new page example */
            /********************************************************/
            //.when('/page1', {
            //    templateUrl: 'themes/DashGum/my-pages/page1/page1.html'
            //})

            .otherwise({
                redirectTo: '/'
            });

    }
]);
