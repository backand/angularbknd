'use strict';

angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('gridService', ['$resource',
	function($resource) {
		return $resource(backandGlobal.url + '/1/view/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
			viewName: 'viewName',
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
		return $resource(backandGlobal.url + '/1/view/config/:viewName', {
			viewName: 'viewName'
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
        return $resource(backandGlobal.url + '/1/view/data/:viewName/:id', {
            viewName: 'viewName',
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

angular.module('backAnd').factory('gridCreateItemService', ['$resource',
    function ($resource) {
        return $resource(backandGlobal.url + '/1/view/data/:viewName', {
            viewName: 'viewName',
        }, {
            queryjsonp: {
                method: 'POST',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
]);

angular.module('backAnd').factory('gridUpdateItemService', ['$resource',
    function ($resource) {
        return $resource(backandGlobal.url + '/1/view/data/:viewName/:id', {
            viewName: 'viewName',
            id: 'id',
        }, {
            queryjsonp: {
                method: 'PUT',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
]);

angular.module('backAnd').factory('gridDeleteItemService', ['$resource',
    function ($resource) {
        return $resource(backandGlobal.url + '/1/view/data/:viewName/:id', {
            viewName: 'viewName',
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
