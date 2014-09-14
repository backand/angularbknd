'use strict';
/**
* @ngdoc overview
* @name directive.checkbox
*/

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('checkbox', function ($log) {
    /**
   * @ngdoc directive
   * @name directive.checkbox
   * @description checkbox element
   * @param {object} field, required, field configuration and data
   * @param {object} value, optional, value of the field, could be null 
   * @param {object} form, required, the form that contains the field
   * @param {string} inputClass, optional, optional css class
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
    	templateUrl: 'backand/js/directives/checkbox/partials/checkbox.html',
    	link: function(scope, el, attrs) {
    		if (scope.value.val === undefined){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});