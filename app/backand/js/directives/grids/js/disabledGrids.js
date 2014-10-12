'use strict';
/**
* @ngdoc overview
* @name directive.bkndDisabledGrid
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('bkndDisabledGrid', function () {
    /**
    * @ngdoc directive
    * @name directive.bkndDisabledGrid
    * @description disabled grid element, mostly used for subgrid in create mode
    * @param {string} message, usually "Save first to add rows"
    * @returns {object} directive
    */
    return {
        restrict: 'A',
        replace: true,
        scope: {
            message: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/disabledGrid.html'
    }
});