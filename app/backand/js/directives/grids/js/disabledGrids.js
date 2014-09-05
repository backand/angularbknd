'use strict';
var backAndDirectives = angular.module('backAnd.directives');

backAndDirectives.directive('ngbackDisabledGrid', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            message: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/disabledGrid.html'
    }
});