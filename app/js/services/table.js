angular.module('backAnd.services').
  value('version', '0.1');

angular.module('backAnd').factory('tableService', ['$resource', function($resource) {
    return $resource('http://rivka.backand.info:8093/1/view/data/test2', {},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);
angular.module('backAnd').factory('configService', ['$resource', function($resource) {
    return $resource('http://rivka.backand.info:8093/1/view/config/test2', {},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);