angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('dashboardService', ['$resource',
	function($resource) {
		return $resource('http://rivka.backand.info:8093/1/dashboard/config/1', {}, {
			queryjsonp: {
				method: 'JSONP',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
]);
