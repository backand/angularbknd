"use strict";


angular.module('backAnd.controllers')
.controller('gridController', ['$scope', 'Global', 'gridService', 'gridDeleteItemService', 'gridConfigService', '$http', '$location', '$route', '$sce','$compile', '$window',
    function ($scope, Global, gridService, gridDeleteItemService, gridConfigService, $http, $location, $route, $sce, $compile, $window) {

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
             $window.alert("Coming soon..");
             return;

            //$window.alert("editSelected"); 
            if ($scope.mySelections != null && $scope.mySelections.length == 1) {
                $location.search({
                    id: $scope.mySelections[0].__metadata.id,
                    table: $scope.tableName
                });
                $location.path('/forms');
            }
        };
        $scope.addRow = function () {
            $window.alert("Coming soon..");
            return;
        }

        $scope.deleteSelected = function () {
            var messages = {
                pleaseSelectRow: "Please select a row.",
                confirm: "Are you sure that you want to delete the selected row?",
                failure: "Failed to delete the row. Please contact your system administrator.",
                idMissing: "id is missing.",
                tableMissing: "table is missing.",
            };

            if (!$scope.isSingleRowSelected()) {
                $window.alert(messages.pleaseSelectRow);
                return;
            }

            if (!confirm(messages.confirm)) {
                return;
            }

            var id = $scope.getSelectedRowId();

            if (!id) {
                console.error(messages.idMissing)
                $window.alert(messages.failure);
                return;
            }

            var table = $scope.tableName;
            if (!table) {
                console.error(messages.tableMissing)
                $window.alert(messages.failure);
                return;
            }

            var params = {
                id: id,
                table: table
            };

            try {
                gridDeleteItemService.queryjsonp(params, function (data) {
                    $scope.getData();
                },
                function (error) {
                    if (error.status == 500) {
                        console.error(error.data, error);
                        $window.alert(messages.failure);
                    }
                    else {
                        console.warn(error.data, error);
                        $window.alert(error.data);
                    }
                });
            }
            catch (err) {
                console.error(err.description)
                $window.alert(messages.failure);
            }
        }

        $scope.isSingleRowSelected = function () {
            return ($scope.mySelections != null && $scope.mySelections.length == 1);
        }

        $scope.getSelectedRowId = function () {
            if (!$scope.isSingleRowSelected())
                return null;

            return $scope.mySelections[0].__metadata.id;
        }

        $scope.totalServerItems = 0;

        $scope.pagingOptions = {
            pageSizes: [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000],
            pageSize: 0,
            currentPage: 1,
        };
         var layoutPlugin = new ngGridLayoutPlugin();

        //Toolbar setting
        $scope.showToolbar = Global.configTable && Global.configTable.toolbarSettings.hideToolbar ? !Global.configTable.toolbarSettings.hideToolbar : true;
        $scope.showSearch = Global.configTable && Global.configTable.design.hideSearchBox ? !Global.configTable.design.hideSearchBox : true;

        //Grid Settings
        $scope.sortOptions = {};                           
        $scope.mySelections = [];

        $scope.dataTable = {
            columnDefs: 'columns',
            data: 'dataFill',
            selectedItems: $scope.mySelections,
            enablePaging: true,
            showFooter: Global.configTable && Global.configTable.toolbarSettings.hideFooter ? !Global.configTable.toolbarSettings.hideFooter : true,
            useExternalSorting: true,
            sortOptions: $scope.sortOptions,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            rowHeight: Global.configTable && Global.configTable.design.rowHeightInPixels ? Global.configTable.design.rowHeightInPixels : 30, 
            headerRowHeight: 30,
            footerRowHeight: 47,
            multiSelect: false,
            enableColumnResize: true,
        };

        // This is the call to get the data based on the table
        // and receives arguments of page size and page number
        // should look into creating a table directive that receives 
        // arguments eg table name, and paging information
        $scope.myHeaderCellTemplate = function (col, view) {
            return '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
                               '<div ng-click="myCustomSort(col)"  class="ngHeaderText" ng-style="{\'text-align\': \'' + $scope.getTextAlignment(col, view) + '\'}">{{col.displayName}}</div>' +
                               '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
                               '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
                               '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
                               '</div>' +
                               '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
        }

        // Grid footer custom style
        $scope.dataTable.footerTemplate =
            '<div class="ngFooterPanel" ng-show="showFooter" style="height:{{footerRowHeight}}px;">' +
                '<div class="col-xs-2 text-left" style="margin-top: 12px;">' +
                    '<span>{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span>' +
                '</div>' +
                '<div class="col-xs-2 text-right" style="margin-top: 6px;">' +
                    '<span>{{i18n.ngPageSizeLabel}}&nbsp;</span>' +
                    '<select class="ngBackGridSelect" ng-model="pagingOptions.pageSize" >' +
                        '<option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>' +
                    '</select>' +
                '</div>' +
                '<div class="col-xs-7 text-right">' +
                    '<pagination style="margin-top:6px;" total-items="maxRows()" ng-model="pagingOptions.currentPage" max-size="5" class="pagination" boundary-links="true" rotate="false" items-per-page="pagingOptions.pageSize"></pagination>' +
                '</div>' +
                '<div class="col-xs-1 text-right" style="margin-top: 12px;">' +
                    '<span>Page: {{pagingOptions.currentPage}} / {{maxPages()}}</span>' +
                '</div>' +
            '</div>';

        $scope.getTextAlignment = function (col, view) {
            if (col.grid.textAlignment == "inherit") {
                if (col.type == "Numeric" || col.type == "DateTime")
                    return "right";
                else return "left";
            }
            else return col.grid.textAlignment;
        }

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
                        headerCellTemplate: $scope.myHeaderCellTemplate(col, Global.configTable),
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
                    return '<p ng-bind-html="renderHtml(\'{{row.entity[\'' + col.name + '\']}}\')"></p>'; 
                case 'LongText':
                    return '<div class="ngCellText" style="white-space: normal;"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                case 'Url':
                    return '<div class="ngCellText" ng-style="{\'text-align\': \'' + $scope.getTextAlignment(col, view) + '\'}"><p ng-bind-html="renderUrl(\'{{row.entity[\'' + col.name + '\']}}\')"></p></div>';
                default:
                    return '<div class="ngCellText" ng-style="{\'text-align\': \'' + $scope.getTextAlignment(col, view) + '\'}"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
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
            gridService.queryjsonp({
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
            var top = ($('.ngViewport').offset() != undefined) ? $('.ngViewport').offset().top : 0;
            var bottom = 0;
            if ($('.ngFooterPanel').height() != undefined) {
                bottom = $('.ngFooterPanel').height();
            }
            var height = ($(window).height() - top - bottom) + 'px';
            return {
                'height': height
            };
        };

        $scope.updateLayout = function(){
            layoutPlugin.updateGridLayout();
        };


        
    }
 ]);

