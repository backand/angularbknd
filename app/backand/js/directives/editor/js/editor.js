// 'use strict';

// var backAndDirectives = angular.module('backAnd.directives', ['textAngular']);
// backAndDirectives.directive('kuku', function($log) {
//     return {
//     	restrict: 'A',
//     	replace: true,
//     	scope: {
//     		field: "=",
//     		value: "=",
//             form: "=",
//             errors: "="
//     	},
//     	templateUrl: 'backand/js/directives/editor/partials/editor.html',
//     	link: function(scope, el, attrs) {
//             $log.debug("editor", scope);
//     		if (!scope.value.val){
// 	          scope.value.val = scope.field.defaultValue;
// 	        }
//     	}
//     }
// });

'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('editor', function($log) {
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
            // if (!scope.value.val){
            //   scope.value.val = scope.field.defaultValue;
            // }
        }
    }
});