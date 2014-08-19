'use strict';

angular.module('backAnd.directives').directive('textarea', function() {
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "="
    	},
    	templateUrl: 'backand/js/directives/textarea/partials/textarea.html'
    }
});