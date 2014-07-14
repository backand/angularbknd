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
                    console.log($scope.profile);
                    $scope.profile.img = decodeURIComponent($scope.profile.logo);
                });
            }
            $scope.logOut = function() {
                localStorage.clear();
                window.location.reload();
            }

        }
    ])
