'use strict';


angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global', '$http',
        function($scope, Global, $http) {
            $scope.global = Global;
            // $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
            $scope.init = function() {
                alert($http.defaults.headers.common['Authorization'])
            }
            $scope.close = function() {
                //  $('#loginModal').removeClass('show');
            }
            $scope.authentication = function() {
                alert("auth")
                console.log(backand.security.authentication);
                backand.security.authentication.login($scope.user, $scope.password, $scope.appName)
            }
            backand.options.ajax = function(url, data, verb, successCallback, erroCallback, forToken) {
                console.log(data)
                // $http.post('/asd', {asd:'asd'});
                /*
                $http({
                    url: 'http://rivka.backand.info:8099/token',
                    method: "JSONP",
                    data: {
                        asd: 'asd'
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(data, status, headers, config) {
                    $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
                }).error(function(data, status, headers, config) {
                   alert("error")
                });*/
                $http({
                    url: url,
                    data: {
                        grant_type: "password",
                        username: "rivka@linnovate.net",
                        password: "123456",
                        appname: "rivka",
                    },
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function(data, status, headers, config) {
                    alert("http")
                    // this callback will be called asynchronously
                    // when the response is available
                })


                /*        $http({
                    method: "POST",
                    url: "//rivka.backand.info:8099/token",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                      data: {
                        grant_type: "password",
                        username: "rivka@linnovate.net",
                        password: "123456",
                        appname: "rivka",
                    }
                  
                }).success(function(data, status, headers, config) {
                    alert("http")
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    alert("erroe")
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });*/

            }

        }
    ])
