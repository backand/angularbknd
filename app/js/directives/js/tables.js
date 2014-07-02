angular.module('backAnd.directives', [])
    .directive('ngbackTable', function() {
        return {
            restrict: 'E',
            scope: {
                tableName: '='
            },
            controller: 'tableController',
            replace: true,
            templateUrl: 'js/directives/views/table.html',

        };
    });
