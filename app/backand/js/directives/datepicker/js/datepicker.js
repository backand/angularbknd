'use strict';

angular.module('backAnd.directives').directive('datepicker', function() {
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "="
    	},
    	templateUrl: 'backand/js/directives/datepicker/partials/datepicker-popup.html'
    }
});