'use strict';
/**
* @ngdoc overview
* @name directive.singleSelect
*/
angular.module('backAnd.directives')
    .directive('singleSelect', ['$location',
        function ($location) {
    /**
    * @ngdoc directive
    * @name directive.singleSelect
    * @description select element
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
    	templateUrl: 'backand/js/directives/singleSelect/partials/singleSelect.html',
    	link: function(scope) {
    	    //console.log("singleSelect.js", scope);

    	    /**
            * @name options
            * @propertyOf directive.singleSelect {array} 
            * @description get the select options from configuration
            */
    	    scope.options = scope.field.options;

    	    if (scope.value.val) {
    	        angular.forEach(scope.options, function (option) {
    	            if (option.value == scope.value.val) {
    	                scope.value.val = option;
    	            }
    	        });
    	    }

    	    /**
             * @name inlineEditing
             * @methodOf directive.singleSelect
             * @description when configured adds a button that links to the related table of the select options
             */
    	    scope.inlineEditing = function () {
    	        $location.search({
    	            viewName: scope.field.relatedViewName,
    	        });
    	        $location.path('/grids');
    	    }

    	    /**
            * @name changed
            * @methodOf directive.singleSelect
            * @description change callback to set the back the selected value
            */
    	    scope.changed = function () {
    	        if (!scope.value.val.value)
    	            scope.value.val = null;
    	    }
    	}
    }
}]);