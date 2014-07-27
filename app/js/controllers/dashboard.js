'use strict';


angular.module('backAnd.controllers')
.controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService', 'chartConfig',
    function($scope, Global, $http, dashboardService, chartConfig) {
        $scope.global = Global;
        $scope.init = function() {
            dashboardService.queryjsonp({}, function(data) {
                $scope.numCol = 12 / data.columns;
            });
            chartConfig.queryjsonp({}, function(data) {
                $scope.chartNumber = data.totalRows;
                $scope.chartData = [];
                angular.forEach(data.data, function(value, key) { 
                    this.push({type :value.type, id : value.id});
                }, $scope.chartData)
            });
            
        }

    }
    ])
