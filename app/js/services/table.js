'use strict';

angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('tableService', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/view/data/:table?pageSize=:pageSize&pageNumber=:pageNumber', {
			table: 'table',
			pageSize: 'pageSize',
			pageNumber: 'pageNumber'
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
angular.module('backAnd').factory('configService', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/view/config/:table', {
			table: 'table'
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
