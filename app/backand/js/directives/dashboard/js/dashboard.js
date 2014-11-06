/**
* @ngdoc overview
* @name directive.bkndDashboard
*/
angular.module('backAnd.directives')
    .directive('bkndDashboard',['Global','$http','configService','$location',
        function (Global, $http, configService, $location) {
    /**
   * @ngdoc directive
   * @name directive.bkndDashboard
   * @description dashboard of charts and grids
   * @param {string} dashboardId, required, id of the dashboard
   * @returns {object} directive
   */
	return {
		restrict: 'E',
		templateUrl:  'backand/js/directives/dashboard/partials/dashboard.html',
		replace: false,
		scope: {
			dashboardId : '=',
		    filterOptions : '='
	    },
	    /**
        * @name link
        * @methodOf directive.bkndDashboard
        * @description manage the scope of the bkndDashboard directive
        * @param {object} scope, required, the scope of the directive
        * @param {object} el, required, the element of the directive
        * @param {object} attrs, required, the attributes of the directive
        */
		link: function (scope) {

		    /**
            * @ngdoc function
            * @name dashboardId
            * @methodOf backand.js.directive.bkndDashboard
            * @description Get the new Backand's dashboard id and re-load the data
            */
		    scope.$watch('dashboardId', function () {
		        scope.build(scope.getDashboardId());
		    });

		    scope.$watch('filterOptions', function (newVal, oldVal) {
		        if (scope.filterOptions) {
		            scope.build(scope.getDashboardId());
		        }
		    }, true);

		    scope.getChartFilterOptions = function () {
		        if (scope.filterOptions) {
		            return scope.toQueryString(scope.filterOptions);
		        }
		        return window.location.href.slice(window.location.href.indexOf('?') + 1);

		    }

		    scope.getDashboardId = function () {
		        if (scope.dashboardId) {
		            return scope.dashboardId;
		        }
		        else if ($location.search().dashboardId) {
		            return $location.search().dashboardId;
		        }

		        return null;
		    }

		    scope.toQueryString = function (arr) {
		        var parts = [];
		        angular.forEach(arr, function (item) {
		            parts.push(item.name + "=" + item.value);
		        });
		        return parts.join("&");
		    }

		    /**
            * @ngdoc function
            * @name build
            * @methodOf backand.js.directive.bkndDashboard
            * @param {string} id reference to dashboard
            * @description set the data
            */
		    scope.build = function (id) {
		        configService.read({
                    dataType: "dashboard",
		            id: id
		        }, function (data) {
		            scope.numCol = 12 / data.columns;
		            scope.chartData = [];
		            angular.forEach(data.widgets, function (value, key) {
		                this.push({ type: value.type, id: value.__metadata.id });
		            }, scope.chartData)
		        });

		    }
		}
	}
}]);
