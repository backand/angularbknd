'use strict';

angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('gridService', ['$resource',
	function($resource) {
		return $resource(backandGlobal.url + '/1/view/data/:table?pageSize=:pageSize&pageNumber=:pageNumber', {
			table: 'table',
			pageSize: 'pageSize',
			pageNumber: 'pageNumber',
			withSelectOptions: 'withSelectOptions',
			filter: 'filter',
			sort: 'sort',
			search: 'search'
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
angular.module('backAnd').factory('gridConfigService', ['$resource',
	function($resource) {
		return $resource(backandGlobal.url + '/1/view/config/:table', {
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

angular.module('backAnd').factory('gridViewDataItemService', ['$resource',
    function($resource) {
        return $resource(backandGlobal.url + '/1/view/data/:table/:id', {
            table: 'table',
            id: 'id',
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

angular.module('backAnd').factory('gridDeleteItemService', ['$resource',
    function ($resource) {
        return $resource(backandGlobal.url + '/1/view/data/:table/:id', {
            table: 'table',
            id: 'id',
        }, {
            queryjsonp: {
                method: 'DELETE',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
]);
