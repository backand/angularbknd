'use strict';


angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global', '$http', '$location', '$rootScope', '$route','$window',
        function($scope, Global, $http, $location, $rootScope, $route, $window) {
            $scope.global = Global;

            function toQueryString(obj) {
                var parts = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                    }
                }
                return parts.join("&");
            }

            $scope.authentication = function() {
                var data = toQueryString({
                    grant_type: "password",
                    username: $scope.user,
                    password: $scope.password,
                    appname: $scope.appName,
                });
                var request = $http({
                    method: 'POST',
                    url: "http://rivka.backand.info:8099/token",
                    data: data,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                request.success(function(data, status, headers, config) {
                    $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
                    localStorage.setItem('Authorization', $http.defaults.headers.common['Authorization']);
                    $location.path('/');
                    $route.reload();
                    $window.location.reload();
                });

                request.error(function(data, status, headers, config) {
                    console.log(status)
                });

            }


        }
    ])
