'use strict';
/**
* @ngdoc overview
* @name directive.link
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('link', function($log) {
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
    template: '<div ng-include="inputType()"></div>', 
    link: function (scope, el, attrs) {

      scope.inputType = function() {
          switch(scope.field.type)
          {
              case "hyperlink":
                  return 'backand/js/directives/link/partials/link.html';
              break;
              case "button":
                  return 'backand/js/directives/link/partials/button-link.html';
              break;

              default:
                  return 'backand/js/directives/link/partials/link.html';
              break;
          }
      };
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

    },
  };
});