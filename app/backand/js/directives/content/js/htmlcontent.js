angular.module('backAnd.directives')
.directive('htmlcontent', function () {
	return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/htmlcontent.html',
		replace: false,
		controller: 'contentController',
		scope: {
		    contentId: '='
		},
		link: function ($scope, element, attr) {
		    $scope.contentService.queryjsonp({
		        content: $scope.contentId
		    }, function (data) {
		        var el = angular.element(data.content);
		        element.append(el);
		    });
            
		}
	}
});
