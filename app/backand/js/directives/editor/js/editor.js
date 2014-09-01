'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('editor', function($log, $timeout) {
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
    	link: function(scope, el, attrs) {
            $log.debug("editor", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }

            scope.isInFocus = false;
            scope.inFocus = function() {
                $log.debug("inFocus");
                scope.isInFocus = true;
            };
            
            scope.outFocus = function() {
                
                scope.isInFocus = false;
                el[0].focus()
                $timeout(function() {
                    if (!scope.isInFocus){
                        $log.debug("outFocus");
                        el[0].blur;
                    }
                }, 300);
            };
    	}
    }
});