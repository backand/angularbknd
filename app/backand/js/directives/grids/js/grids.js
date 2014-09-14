/**
* @ngdoc overview
* @name directive.ngbackGrid
*/
angular.module('backAnd.directives', [])
    .directive('ngbackGrid', function() {
        /**
        * @ngdoc directive
        * @name directive.ngbackGrid
        * @description grid element, ng-grid wrapper that binds to backand rest api
        * @param {string} viewName, view or table from the database
        * @param {object} options, ng-grid options
        * @param {object} filterOptions, backand rest api filter options: {fieldName, operator, value} 
        * @param {string} inputClass, optional, optional css class
        * @returns {object} directive
        */
        return {
            restrict: 'E',
            scope: {
                viewName: '=',
                options: '=',
                filterOptions: '=',
                inputStyle: '=',
            },
            controller: 'gridController',
            replace: false,
            templateUrl: ($(window).width() > 768) ? 'backand/js/directives/grids/partials/grid.html' : 'backand/js/directives/grids/partials/grid-mobile.html',
        };
    });
