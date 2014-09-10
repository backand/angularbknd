'use strict';


angular.module('backAnd.controllers')
.controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService', '$location',
    function ($scope, Global, $http, dashboardService, $location) {
        $scope.global = Global;

        $scope.$watch('dashboardId', function() {
            if ($scope.dashboardId) {
                $scope.setData($scope.dashboardId);
            }
            else if ($location.search().dashboardId) {
                $scope.setData($location.search().dashboardId);
            }
        });

        $scope.setData = function(id) {
            dashboardService.queryjsonp({
                dashboard: id
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
