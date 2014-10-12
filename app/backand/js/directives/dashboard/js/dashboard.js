/**
* @ngdoc overview
* @name directive.bkndDashboard
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('bkndDashboard', function (Global, $http, configService, $location) {
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
			dashboardId : '='
		},
	    /**
        * @name link
        * @methodOf directive.bkndDashboard
        * @description manage the scope of the bkndDashboard directive
        * @param {object} scope, required, the scope of the directive
        * @param {object} el, required, the element of the directive
        * @param {object} attrs, required, the attributes of the directive
        */
		link: function (scope, el, attrs) {

		    /**
            * @ngdoc function
            * @name dashboardId
            * @methodOf backand.js.directive.bkndDashboard
            * @description Get the new Backand's dashboard id and re-load the data
            */
		    scope.$watch('dashboardId', function () {
		        if (scope.dashboardId) {
		            scope.setData(scope.dashboardId);
		        }
		        else if ($location.search().dashboardId) {
		            scope.setData($location.search().dashboardId);
		        }
		    });

		    /**
            * @ngdoc function
            * @name setData
            * @methodOf backand.js.directive.bkndDashboard
            * @param {string} id reference to dashboard
            * @description set the data
            */
		    scope.setData = function (id) {
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
});
