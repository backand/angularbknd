'use strict';

angular.module('backAnd.directives', ['angularFileUpload']);
angular.module('backAnd.filters', []);
angular.module('backAnd.controllers', []);
angular.module('backAnd.services', []);

angular.module('backAnd', [
    'ngRoute',
    'ngResource',
    'ngGrid',
    'ui.bootstrap',
	'angularFileUpload',
    'backAnd.filters',
    'backAnd.services',
    'backAnd.directives',
    'backAnd.controllers'
]).config(['$routeProvider',
    function($routeProvider) {
        backand.options.url = backandGlobal.url;

        $routeProvider
            .when('/', {
                templateUrl: 'themes/devoops-master/backand/partials/default/default.html'
            })
            .when('/login', {
                templateUrl: 'themes/devoops-master/backand/partials/login/login.html'
            })
            .when('/grids', {
                templateUrl: 'themes/devoops-master/backand/partials/grids/grids.html'
            })
            .when('/dashboard', {
                templateUrl: 'themes/devoops-master/backand/partials/dashboard/dashboard.html'
            })
            .when('/content', {
                templateUrl: 'themes/devoops-master/backand/partials/content/content.html'
            })
            .when('/forms', {
                templateUrl: 'themes/devoops-master/backand/partials/forms/forms.html'
            })


            /********************************************************/
            /* uncomment this route for the custom new page example */
            /********************************************************/
            //.when('/page1', {
            //    templateUrl: 'themes/devoops-master/my-pages/page1/page1.html'
            //})

            .otherwise({
                redirectTo: '/'
            });

    }
]);

