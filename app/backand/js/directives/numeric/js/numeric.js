'use strict';
/**
* @ngdoc overview
* @name directive.numeric
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('numeric', function ($log) {
    /**
    * @ngdoc directive
    * @name directive.numeric
    * @description numeric element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
    * @param {string} inputClass, optional, optional css class
    * @param {string} errors, optional, error messages
    * @returns {object} directive
    */
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