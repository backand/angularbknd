'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'Global', 'tableService', 'configService', '$http',
        function($scope, Global, tableService, configService, $http) {
            $scope.global = Global;
            $scope.global.currentTable = 'test2';


            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: true
            };
            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes: [20, 50, 100, 500],
                pageSize: 20,
                currentPage: 1
            };
            $scope.myOptions = {
                columnDefs: 'columns',
                data: 'myData',
                enablePaging: true,

                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                filterOptions: $scope.filterOptions
            };



            $scope.setPagingData = function(data, page, pageSize) {
                var pagedData = data.data.slice((page - 1) * pageSize, page * pageSize);
                $scope.myData = pagedData;
                $scope.totalServerItems = data.totalRows;
                console.log($scope.totalServerItems)
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };


            $scope.getPagedDataAsync = function(pageSize, page, searchText) {

                setTimeout(function() {
                    var data;
                    if (searchText) {
                        var ft = searchText.toLowerCase();
                        configService.queryjsonp({
                            table: $scope.global.currentTable
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
                                table: $scope.global.currentTable,
                                query: $scope.pagingOptions.pageSize
                            }, function(largeLoad) {
                                console.log(largeLoad.data.length);
                                $scope.myData = largeLoad.data;

                                data1 = largeLoad.data.filter(function(item) {
                                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                                });
                                $scope.setPagingData(data1, page, pageSize);
                            });
                        });
                    } else {
                        configService.queryjsonp({
                            table: $scope.global.currentTable
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
                            debugger
                            console.log($scope.columns)
                            tableService.queryjsonp({
                                table: $scope.global.currentTable,
                                query: $scope.pagingOptions.pageSize

                            }, function(largeLoad) {
                                console.log(largeLoad);
                                $scope.myData = largeLoad.data;
                                $scope.setPagingData(largeLoad, page, pageSize);
                            });
                        });
                    }
                }, 100);
            };





            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            $scope.$watch('pagingOptions', function(newVal, oldVal) {
                console.log(newVal)
                console.log(oldVal)
                if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);
            $scope.$watch('filterOptions', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

            $scope.$on('loadData', function() {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            });


        }
    ])
