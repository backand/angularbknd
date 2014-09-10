'use strict';


/**
* @ngdoc overview
* @name controller.dashboardController
*/
angular.module('backAnd.controllers')
.controller('dashboardController', ['$scope', 'Global', '$http', 'dashboardService', '$location',
    function ($scope, Global, $http, dashboardService, $location) {
        $scope.global = Global;

        /**
        * @ngdoc function
        * @name dashboardId
        * @methodOf backand.js.controllers:dashboardController
        * @description Get the new Backand's dashboard id and re-load the data
        */
        $scope.$watch('dashboardId', function () {
            if ($scope.dashboardId) {
                $scope.setData($scope.dashboardId);
            }
            else if ($location.search().dashboardId) {
                $scope.setData($location.search().dashboardId);
            }
        });

        /**
        * @ngdoc function
        * @name setData
        * @methodOf backand.js.controllers:dashboardController
        * @param {string} id reference to dashboard
        * @description set the data
        */
        $scope.setData = function (id) {
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
