'use strict';
/**
* @ngdoc overview
* @name service.gridService
*/
angular.module('backAnd.services').
value('version', '0.1');

angular.module('backAnd').factory('gridService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.gridService
        * @description get the grid data
        * @param {string} viewName, the name of the view or table from the database
        * @param {integer} pageSize, the number of rows in a page
        * @param {integer} pageNumber, the number of the page
        * @param {boolean} withSelectOptions, default false, if true then it gets the select options of each parent relation fields that is not an autocomplete field 
        * @param {string} filter, a json array of {fieldName, operator, value}
        * @param {string} sort,  a json array of {fieldName, ascending or descending oreder}
        * @param {string} search,  a free text search
        */
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
/**
* @ngdoc overview
* @name service.gridConfigService
*/
angular.module('backAnd').factory('gridConfigService', ['$resource',
	function($resource) {
	    /**
        * @ngdoc service
        * @name service.gridService
        * @description get the grid configuration
        * @param {string} viewName, the name of the view or table from the database
        */
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

/**
* @ngdoc overview
* @name service.gridViewDataItemService
*/
angular.module('backAnd').factory('gridViewDataItemService', ['$resource',
    function($resource) {
        /**
        * @ngdoc service
        * @name service.gridViewDataItemService
        * @description get a single row data
        * @param {string} viewName, the name of the view or table from the database
        * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
        */
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

/**
* @ngdoc overview
* @name service.gridCreateItemService
*/
angular.module('backAnd').factory('gridCreateItemService', ['$resource',
    function ($resource) {
        /**
        * @ngdoc service
        * @name service.gridCreateItemService
        * @description create a new row 
        * @param {string} viewName, the name of the view or table from the database
        */
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

/**
* @ngdoc overview
* @name service.gridUpdateItemService
*/
angular.module('backAnd').factory('gridUpdateItemService', ['$resource',
    function ($resource) {
        /**
        * @ngdoc service
        * @name service.gridUpdateItemService
        * @description update a single row 
        * @param {string} viewName, the name of the view or table from the database
        * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
        */
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

/**
* @ngdoc overview
* @name service.gridDeleteItemService
*/
angular.module('backAnd').factory('gridDeleteItemService', ['$resource',
    function ($resource) {
        /**
       * @ngdoc service
       * @name service.gridDeleteItemService
       * @description delete a single row 
       * @param {string} viewName, the name of the view or table from the database
       * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
       */
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
