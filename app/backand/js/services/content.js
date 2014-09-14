/**
* @ngdoc overview
* @name service.contentService
*/
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('contentService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.contentService
        * @description get the content data
        * @param {string} content, the id of the content
        */
	    return $resource(backandGlobal.url + '/1/content/config/:content', {
	        content: 'content'
		}, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
]);