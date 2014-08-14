angular.module('backAnd.directives')
.directive('iframecontent', function () {
	return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/iframecontent.html',
		replace: false,
		controller: 'contentController',
		link: function ($scope, element, attr) {
		    var iframe = element.find('iframe');
		    iframe.attr('src', $scope.content.iFrameURL);
		    if ($scope.content.width) {
		        iframe.attr('width', $scope.content.width);
		    }
		    else {
		        iframe.attr('width','100%');
		    }
		    if ($scope.content.height) {
		        iframe.attr('height', $scope.content.height);
		    }
		    else {
		        iframe.attr('height', $scope.getDefaultIFrameHeight());
		    }
		    if (!$scope.content.scroll) {
		        iframe.attr('scrolling', "no");
		    }
		}
	}
});
