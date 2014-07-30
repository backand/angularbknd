'use strict';


angular.module('backAnd.controllers')
.controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService',
    function($scope, Global, $http, dashboardService) {
        $scope.global = Global;
        $scope.init = function() {
            dashboardService.queryjsonp({
                dashboard : $scope.global.currentTableID
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
