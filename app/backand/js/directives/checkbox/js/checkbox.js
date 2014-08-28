'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('checkbox', function($log) {
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
    	templateUrl: 'backand/js/directives/checkbox/partials/checkbox.html',
    	link: function(scope, el, attrs) {
    		if (scope.value.val === undefined){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});