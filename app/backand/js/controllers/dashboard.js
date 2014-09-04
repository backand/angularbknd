'use strict';


angular.module('backAnd.controllers')
.controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService',
    function($scope, Global, $http, dashboardService) {
        $scope.global = Global;
        $scope.$watch('dashboardId', function() {
            if ($scope.dashboardId)
                $scope.setData();
        });
        $scope.init = function() {
            $scope.setData();
        }
        $scope.setData = function() {
            dashboardService.queryjsonp({
                dashboard: $scope.dashboardId
            }, function(data) { 
                $scope.numCol = 12 / data.columns;
                $scope.chartData = [];
                angular.forEach(data.widgets, function(value, key) { 
                    this.push({type :value.type, id : value.__metadata.id});
                },  $scope.chartData)
            });
            
        }
    }
    ])
