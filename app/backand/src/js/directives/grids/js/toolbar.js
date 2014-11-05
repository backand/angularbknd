'use strict';
/**
* @ngdoc overview
* @name directive.bkndToolbar
*/
angular.module('backAnd.directives')
    .directive('bkndToolbar', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.bkndToolbar
    * @description grid toolbar
    * @param {object} toolbar, button groups array that each contains a button array, each button can be a different element 
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        replace: true,
        require: "^bkndNgGrid",
        scope: {
            buttonGroups: "=",
            selectedRows: "=",
            newRowDefaults: "=",
            gridScope: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/toolbar.html',
        link: function (scope, el, attrs, bkndNgGridCtrl) {
            scope.$on('setToolbarCompleted', function (event, buttonGroups) {
                scope.buttonGroups = buttonGroups;
            });

        }
    }
}]);