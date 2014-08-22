'use strict';

angular.module('backAnd.directives').directive('textarea', function() {
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
            form: "="
    	},
    	templateUrl: 'backand/js/directives/textarea/partials/textarea.html',
    	link: function(scope, el, attrs) {
            console.log("textarea", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
});