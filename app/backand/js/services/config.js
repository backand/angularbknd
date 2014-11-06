'use strict';
/**
 * @ngdoc overview
 * @name service.gridConfigService
 */
angular.module('backAnd')
    .factory('configService', ['$resource', function ($resource) {

        /**
         * @ngdoc service
         * @name service.gridService
         * @description get the grid configuration
         * @param {string} viewName, the name of the view or table from the database
         */
        return $resource(backandGlobal.url + '/1/:dataType/config/:id', {
            dataType: 'view',
            id: ''
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
 * @name service.menuService
 */
angular.module('backAnd.services').
    value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource',
    function ($resource) {
        /**
         * @ngdoc service
         * @name service.menuService
         * @description get the app configuration, menu, company and user profile
         */
        return $resource(backandGlobal.url + '/1/app/config', { workspaceId: 'workspaceId' }, {
            queryjsonp: {
                method: 'GET',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
]);


