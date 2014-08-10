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

        $scope.filterKeyPress = function (keyEvent) {
            if (keyEvent.which === 13)
                $scope.activateFilter();
        }
        $scope.activateFilter = function() {
            var searchText = $scope.searchText || null;
            $scope.getData(searchText);  
        };
        $scope.deactivateFilter = function () {
            $scope.searchText = '';
            $scope.getData('');
        };

        $scope.editSelected = function () {
            alert("Coming soon..");
            return;
            if ($scope.mySelections != null && $scope.mySelections.length == 1) {
                $location.search({
                    id: $scope.mySelections[0].__metadata.id,
                    table: $scope.tableName
                });
                $location.path('/formsExample');
            }
        };
        $scope.addRow = function () {
            alert("Coming soon..");
            return;
        }

        $scope.deleteSelected = function () {
            alert("Coming soon..");
            return;
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
         var layoutPlugin = new ngGridLayoutPlugin();

        $scope.sortOptions = {};                           
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
                multiSelect: false,
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
                rowHeight: Global.configTable.design && Global.configTable.design.rowHeightInPixels ? Global.configTable.design.rowHeightInPixels : 30, 
                headerRowHeight: 30,
                footerRowHeight: 47,
                multiSelect: false,
                enableColumnResize: true,
            };
        }

        // This is the call to get the data based on the table
        // and receives arguments of page size and page number
        // should look into creating a table directive that receives 
        // arguments eg table name, and paging information
        var myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">'+
                               '<div ng-click="myCustomSort(col)"  class="ngHeaderText">{{col.displayName}}</div>'+
                               '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'+
                               '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'+
                               '<div class="ngSortPriority">{{col.sortPriority}}</div>'+
                               '</div>'+
                               '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
        
        $scope.myCustomSort = function(col) {
            if (!col.sortDirection || col.sortDirection == "asc")
               col.sortDirection = "desc";
            else
                col.sortDirection = "asc";      
            $scope.sortOptions = {
                fieldName: col.displayName,
                order: col.sortDirection
            };
            $scope.getData();
        }
        
        $scope.getConfigDataAsync = function() {
            $scope.isLoad = true;
            $scope.columns = [];

            //update the configuration
            $scope.pagingOptions.pageSize = Global.configTable.design.rowsperPage;
            $scope.newButton = Global.configTable.description.newButtonName;
            $scope.editButton = Global.configTable.description.editButtonName;
            $scope.deleteButton = Global.configTable.description.deleteButtonName;

            // We are adding columns and its custom filter to the table based on type
            // this will also need to be changed to handle multiple tables on the same page
            angular.forEach(Global.configTable.fields, function (col) {
                if (!col.donotDisplayinGrid && col.type != 'MultiSelect') {
                    $scope.columns.push({
                        headerCellTemplate: myHeaderCellTemplate,
                        cellFilter: col.type,
                        displayName: col.displayName,
                        width: col.columnWidth,
                        cellTemplate: $scope.getCellTemplate(col, Global.configTable)
                    });
                }
            });

            $scope.getData();
        };

        $scope.getCellTemplate = function (col, view) {
            switch (col.type) {
                case 'Image':
                    var height = (view.design.rowHeightInPixels != '') ? view.design.rowHeightInPixels + 'px' : 'auto';
                    var width = (height != 'auto') ? 'auto' : col.columnWidth + 'px';
                    return '<div class="ngCellText"><span ng-cell-text><img ng-src="' + col.urlPrefix + '/{{row.entity[\'' + col.name + '\']}}" width="' + width + '" height="' + height + '" lazy-src/></span></div>';
                case 'Html':
                    return '<p ng-bind-html="renderHtml(\'{{row.entity[\'' + col.name + '\']}}\')"></p>'; //'{{row.entity["' + col.name + '"]}}';
                case 'LongText':
                    return '<div class="ngCellText" style="white-space: normal;"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                case 'Url':
                    //return '<div class="ngCellText"><a ng-href="renderUrl(\'{{row.entity[\'' + col.name + '\']}}\')">ssss</a></div>'
                    return '<div class="ngCellText"><p ng-bind-html="renderUrl(\'{{row.entity[\'' + col.name + '\']}}\')"></p></div>';
                default:
                    return '<div class="ngCellText"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
            }
        }
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        $scope.renderUrl = function (value) {
            var html = '';
            if(value != ''){
                var urls = value.split('|');
                if (urls.length == 1) {
                    html = '<a href="' + urls[0] + '" target="_blank">' + urls[0] + '</a>';
                }
                else {
                    var href = (urls[2] != undefined) ? urls[2] : '#';
                    var target = (urls[1] != undefined) ? urls[1] : '_blank';
                    var value = (urls[0] != undefined) ? urls[0] : href;
                    html = '<a href="' + href + '" target="' + target + '">' + value + '</a>';
                }
            }
            return $sce.trustAsHtml(html);
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

        // this is the intitialization of the table data above
        $scope.$on('loadData', function() {
            $scope.getConfigDataAsync(); 
        });

        $scope.getTableStyle = function () {
            var top = ($('.ngViewport').position() != undefined) ? $('.ngViewport').position().top : 0;
            var height = ($(window).height() - top) + 'px';
            return {
                'height': height
            };
        };

        $scope.updateLayout = function(){
            layoutPlugin.updateGridLayout();
        };

    }
 ]);

