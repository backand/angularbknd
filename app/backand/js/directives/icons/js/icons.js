'use strict';


/**
* @ngdoc overview
* @name directive.appVersion
*/
angular.module('backAnd.directives').
    directive('appVersion', ['version',
    /**
    * @ngdoc directive
    * @name directive.appVersion
    * @description application version
    * @param {string} version
    * @returns {object} directive
    */
    function (version) {
        return function(scope, elm) {
            elm.text(version);
        };
    }
]);



/**
* @ngdoc overview
* @name directive.customIcon
*/
angular.module('backAnd.directives')
    .directive("customIcon", [
        function() {
        /**
        * @ngdoc directive
        * @name directive.customIcon
        * @description icon for menu and breadcrumbs to grid, dashboard and content
        * @param {string} iconType
        * @returns {object} directive
        */
        return {
            restrict: "C",
            scope: {
                iconType: '='
            },
            link: function(scope, element, attrs) {
                if (scope.iconType == "table")
                    element.addClass("fa fa-table");
                if (scope.iconType == "dashboard")
                    element.addClass("fa fa-dashboard");
                if (scope.iconType == "charts")
                    element.addClass("fa fa-bar-chart-o");
                if (scope.iconType == "content")
                    element.addClass("fa fa-th");
            }
        }
    }]);