angular.module('backAnd.services').
  value('version', '0.1');

angular.module('backAnd').factory('tableService', ['$resource', function($resource) {
    return $resource('http://rivka.backand.info:8093/1/view/data/:table?pageSize=:query', {table :'table',query:'query'},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);
angular.module('backAnd').factory('configService', ['$resource', function($resource) {
    return $resource('http://rivka.backand.info:8093/1/view/config/:table', {table :'table'},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK' } }
    });
}]);