'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'tableService', 'configService', '$http',
        function($scope, tableService, configService, $http) {
            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: true
            };
            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes: [2, 5, 6],
                pageSize: 2,
                currentPage: 1
            };
            $scope.setPagingData = function(data, page, pageSize) {
                var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                $scope.myData = pagedData;
                $scope.totalServerItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            $scope.getPagedDataAsync = function(pageSize, page, searchText) {
                setTimeout(function() {
                    var data;
                    if (searchText) {
                        var ft = searchText.toLowerCase();
                        tableService.queryjsonp({
                            table: 'test1'
                        }, function(data) {
                            dataSet = data.data.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(dataSet, page, pageSize);
                        });
                    } else {
                        tableService.queryjsonp({
                            table: 'test1'
                        }, function(data) {
                            console.log(data);
                            $scope.setPagingData(data.data, page, pageSize);
                        });
                    }
                }, 100);
            };

            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            $scope.$watch('pagingOptions', function(newVal, oldVal) {
                if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);
            $scope.$watch('filterOptions', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

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
                    data: 'myData',
                    enablePaging: true,
                    showFooter: true,
                    totalServerItems: 'totalServerItems',
                    pagingOptions: $scope.pagingOptions,
                    filterOptions: $scope.filterOptions
                };
            }

        }
    ])
