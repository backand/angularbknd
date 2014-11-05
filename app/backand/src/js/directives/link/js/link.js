'use strict';
/**
* @ngdoc overview
* @name directive.link
*/
angular.module('backAnd.directives')
    .directive('link', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.link
    * @description link element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
    * @param {string} inputClass, optional, optional css class
    * @param {string} errors, optional, error messages
    * @returns {object} directive
    */
    return {
    restrict: 'A',
    replace: true,
    scope: {
      field: '=',
      value: '=',
      form: '=',
      inputClass: "=",
      errors: '='
    },
    templateUrl: 'backand/js/directives/link/partials/link.html',
    link: function (scope) {

        /**
        * @name isTargetBlank
        * @propertyOf directive.link {boolean} 
        * @description blank target flag
        */
      scope.isTargetBlank = scope.value.target == "_blank";
        /**
        * @name targetChange
        * @methodOf directive.link
        * @description change event callback to set the blank flag
        */
      scope.targetChange = function () {
        scope.value.target = scope.isTargetBlank ? "_blank" : null;
      };

    }
  };
}]);