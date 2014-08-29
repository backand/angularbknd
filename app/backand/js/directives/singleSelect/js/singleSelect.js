'use strict';

angular.module('backAnd.directives').directive('singleSelect', function () {
    console.log("singleSelect called");
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
            form: "=",
            inputClass: "="
    	},
    	templateUrl: 'backand/js/directives/singleSelect/partials/singleSelect.html',
    	link: function(scope, el, attrs) {
    	    console.log("singleSelect.js", scope);

    	    scope.options = scope.field.options;

    	    if (!scope.value.val) {
    	        scope.value.val = scope.options[0];
    	    }
    	    else {
    	        angular.forEach(scope.options, function (option) {
    	            if (option.value == scope.value.val) {
    	                scope.value.val = option;
    	            }
    	        });
    	    }
    	}
    }
});