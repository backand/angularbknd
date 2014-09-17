/**
* @ngdoc overview
* @name directive.linkcontent
*/
angular.module('backAnd.directives')
.directive('linkcontent', function (configService) {
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
		scope: {
		    contentId: '='
		},
		link: function (scope, element, attr) {
		    configService.read({
		        dataType: "content",
		        id: scope.contentId
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
