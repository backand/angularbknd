'use strict';
/**
 * @ngdoc overview
 * @name service.gridService
 */
angular.module('backAnd')
    .factory('filterService', ['$http', '$log', 'Global',
    function ($http, $log, Global) {
        return {

            getFilterOptions: function (viewName, callback) {
               if (!Global.filterOptions) {
                   Global.filterOptions = [];
                }
               if (!Global.filterOptions[viewName]) {
                    $http.get(backandGlobal.url + '/1/view/data/' + viewName, {
                        params: { pageSize: 1, pageNumber: 1, withFilterOptions: true }
                    })
                    .then(function (response) {
                        Global.filterOptions[viewName] = response.data.filterOptions;
                        callback(Global.filterOptions[viewName]);
                    });
                }
                else {
                    callback(Global.filterOptions[viewName]);
                }

            }
        }
    }]);



