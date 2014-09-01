'use strict';
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('link', function($log) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      field: '=',
      value: '=',
      form: '='
    },
    template: '<div ng-include="inputType()"></div>', 
    link: function (scope, el, attrs) {
        $log.debug(scope);
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
    },
  };
});