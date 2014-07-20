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
                filterText: '',
                useExternalFilter: true
            };
            
            $scope.showColumnMenu = true;
            $scope.showMenu = true;

            /*Enables display of the filterbox in the column menu. 
            If both showColumnMenu and showFilter are false the menu button will not display.*/
            $scope.showFilter = true;

            $scope.activateFilter = function() {
              var searchText = $scope.searchText || null;
              $scope.getData(searchText);  
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
            
            $scope.sortInfo = {};

            $scope.useExternalSorting = true;
            var isSorting = false;

            $scope.$on('ngGridEventSorted', function(event, sortInfo) {
                // don't call getPagedDataAsync here cos this function
                // is called multiple times for the same update.
                if (isSorting == false) {
                    isSorting = true;
                    $scope.sortInfo = {
                        fieldName: sortInfo.columns[0].displayName,
                        order: sortInfo.directions[0]
                    };
                }
            });

            
            

            $scope.dataTable = {
                columnDefs: 'columns',
                data: 'dataFill',
                enablePaging: true,
                showFooter: true,
                enableSorting: true,
                useExternalSorting: true,
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

                            cellTemplate: '<div class="ngCellText" ><span ng-cell-text >{{row.entity[col.displayName]}}</span></div>'
                        });

                    });
                    console.log($scope.columns)
                    $scope.getData()

                });



            };

            $scope.getData = function(searchText) {
                $scope.isLoad = true;
                if(searchText == 'undefined') searchText == null;
                // We are requesting data for the specific page of the table.
                var sortString = '[' + JSON.stringify($scope.sortInfo) + ']';
                console.log(sortString);
                tableService.queryjsonp({
                    // This will also need to be adjusted to deal with mutiple tables on the same page
                    table: $scope.tableName,
                    pageSize: $scope.pagingOptions.pageSize,
                    pageNumber: $scope.pagingOptions.currentPage,
                    sort : sortString,
                    search: searchText


                }, function(largeLoad) {

                    // We have received table data and add the data to the scope
                    $scope.dataFill = largeLoad.data;
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

            $scope.$watch('sortInfo', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('sortInfo-watch');
                    $scope.getData();
                }
            }, true);  
            

            // this is the intitialization of the table data above
            $scope.$on('loadData', function() {
                $scope.getConfigDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage); 
            });
        }
    ]);
