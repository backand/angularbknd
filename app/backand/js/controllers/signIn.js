'use strict';


angular.module('backAnd.controllers')
 .controller('signInController', ['$scope', 'Global', '$http', '$location', '$rootScope','$route', '$routeParams',
        function ($scope, Global, $http, $location, $rootScope, $route, $routeParams) {
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

            function getDefaultApp() {
                if (backandGlobal.defaultApp)
                    return backandGlobal.defaultApp;

                var hostSegments = location.hostname.split('.');
                if (hostSegments.length > 1) {
                    return hostSegments[0];
                }
                return '';
            }

            $scope.appName = getDefaultApp();
            if ($location.search().username)
                $scope.user = $location.search().username;
            if ($location.search().password)
                $scope.password = $location.search().password;
            $scope.waiting = false;

            $scope.authentication = function() {
                $scope.loginError = '';
                $scope.waiting = true;
                localStorage.removeItem("Authorization");
                var data = toQueryString({
                    grant_type: "password",
                    username: $scope.user,
                    password: $scope.password,
                    appname: $scope.appName,
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
                request.success(function(data, status, headers, config) {
                    successLogin(data.token_type,data.access_token);
                });
                request.error(function (data, status, headers, config) {
                    var error_description = "The server is busy. Please contact your administrator or try again later.";
                    if (data && data.error_description)
                        error_description = data.error_description;
                    else {
                        //console.error(error_description, { data: data, status: status, headers: headers, config: config })
                    }
                    $scope.loginError = error_description;
                    console.log(status)
                    $scope.waiting = false;
                });

            }

   var successLogin = function (tokenType, tokenData) {
                $http.defaults.headers.common['Authorization'] = tokenType+ ' ' + tokenData;
                localStorage.setItem('Authorization', $http.defaults.headers.common['Authorization']);
                $location.path('/');
                window.location.reload()
            }

            $scope.externalAuthorizationList;

			

			$scope.externalSignin = function (url) {
			    if ($scope.appName == '' || typeof $scope.appName == 'undefined') {
			        $scope.loginError = "Please insert application name";
			        return;
			    }
				
				var returnUrl =  $location.absUrl().indexOf('#') > 0 ? $location.absUrl() : $location.absUrl() + "#"; // pad location with # 
																											     // because angular allow querystring params
																											     // only after a #
																												 
			    window.location = backandGlobal.url + '/api/' + url + "&appname=" + encodeURIComponent($scope.appName) + "&returnAddress=" + encodeURIComponent(returnUrl);			
			};

            $scope.loadExternalAuthentification = function () {
                var data = toQueryString({
                    returnUrl: "http://localhost:44300/singin-google", // should be as appear in google console manager
                    generateState: "false"
                });

                var request = $http({
                    method: 'GET',
                    url: backandGlobal.url + "/api/account/ExternalLogins?" + data,
                    
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                  
                });

                request.success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.externalAuthorizationList = data;
                });

                request.error(function (data, status, headers, config) {
                    // don't do anything, user will not see any external login
                });
            };

			
            $scope.loadExternalAuthentification();
        }
    ])
