'use strict';

angular.module('backAnd.directives').directive('input', function() {
	console.log("input called");
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "="
    	},
    	templateUrl: 'backand/js/directives/input/partials/input.html'
    }
});