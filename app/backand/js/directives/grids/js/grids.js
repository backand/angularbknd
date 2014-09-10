angular.module('backAnd.directives', [])
    .directive('ngbackGrid', function() {
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
