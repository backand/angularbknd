/**
* @ngdoc overview
* @name service.dashboardService
*/
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd.services').factory('dashboardService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.dashboardService
        * @description get the dashboard configuration
        * @param {string} dashboard, the id of the dashboard
        */
	    return $resource(backandGlobal.url + '/1/dashboard/config/:dashboard', {
			dashboard: 'dashboard'
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