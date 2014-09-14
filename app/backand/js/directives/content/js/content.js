/**
* @ngdoc overview
* @name directive.ngbackContent
*/
angular.module('backAnd.directives')
.directive('ngbackContent', function () {
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
