angular.module('backAnd.directives')
.directive('ngbackContent', function () {
	return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/content.html',
		replace: false,
		controller: 'contentController',
		scope: {
		    contentId: '='
		},
		
	}
});
