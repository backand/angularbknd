/**
* @ngdoc overview
* @name directive.linkcontent
*/
angular.module('backAnd.directives')
.directive('linkcontent', function () {
    /**
      * @ngdoc directive
      * @name directive.linkcontent
      * @description link to content 
      * @param {string} contentId, required, id of the content
      * @returns {object} directive
      */
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
