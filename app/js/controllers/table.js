'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'Global', 'tableService', 'configService', '$http',
        function($scope, Global, tableService, configService, $http) {
            $scope.global = Global;

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

            $scope.dataTable = {
                columnDefs: 'columns',
                data: 'dataFill',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                filterOptions: $scope.filterOptions
            };



            $scope.setPagingData = function(data, page, pageSize) {
                $scope.totalServerItems = data.totalRows;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };


            $scope.getPagedDataAsync = function(pageSize, page, searchText) {
                var data;
                configService.queryjsonp({
                    table: $scope.global.currentTable
                }, function(data) {
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
                        pageSize: $scope.pagingOptions.pageSize,
                        pageNumber: page,

                    }, function(largeLoad) {
                        $scope.dataFill = largeLoad.data;
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
                });

            };
            if ($scope.global.currentTable) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }

            $scope.$watch('pagingOptions', function(newVal, oldVal) {

                if (newVal !== oldVal) {
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
    ]);
