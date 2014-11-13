/**
* @ngdoc overview
* @name directive.iframecontent
*/
angular.module('backAnd.directives')
    .directive('iframecontent', ['configService',
        function (configService) {
    /**
      * @ngdoc directive
      * @name directive.iframecontent
      * @description iframe content 
      * @param {string} contentId, required, id of the content
      * @returns {object} directive
      */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/iframecontent.html',
		replace: false,
		scope: {
		    contentId: '='
		},
		link: function (scope, element) {
		    /**
            * @ngdoc function
            * @name getDefaultIFrameHeight
            * @methodOf backand.js.directive.bkndContent
            * @description get the default iframe height
            * @returns {int} height in pixels
            */
		    scope.getDefaultIFrameHeight = function () {
		        var top = $('#id' + scope.contentId).position().top;
		        var height = ($(window).height() - top - 50);
		        return height;
		    };

		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        var iframe = element.find('iframe');
		        iframe.attr('src', data.iFrameURL);
		        if (data.width) {
		            iframe.attr('width', data.width);
		        }
		        else {
		            iframe.attr('width', '100%');
		        }
		        if (data.height) {
		            iframe.attr('height', data.height);
		        }
		        else {
		            iframe.attr('height', scope.getDefaultIFrameHeight());
		        }
		        if (data.scroll) {
		            iframe.attr('scrolling', "no");
		        }
		    });
		    
		}
	}
}]);
