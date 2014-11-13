'use strict';
/**
* @ngdoc overview
* @name directive.input
*/
angular.module('backAnd.directives')
    .directive('input', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.input
    * @description input element
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
    	templateUrl: 'backand/js/directives/input/partials/input.html',
        link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
}]);