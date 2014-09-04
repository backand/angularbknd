'use strict';

angular.module('backAnd.controllers')
    .controller('profileController', ['$scope', 'Global', 'menuService', '$http',
        function($scope, Global, menuService, $http) {
            $scope.global = Global;
            $scope.init = function() {
                menuService.queryjsonp({
                    table: $scope.global.currentTable
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
