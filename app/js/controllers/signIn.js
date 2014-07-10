'use strict';


angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global', '$http',
        function($scope, Global, $http) {
            $scope.global = Global;
            // $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
            $scope.init = function() {
                //  alert($http.defaults.headers.common['Authorization'])
            }
            $scope.close = function() {
                //  $('#loginModal').removeClass('show');
            }
            $scope.authentication = function() {
                //     alert("auth")
                console.log(backand.security.authentication);
                backand.security.authentication.login($scope.user, $scope.password, $scope.appName)
            }
            backand.options.ajax = function(url, data, verb, successCallback, erroCallback, forToken) {
                console.log(data);

                function toQueryString(obj) {
                    var parts = [];
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                        }
                    }
                    return parts.join("&");
                }

                var data = toQueryString({
                    grant_type: "password",
                    username: "rivka@linnovate.net",
                    password: "123456",
                    appname: "rivka",
                });


                var request = $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });                
           

            }

        }
    ])
