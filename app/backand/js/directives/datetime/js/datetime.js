'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('datetime', function($log) {
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
    	templateUrl: 'backand/js/directives/date/partials/datetime.html',
      link: function(scope, el, attrs) {
            if (!scope.value.val){
              scope.value.val = scope.field.defaultValue;
            };


            scope.dateValue = {
              val: scope.value.val.substr(0,10)
            };
            scope.dateField = _.clone(scope.field);
            scope.dateField.format = scope.dateField.format.substr(0, 10);

            scope.timeValue = {
              val: scope.value.val.substr(11, 5)
            };
            scope.timeField = _.clone(scope.field);
            scope.timeField.format = scope.timeField.format.substr(0, 10);

            

            scope.$watch("dateValue.val", function(newValue, oldValue) { 
              if (newValue)
                scope.value.val = newValue + " " + scope.value.val.subtr(11,5);
              else
                scope.value.val = null;
            });

            scope.$watch("timeValue.val", function(newValue, oldValue) { 
              if (newValue)
                scope.value.val = scope.value.val.subtr(0,10) + " " + newValue;
              else
                scope.value.val = null;
            });

        }
    }         
});