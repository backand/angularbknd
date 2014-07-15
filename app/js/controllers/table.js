"use strict";


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'Global', 'tableService', 'configService', '$http',
        function($scope, Global, tableService, configService, $http) {


            $scope.global = Global;



            $scope.$watch('tableName', function() {
                if ($scope.tableName)
                    $scope.getConfigDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

            });

            // All of the configurations will be part of the directive and we can change things
            // like default page size in when we call the directive

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
            if ($scope.options) {
                if ($scope.options.pageSizes) {
                    $scope.pagingOptions.pageSizes = $scope.options.pageSizes;
                    if ($scope.options.pageSize)
                        $scope.pagingOptions.pageSize = $scope.options.pageSize;
                }
            };

            function impSortFn(a, b) {
                console.log(a)
                if (a == b) return 0;
                if (a < b) return -1;
                return 1;
            }


            $scope.dataTable = {
                columnDefs: 'columns',
                data: 'dataFill',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions
            };



            // This is the call to get the data based on the table
            // and receives arguments of page suze and page number
            // should look into creating a table directive that receives 
            // arguments eg table name, and paging information

            $scope.getConfigDataAsync = function(pageSize, page) {
                $scope.isLoad = true;

                // Request to get the field information about the table
                // This config call needs to be separated into a separate function
                // that is only called once
                configService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    table: $scope.tableName
                }, function(data) {

                    $scope.config = data.fields;
                    $scope.columns = [];

                    // We are adding columns and its custom filter to the table based on type
                    // this will also need to be changed to handle multiple tables on the same page

                    angular.forEach($scope.config, function(con) {
                        $scope.columns.push({
                            cellFilter: con.type,
                            displayName: con.displayName,
                            sortFn: impSortFn,
                            cellTemplate: '<div class="ngCellText" ><span ng-cell-text >{{row.entity[col.displayName]}}</span></div>'
                        });

                    });
                    console.log($scope.columns)
                    $scope.getData()
                });



            };

            $scope.getData = function() {
                $scope.isLoad = true;

                // We are requesting data for the specific page of the table.

                tableService.queryjsonp({
                    // This will also need to be adjusted to deal with mutiple tables on the same page
                    table: $scope.tableName,
                    pageSize: $scope.pagingOptions.pageSize,
                    pageNumber: $scope.pagingOptions.currentPage,

                }, function(largeLoad) {

                    // We have received table data and add the data to the scope
                    $scope.dataFill = largeLoad.data;
                    console.log(largeLoad.data)
                    console.log(largeLoad.totalRows)
                    $scope.totalServerItems = largeLoad.totalRows;

                    // apply changes
                    /* if (!$scope.$$phase) {
                        $scope.$apply();
                    }*/
                    $scope.isLoad = false;
                });


            }



            $scope.$watch('pagingOptions', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getData();
                }
            }, true);

            $scope.$watch('filterOptions', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

            // this is the intitialization of the table data above
            $scope.$on('loadData', function() {
                $scope.getConfigDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            });
        }
    ]);
