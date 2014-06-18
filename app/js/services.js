'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');



angular.module('myApp.services', [])
  .factory('testService', ['$http', function($http) {

   
      return $http({
      	parseJSON: false,
        method: 'JSONP',
        url: 'http://localhost:8000/test1'
      });
    }
   
  ]);



//////////////

angular.module('myApp.services').factory('testService2', ['$resource', function($resource) {
    return $resource('http://localhost:8000/test1', {},{
        queryjsonp: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
    });
}]);