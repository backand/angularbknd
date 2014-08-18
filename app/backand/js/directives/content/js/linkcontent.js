angular.module('backAnd.directives')
.directive('linkcontent', function () {
	return {
		restrict: 'E',
		replace: false,
		controller: 'contentController',
		scope: {
		    contentId: '='
		},
		link: function ($scope, element, attr) {
		    $scope.contentService.queryjsonp({
		        content: $scope.global.currentTableID
		    }, function (data) {
		        if (data.openinaNewTab)
		            window.open(data.externalLink, data.target);
		        else
		            location.href = data.externalLink;
		    });

		    
		}
	}
});
