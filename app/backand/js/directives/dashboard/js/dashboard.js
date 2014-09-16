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
.directive('ngbackDashboard', function ($templateCache) {
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
		controller: 'dashboardController',
		scope: {
			dashboardId : '='
		},                 
	}
});
