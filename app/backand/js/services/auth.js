(function () {
    'use strict';

    function AuthService($http) {

        var self = this;

        this.signIn = function (userName, password, appname, successCallback, errorCallback) {
            var request = $http({
                method: 'POST',
                url: backandGlobal.url + '/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    grant_type: 'password',
                    username: userName,
                    password: password,
                    appname: appname
                }
            });
            request.success(function (data, status, headers, config) {
                $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
                successCallback(data, status, headers, config);
            });
            request.error(function (data, status, headers, config) {
                errorCallback(data, status, headers, config);
            });

        };
    }

    angular.module('backAnd')
      .service('AuthService', ['$http', AuthService])

})();