'use strict';
/**
* @ngdoc overview
* @name directive.html
*/

angular.module('backAnd.directives')
    .directive('html', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.html
    * @description div with html content
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
    	templateUrl: 'backand/js/directives/html/partials/html.html',
    	link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
}]);