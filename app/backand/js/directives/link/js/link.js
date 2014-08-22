'use strict';

angular.module('backAnd.directives').directive('link', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      field: '='
    },
    templateUrl: 'backand/js/directives/link/partials/link.html'
  };
});