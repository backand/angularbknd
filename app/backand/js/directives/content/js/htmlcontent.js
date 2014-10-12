/**
* @ngdoc overview
* @name directive.htmlcontent
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('htmlcontent', function (configService) {
    /**
   * @ngdoc directive
   * @name directive.htmlcontent
   * @description html content 
   * @param {string} contentId, required, id of the content
   * @returns {object} directive
   */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/htmlcontent.html',
		replace: false,
		scope: {
		    contentId: '='
		},
		link: function (scope, element, attr) {
		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        var el = angular.element(data.content);
		        element.append(el);
		    });
            
		}
	}
});
