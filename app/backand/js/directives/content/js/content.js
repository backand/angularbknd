/**
* @ngdoc overview
* @name directive.ngbackContent
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/content/partials/content.html", '<div>\n' +
        '<div ng-switch on="content.pageType">\n' +
            '<htmlcontent content-id="content.__metadata.id" ng-switch-when="Content">	</htmlcontent>\n' +
            '<iframecontent content-id="content.__metadata.id" ng-switch-when="IFrame">	</iframecontent>\n' +
            '<linkcontent content-id="content.__metadata.id" ng-switch-when="External">	</linkcontent>\n' +
        '</div>\n' +
    '</div>')
})
.directive('ngbackContent', function ($templateCache) {
    /**
   * @ngdoc directive
   * @name directive.ngbackContent
   * @description base content 
   * @param {string} contentId, required, id of the content
   * @returns {object} directive
   */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/content.html',
		replace: false,
		controller: 'contentController',
		scope: {
		    contentId: '='
		},
		
	}
});
