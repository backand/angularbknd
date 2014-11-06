'use strict';
/**
* @ngdoc overview
* @name directive.textarea
*/
angular.module('backAnd.directives')
    .directive('textarea', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.textarea
    * @description textarea element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
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
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/textarea/partials/textarea.html',
    	link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
}]);