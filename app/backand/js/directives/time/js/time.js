'use strict';
var backAndDirectives = angular.module('backAnd.directives');

backAndDirectives.directive('time', function ($log) {
    return {
    	restrict: 'A',
    	replace: true,
        priority: 1000,
        terminal: false,
    	scope: {
    		field: "=",
    		value: "=",
            form: "=",
            inputClass: "=",
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/time/partials/time.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };


            var timeElements = scope.value.val.split(":");
            scope.mytime = new Date(1900, 0, 1, timeElements[0], timeElements[1]);
            if (scope.field.minimumValue){
                timeElements = scope.field.minimumValue.split(":");
                scope.minimumTime = 60 * parseInt(timeElements[0]) + parseInt(timeElements[1]); 
            }
            if (scope.field.maximumValue){
                timeElements = scope.field.maximumValue.split(":");
                scope.maximumTime = 60 * parseInt(timeElements[0]) + parseInt(timeElements[1]); 
            }
           
            
            scope.$watch("mytime", function(newValue, oldValue) {
                if (newValue) 
                   scope.value.val = newValue.getHours() + ":" + newValue.getMinutes();
                else
                   scope.value.val = null;
            });

            scope.tooEarly = function() {
              if (!scope.field.minimumValue)
                return false;
              var current = scope.mytime.getHours() * 60 + scope.mytime.getMinutes();
              return current < scope.minimumTime;
            };
       
            scope.tooLate = function() {
              if (!scope.field.maximumValue)
                return false;
              var current = scope.mytime.getHours() * 60 + scope.mytime.getMinutes();
              return current > scope.maximumTime;
            };
    	}
    }
});