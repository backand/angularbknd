'use strict';

angular.module('backAnd.directives').directive('input', function() {
	console.log("input called");
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
            form: "="
    	},
    	templateUrl: 'backand/js/directives/input/partials/input.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
});