'use strict';
/**
* @ngdoc overview
* @name directive.bkndDisabledGrid
*/
angular.module('backAnd.directives')
    .directive('bkndDisabledGrid', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.bkndDisabledGrid
    * @description disabled grid element, mostly used for subgrid in create mode
    * @param {string} message, usually "Save first to add rows"
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            message: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/disabledGrid.html'
    }
}]);