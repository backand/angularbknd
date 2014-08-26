'use strict';

/* Filters */

angular.module('backAnd.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
.filter('parseInt', function () {
    return function (a, b) {
        return (parseInt(a))
    }
});
