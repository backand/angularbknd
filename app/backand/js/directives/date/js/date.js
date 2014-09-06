'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('date', function($log) {
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
        form: "=",
        inputClass: "=",
        errors: "="
    	},
    	templateUrl: 'backand/js/directives/date/partials/date.html',
        link: function(scope, el, attrs) {
            var date = null;
            if (scope.value.val) {
                if (scope.value.val == "Now")
                    date = new Date();
                else
                    date = new Date(scope.value.val);
            };

            scope.mydate = date;


            scope.opened = false;
            scope.open = function($event) {
              event.preventDefault();
              event.stopPropagation();
              scope.opened = true;
            };

            scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };

            scope.$watch("mydate", function (newValue, oldValue) {
                if (newValue)
                    scope.value.val = JSON.stringify(newValue);
                else
                    scope.value.val = null;
            });

            scope.tooEarly = function() {
              if (!scope.field.minimumValue)
                return false;
              var current = moment(scope.mydate);
              return current.isBefore(moment(scope.field.minimumValue));
            };
       
            scope.tooLate = function() {
              if (!scope.field.maximumValue)
                return false;
              var current = moment(scope.mydate);
              return current.isAfter(moment(scope.field.maximumValue));
            };

        }
    }         
});