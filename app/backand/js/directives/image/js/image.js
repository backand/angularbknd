'use strict';
var backAndDirectives = angular.module('backAnd.directives');

backAndDirectives.directive('image', function ($log) {
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
    	templateUrl: 'backand/js/directives/image/partials/image.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});