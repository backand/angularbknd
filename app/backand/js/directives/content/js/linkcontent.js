/**
* @ngdoc overview
* @name directive.linkcontent
*/
angular.module('backAnd.directives')
    .directive('linkcontent', ['configService',
        function (configService) {
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
		link: function (scope) {
		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        window.open(data.externalLink, '_blank');
		    });
		}
	}
}]);
