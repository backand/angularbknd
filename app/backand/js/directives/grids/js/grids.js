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
            templateUrl: 'backand/js/directives/grids/partials/grid.html',
        };
    });
