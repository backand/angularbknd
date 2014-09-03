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
    	templateUrl: 'backand/js/directives/datetime/partials/datetime.html',
      link: function(scope, el, attrs) {
            if (!scope.value.val){
              scope.value.val = scope.field.defaultValue;
            };

            scope.combinedValue = {
               val: scope.value.val? new Date(scope.value.val) : null
            };

            scope.combinedConfig = {
              startView: "day",
              minView: "minute",
              minuteStep: 3,
              weekStart: 0, 
              dropdownSelector: '.my-toggle-select-' + scope.field.name
            };

            scope.onTimeSet = function (newDate, oldDate) {
              if (newDate){
                scope.value.val = moment(scope.combinedValue.val).format(scope.field.format);
              }        
              else{
                scope.value.val = null;
              }   
            };

            scope.tooEarly = function() {
              if (!scope.field.minimumValue)
                return false;
              var current = moment(scope.combinedValue.val);
              return current.isBefore(moment(scope.field.minimumValue));
            };
       
            scope.tooLate = function() {
              if (!scope.field.maximumValue)
                return false;
              var current = moment(scope.combinedValue.val);
              return current.isAfter(moment(scope.field.maximumValue));
            };

        }
    }         
});