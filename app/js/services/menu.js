angular.module('backAnd.services', []).
  value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource', function($resource) {
    return $resource('http://localhost:8000/test1', {},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);