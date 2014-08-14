angular.module('backAnd.directives', [])
    .directive('ngbackGrid', function() {
        return {
            restrict: 'E',
            scope: {
                tableName: '=',
                options: '=',
            },
            controller: 'tableController',
            replace: false,
            templateUrl: 'backand/js/directives/grids/partials/grid.html',

        };
    });
