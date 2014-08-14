angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('contentService', ['$resource',
	function($resource) {
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