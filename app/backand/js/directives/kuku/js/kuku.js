'use strict';

var backAndDirectives = angular.module('backAnd.directives', ['ui.bootstrap']);
backAndDirectives.directive('kuku', function($log) {
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
    	templateUrl: 'backand/js/directives/kuku/partials/kuku.html',
        link: function(scope, el, attrs) {
            $log.debug("datepicker scope", scope);
            if (!scope.value.val){
              scope.value.val = scope.field.defaultValue;
            };

            scope.open = function($event) {
              event.preventDefault();
              event.stopPropagation();
              scope.opened = true;
            };

            scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };
       
        }
    }         
});