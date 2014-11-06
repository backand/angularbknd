'use strict';
/**
* @ngdoc overview
* @name directive.editor
*/

angular.module('backAnd.directives')
    .directive('editor', ['$log',
        function ($log) {
    /**
    * @ngdoc directive
    * @name directive.editor
    * @description html editor element
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
    	templateUrl: 'backand/js/directives/editor/partials/editor.html',
    	link: function(scope) {
            //$log.debug("editor", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
    		}

    	    /**
            * @name innerVal
            * @propertyOf directive.editor {string} 
            * @description set the value from configuration
            */
            scope.innerVal = {
                val: scope.value.val
            }

    	    /**
            * @name isInFocus
            * @propertyOf directive.editor {boolean} 
            * @description in focus flag, focus bug fix
            */
            scope.isInFocus = false;
    	    /**
             * @name inFocus
             * @methodOf directive.editor
             * @description set focus flag to true, focus bug fix
             */
            scope.inFocus = function () {
                $log.debug("inFocus");
                scope.isInFocus = true;
            };
            
    	    /**
            * @name isEmpty
            * @propertyOf directive.editor {boolean} 
            * @description empty flag 
            */
            scope.isEmpty = !scope.innerVal.val;

    	    /**
             * @name outFocus
             * @methodOf directive.editor
             * @description set focus flag to false, focus bug fix
             */
            scope.outFocus = function () {
                
                $log.debug("outFocus");

                scope.value.val = scope.innerVal.val;
                scope.isEmpty = !scope.innerVal.val;

            };
    	}
    }
}]);