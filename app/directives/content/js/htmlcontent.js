angular.module('backAnd.directives')
.directive('htmlcontent', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/content/views/htmlcontent.html',
		replace: false,
		controller: 'contentController',
	}
});
