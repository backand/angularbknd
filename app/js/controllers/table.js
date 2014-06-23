'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'tableService',
        function($scope, tableService) {

            $scope.init = function() {
                console.log($scope.myData)
                tableService.queryjsonp({
                    table: 'test1'
                }, function(data) {
                    console.log(data);
                    $scope.myTable = data.data;
                    console.log("========");
                   
                    $scope.myData = data.data;
                     console.log($scope.myData);
                });
                $scope.myOptions = {
                    data: 'myData'
                };

            }

        }
    ])
