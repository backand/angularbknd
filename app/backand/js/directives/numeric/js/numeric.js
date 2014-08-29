'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('numeric', function($log) {
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
    	templateUrl: 'backand/js/directives/numeric/partials/numeric.html',
    	link: function(scope, el, attrs) {
            $log.debug("numeric scope", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});