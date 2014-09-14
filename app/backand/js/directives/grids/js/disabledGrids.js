'use strict';
/**
* @ngdoc overview
* @name directive.ngbackDisabledGrid
*/
var backAndDirectives = angular.module('backAnd.directives');

backAndDirectives.directive('ngbackDisabledGrid', function () {
    /**
    * @ngdoc directive
    * @name directive.ngbackDisabledGrid
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