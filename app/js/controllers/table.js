"use strict";


angular.module('backAnd.controllers')
.controller('tableController', ['$scope', 'Global', 'tableService', 'configService', '$http','$location','$route','$sce',
    function ($scope, Global, tableService, configService, $http, $location, $route, $sce) {

        $scope.global = Global;

        // Read the configuration of the current view
        $scope.$watch('tableName', function() {
            if ($scope.tableName)  {
                $scope.getConfigDataAsync();
            }

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

        $scope.refreshData = function () {
            $scope.getData();
        };

        $scope.editSelected = function () {
            if ($scope.mySelections != null && $scope.mySelections.length == 1) {
                $location.search({
                  id: $scope.mySelections[0].__metadata.id,
                  table: $scope.tableName
              });
                $location.path('/formsExample');
            }
        };

        $scope.deleteSelected = function () {
            angular.forEach($scope.mySelections, function (rowItem) {
                $scope.dataFill.splice($scope.dataFill.indexOf(rowItem), 1);
                    //alert('delete:' + $scope.dataFill.indexOf(rowItem));
                    //todo: call the service to delete the record
                });
        }

        $scope.totalServerItems = 0;

        $scope.pagingOptions = {
            pageSizes: [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000],
            pageSize: 0,
            currentPage: 1,
        };

        var isSort = true;
        $scope.sortOptions = {};                           
        $scope.$on('ngGridEventSorted', function(event, sortInfo) {
                // don't call getPagedDataAsync here cos this function
                // is called multiple times for the same update.
                $scope.sortOptions = {
                    fieldName: sortInfo.columns[0].displayName,
                    order: sortInfo.directions[0]
                };
            });
        $scope.mySelections = [];

        if (!Global.configTable) {
            $scope.dataTable = {
                columnDefs: 'columns',
                data: 'dataFill',
                selectedItems: $scope.mySelections,
                enablePaging: true,
                showFooter: true,
                useExternalSorting: true,
                sortOptions: $scope.sortOptions,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                rowHeight: 30,
                headerRowHeight: 30,
                footerRowHeight: 47,
                multiSelect: false
            };   
        }
        else {
            $scope.dataTable = {
                columnDefs: 'columns',
                data: 'dataFill',
                selectedItems: $scope.mySelections,
                enablePaging: true,
                showFooter: true,
                useExternalSorting: true,
                sortOptions: $scope.sortOptions,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                rowHeight: Global.configTable.design.rowHeightInPixels, 
                headerRowHeight: 30,
                footerRowHeight: 47,
                multiSelect: false
            };
        }


        // This is the call to get the data based on the table
        // and receives arguments of page size and page number
        // should look into creating a table directive that receives 
        // arguments eg table name, and paging information

        $scope.getConfigDataAsync = function() {
            $scope.isLoad = true;
            $scope.columns = [];

            //update the configuration
            $scope.pagingOptions.pageSize = Global.configTable.design.rowsperPage;

            // We are adding columns and its custom filter to the table based on type
            // this will also need to be changed to handle multiple tables on the same page
            angular.forEach(Global.configTable.fields, function (col) {
                if (!col.donotDisplayinGrid && col.type != 'MultiSelect') {
                    $scope.columns.push({
                        cellFilter: col.type,
                        displayName: col.displayName,
                        width: col.columnWidth,
                        cellTemplate: $scope.getCellTemplate(col, Global.configTable)
                    });
                }
            });

            $scope.getData();
        };
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        $scope.getCellTemplate = function (col, view) {
            switch (col.type) {
                case 'Image':
                    var height = 'auto';// (view.rowHeight != '') ? view.rowHeight : 'auto';
                    var width = (height != 'auto') ? 'auto' : col.columnWidth;
                    return '<div class="ngCellText"><span ng-cell-text><img ng-src="' + col.urlPrefix + '/{{row.entity[\'' + col.name + '\']}}" width="' + width + '" height="' + height + '" lazy-src/></span></div>';
                    case 'Html':
                    return '<p ng-bind-html="renderHtml(\'{{row.entity[\'' + col.name + '\']}}\')"></p>'; //'{{row.entity["' + col.name + '"]}}';
                    default:
                    return '<div class="ngCellText"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
            }
        }

        $scope.getData = function(searchText) {
            $scope.isLoad = true;
            if(searchText == 'undefined') searchText == null;
            // We are requesting data for the specific page of the table.
            var sortString = '[' + JSON.stringify($scope.sortOptions) + ']';
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
                $scope.isLoad = false;
            });
        }
        $scope.afterSelectionChange = function (rowItem) {
            if (rowItem.selected)  {  // I don't know if this is true or just truey
                //write code to execute only when selected.
                //rowItem.entity is the "data" here
            } else {
                //write code on deselection.
            }
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

        $scope.$watch('sortOptions', function(newVal, oldVal) {
            if (isSort && newVal !== oldVal) {
                $scope.getData();
                isSort = false;
                $scope.setIsSort();          
            }
        }, true);  

        $scope.setIsSort = function() {
            setTimeout(function(){isSort = true;}, 1500);
        }

            // this is the intitialization of the table data above
            $scope.$on('loadData', function() {
            $scope.getConfigDataAsync(); 
        });

    }
 ]);

