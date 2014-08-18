angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource',
	function($resource) {
	    return $resource(backandGlobal.url + '/1/app/config', { workspaceId: 'workspaceId' }, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
]);
