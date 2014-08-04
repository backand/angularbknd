angular.module('backAnd.directives', [])
    .directive('ngbackTable', function() {
        return {
            restrict: 'E',
            scope: {
                tableName: '=',
                options: '=',
            },
            controller: 'tableController',
            replace: false,
            templateUrl: 'directives/tables/views/table.html',

        };
    });
