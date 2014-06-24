'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'tableService', 'configService',
        function($scope, tableService, configService) {
            $scope.init = function() {
                configService.queryjsonp({
                    table: 'test1'
                }, function(data) {
                    console.log(data);
                    $scope.config = data.fields;
                    $scope.columns = [];
                    angular.forEach($scope.config, function(con) {
                        $scope.columns.push({
                            field: con.type,
                            displayName: con.displayName,
                            cellTemplate: '<div class="ngCellText" ><span ng-cell-text >{{row.entity[col.displayName]}}</span></div>'
                        });
                    });
                    tableService.queryjsonp({
                        table: 'test1'
                    }, function(data) {
                        console.log(data);
                        $scope.myData = data.data;
                    });
                });
                $scope.myOptions = {
                    columnDefs: 'columns',
                    data: 'myData'
                };
            }

        }
    ])
