angular.module('backAnd.directives', [])
    .directive('ngbackTable', function() {
        return {
            restrict: 'E',
            scope: {
                tableName: '=',
                options: '=',

            },
            controller: 'tableController',
            replace: true,
            templateUrl: 'directives/tables/views/table.html',

        };
    });
