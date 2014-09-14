'use strict';

var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('demoController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {

        function toQueryString(obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
            }
            return parts.join("&");
        }

        $scope.authentication = function () {
            if (localStorage['Authorization']) {
                $http.defaults.headers.common['Authorization'] = localStorage['Authorization'];
                return;
            }

            $scope.loginError = '';
            $scope.waiting = true;
            var data = toQueryString({
                grant_type: "password",
                username: '',
                password: '',
                appname: 'restdemo',
            });
            var request = $http({
                method: 'POST',
                url: backandGlobal.url + "/token",
                data: data,
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            request.success(function (data, status, headers, config) {
                localStorage.setItem('Authorization', data.token_type + ' ' + data.access_token);
                $location.path('/');
                window.location.reload()
            });
            request.error(function (data, status, headers, config) {
                var error_description = "The server is busy. Please contact your administrator or try again later.";
                if (data && data.error_description)
                    error_description = data.error_description;
                else {
                    console.error(error_description, { data: data, status: status, headers: headers, config: config })
                }
                $scope.loginError = error_description;
                console.log(status)
                $scope.waiting = false;
            });

        }

    }
])
