'use strict';
/**
* @ngdoc overview
* @name service.chartService
*/
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('chartService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.chartService
        * @description get the chart data
        * @param {string} chart, the id of the chart
        */
	    return $resource(backandGlobal.url + '/1/chart/data/:chart', {
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

/**
* @ngdoc overview
* @name service.chartConfig
*/
angular.module('backAnd').factory('chartConfig', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.chartConfig
        * @description get the chart configuration
        * @param {string} chart, the id of the chart
        */
	    return $resource(backandGlobal.url + '/1/chart/config/', {
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