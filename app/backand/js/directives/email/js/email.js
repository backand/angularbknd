'use strict';
var backAndDirectives = angular.module('backAnd.directives');

backAndDirectives.directive('email', function ($log) {
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
    	templateUrl: 'backand/js/directives/email/partials/email.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});