angular.module('backAnd.directives')
.directive('linkcontent', function () {
	return {
		restrict: 'E',
		replace: false,
		controller: 'contentController',
		link: function ($scope, element, attr) {
		    if ($scope.content.openinaNewTab)
		        window.open($scope.content.externalLink, $scope.content.target);
		    else
		        location.href = $scope.content.externalLink;
		}
	}
});
