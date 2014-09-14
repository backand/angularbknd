/**
* @ngdoc overview
* @name directive.ngbackDashboard
*/
angular.module('backAnd.directives')
.directive('ngbackDashboard', function () {
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
