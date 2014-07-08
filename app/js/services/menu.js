angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/app/config', {}, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
]);
