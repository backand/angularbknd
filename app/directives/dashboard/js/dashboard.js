angular.module('backAnd.directives')

.directive('ngbackDashboard', function() {
	return {
		restrict: 'E',
		templateUrl:  'directives/dashboard/views/dashboard.html',
		replace: false,
		scope: {
			dashboardName : '='
		},                 
	}
});
