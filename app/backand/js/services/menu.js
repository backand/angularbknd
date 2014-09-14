/**
* @ngdoc overview
* @name service.menuService
*/
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.menuService
        * @description get the app configuration, menu, company and user profile
        */
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
