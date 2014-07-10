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
                });
            }

        }
    ])
