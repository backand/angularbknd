angular.module('backAnd.directives')
.directive('ngbackContent', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/content/views/content.html',
		replace: false,
		controller: 'contentController',
		scope: {
		    content2: '='
		},                 
	}
});
