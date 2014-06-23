angular.module('backAnd.services').
  value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource', function($resource) {
    return $resource('http://rivka.backand.info:8093/1/app/config', {},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);