angular.module('backAnd.directives')
.directive('ngbackDashboard', function() {
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
