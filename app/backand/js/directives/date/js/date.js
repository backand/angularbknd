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
            if (!scope.value.val){
              scope.value.val = scope.field.defaultValue;
            };

            scope.mydate = new Date(scope.value.val);


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

            scope.$watch("mydate", function(newValue, oldValue) { 
              if (newValue)
                scope.value.val = newValue.toString();
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
              return current.isAfter(moment(scope.field.maximumValuea));
            };

        }
    }         
});