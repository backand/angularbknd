'use strict';
/**
* @ngdoc overview
* @name directive.bkndButtonGroup
*/
angular.module('backAnd.directives')
    .directive('bkndButtonGroup', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.bkndButtonGroup
    * @description grid buttons button array
    * @param {object} toolbar, button groups array that each contains a button array, each button can be a different element 
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        replace: true,
        require: ["bkndNgGrid", "bkndToolbar"],
        scope: {
            buttons: "=",
            selectedRows: "=",
            newRowDefaults: "=",
            gridScope: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/buttonGroup.html',
        link: function (scope, el, attrs) {

        }
    }
}]);