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
		        content: $scope.contentId
		    }, function (data) {
		        if (data.openinaNewTab) {
		            //window.open(data.externalLink, data.target);

		            var evLink = document.createElement('a');
		            evLink.href = data.externalLink;
		            evLink.target = data.target;
		            document.body.appendChild(evLink);
		            evLink.click();
		            // Now delete it
		            evLink.parentNode.removeChild(evLink);
		        }
		        else
		            location.href = data.externalLink;
		    });

		    
		}
	}
});
