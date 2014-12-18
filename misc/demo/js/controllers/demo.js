'use strict';

var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('demoController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {

        var toQueryString = function(obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
            }
            return parts.join("&");
        }

        $scope.authentication = function () {
            var checkAuthenticationToken = function () {
                var request = $http({
                    method: 'POST',
                    url: backandGlobal.url + "/api/banner",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                request.success(function (data, status, headers, config) {
                    console.log(status);
                });
                request.error(function (data, status, headers, config) {
                    if (status == 401) {
                        localStorage.removeItem('AuthorizationDemo');
                        $location.path('/');
                        //window.location.reload()
                    }
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

            var token = localStorage['AuthorizationDemo'];
            if (token) {
                $http.defaults.headers.common['Authorization'] = token;
                //checkAuthenticationToken();
                return;
            }

            $scope.loginError = '';
            $scope.waiting = true;
            var data = toQueryString({
                grant_type: "password",
                username: 'guest@backand.com',
                password: 'guest1234',
                appname: 'demoapp1'
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
                localStorage.setItem('AuthorizationDemo', data.token_type + ' ' + data.access_token);
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
