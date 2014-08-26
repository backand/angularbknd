'use strict';

/* Filters */

var backAndFilters = angular.module('backAnd.filters', []);

backAndFilters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);
  
backAndFilters.directive('isDate', function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attr, ngModel) {
        function validate(value) {
          var d = Date.parse(value);
          // it is a date
          if (isNaN(d)) { // d.valueOf() could also work
            ngModel.$setValidity('valid', false);
          } else {
            ngModel.$setValidity('valid', true);
          }
        }
      }
    };
});

backAndFilters.directive('toNumber', function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        return ctrl.$parsers.push(function (value) {
            return parseFloat(value || '');
        });
      }
    };
});


backAndFilters.filter('parseInt', function () {
    return function (a, b) {
        return (parseInt(a))
    }
});

backAndFilters.filter('removeSpaces', function () {
    return function (text) {
        return text.replace(' ', '');
    }
});