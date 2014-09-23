/**
* @ngdoc overview
* @name directive.ngbackDashboard
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/dashboard/partials/dashboard.html", ' <div>\n' +
 	    '<div class="container-fluid">\n' +	
 	    '	<div data-ng-repeat="chart in chartData">\n' +
 	    '		<div class="col-xs-{{numCol}}" ng-switch on="chart.type">\n' +
        '             <barchart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="Bar">	</barchart>\n' +	
        '             <linechart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="Line">  </linechart>\n' +
        '             <donutchart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="Pie"> </donutchart>\n' +
        '             <columnchart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="Column"> </columnchart>\n' +
        '             <splinechart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="spline">  </splinechart>\n' +
        '             <areachart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="Area">  </areachart>\n' +
        '             <bubblechart chart-id="chart.id" chart-type="{{chart.type}}" ng-switch-when="bubble">  </bubblechart>\n' +
 	    '		</div>\n' +
 	    '	</div>\n' +
 	    '</div>\n' +
     '</div>')
})
.directive('ngbackDashboard', function (Global, $http, configService, $location, $templateCache) {
    /**
   * @ngdoc directive
   * @name directive.ngbackDashboard
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
        * @methodOf directive.ngbackDashboard
        * @description manage the scope of the ngbackDashboard directive
        * @param {object} scope, required, the scope of the directive
        * @param {object} el, required, the element of the directive
        * @param {object} attrs, required, the attributes of the directive
        */
		link: function (scope, el, attrs) {

		    /**
            * @ngdoc function
            * @name dashboardId
            * @methodOf backand.js.directive.ngbackDashboard
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
            * @methodOf backand.js.directive.ngbackDashboard
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
