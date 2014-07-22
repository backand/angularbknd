'use strict';


angular.module('backAnd.controllers')
    .controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService',
        function($scope, Global, $http, dashboardService) {
            $scope.global = Global;
            $scope.init = function() {
                dashboardService.queryjsonp({}, function(data) {
                    console.log(data)
                    $scope.numCol = 2;
                    $scope.numCol = 12/$scope.numCol;
                    console.log($scope.numCol)
                });
  

            }

        }
    ])
