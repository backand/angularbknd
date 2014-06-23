'use strict';

/* Directives */


angular.module('backAnd.directives', []).
directive('appVersion', ['version',
    function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }
]);




angular.module('backAnd.directives', [])
.directive("customIcon", function() {
  return {
    restrict:"C",
     scope: {
            iconType: '='
        },
    link: function(scope, element, attrs) {
    	if(scope.iconType == "table")
            element.addClass("fa fa-table");
        if(scope.iconType == "dashboard")
            element.addClass("fa fa-dashboard");
        if(scope.iconType == "charts")
            element.addClass("fa fa-bar-chart-o");
         if(scope.iconType == "content")
            element.addClass("fa fa-th");
    }
  }
});