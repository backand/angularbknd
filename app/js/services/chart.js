'use strict';
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('chartService', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/chart/data/:chart', {
			chart: 'chart'
		}, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
])

angular.module('backAnd').factory('chartConfig', ['$resource',
	function($resource) {
		return $resource('http://api.backand.info:8099/1/chart/config/', {
		}, {
			queryjsonp: {
				method: 'GET',
				params: {
					callback: 'JSON_CALLBACK'
				}
			}
		});
	}
])