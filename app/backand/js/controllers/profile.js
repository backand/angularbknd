'use strict';
/**
* @ngdoc overview
* @name controller.profileController
*/
angular.module('backAnd.controllers')
    .controller('profileController', ['$scope', 'Global', 'menuService', '$http',
        /**
        * @ngdoc function
        * @name init
        * @methodOf backand.js.controllers:profileController
        * @description initiate the configuration of the user profile
        */
        function($scope, Global, menuService, $http) {
            $scope.global = Global;
            $scope.init = function() {
                menuService.queryjsonp({
                }, function(data) {
                    $scope.profile = data.company;
                    $scope.profile.img = decodeURIComponent($scope.profile.logo);
                    $scope.profile.fullName = data.user.fullName;
                    $scope.profile.username = data.user.username;
                });
            }
            $scope.logOut = function() {
                localStorage.removeItem('Authorization');
                window.location.reload();
            }

        }
    ])
