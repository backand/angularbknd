angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('dashboardService', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/dashboard/config/1', {}, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
]);
