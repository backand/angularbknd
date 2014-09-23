'use strict';
/**
* @ngdoc overview
* @name directive.ngbackToolbar
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('ngbackToolbar', function () {//$templateCache) {
    /**
    * @ngdoc directive
    * @name directive.ngbackToolbar
    * @description grid toolbar
    * @param {object} toolbar, button groups array that each contains a button array, each button can be a different element 
    * @returns {object} directive
    */
    return {
        restrict: 'A',
        replace: true,
        require: "^ngbackNgGrid",
        scope: {
            buttonGroups: "=",
            selectedRows: "=",
            newRowDefaults: "=",
            gridScope: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/toolbar.html',
        link: function (scope, el, attrs, ngbackNgGridCtrl) {
            scope.$on('setToolbarCompleted', function (event, buttonGroups) {
                scope.buttonGroups = buttonGroups;
            });

        }
    }
});