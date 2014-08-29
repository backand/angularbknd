'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('html', function($log) {
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
            form: "=",
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/html/partials/html.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
});