'use strict';
/**
 * @ngdoc overview
 * @name service.gridService
 */
angular.module('backAnd')
    .factory('dataListService', ['$resource', function ($resource, CONSTANTS) {
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
//        return $resource(CONSTANTS.URL + '/1/:dataType/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
	    return $resource(backandGlobal.url + '/1/:dataType/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
            dataType: 'view',
            viewName: '',
            pageSize: '',
            pageNumber: '',
            withSelectOptions: '',
            filter: '',
            sort: '',
            search: ''
        }, {
            read: {
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
angular.module('backAnd').factory('dataItemService', ['$resource',
    function ($resource) {
        /**
         * @ngdoc service
         * @name service.gridViewDataItemService
         * @description get a single row data
         * @param {string} viewName, the name of the view or table from the database
         * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
         */


        return $resource(backandGlobal.url + '/1/:dataType/data/:viewName/:id?:qs', {
                dataType: 'view',
                viewName: '',
                id: 'id',
                qs: ''
            },
            {
                read: {
                    method: 'GET',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                create: {
                    method: 'POST',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                update: {
                    method: 'PUT',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                delete: {
                    method: 'DELETE',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                }
            });
    }



]);


//************************************** EXAMPLE **************************************** //

//angular.module('backAnd')
//    .service('dataItemService', ['$http', 'CONSTANTS', function ($http, CONSTANTS) {
//
//        var baseUrl = CONSTANTS.URL + '/1/:dataType/data/:viewName/:id';
//
//        this.read = function (dataType, viewName, id) {
//            return $http({
//                url: baseUrl + '/1/' + dataType + '/data/' + viewName + '/' + id,
//                cache: false,
//                responseType: 'json'
//            })
//        };


//        return $resource(backandGlobal.url + '/1/:dataType/data/:viewName/:id', {
//                dataType: 'view',
//                viewName: '',
//                id: 'id'
//            },
//            {
//                read: {
//                    method: 'GET',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                create: {
//                    method: 'POST',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                update: {
//                    method: 'PUT',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                delete: {
//                    method: 'DELETE',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                }
//            });
//    }



//    ]);

























