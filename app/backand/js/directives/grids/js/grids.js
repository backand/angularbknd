/**
 * @ngdoc overview
 * @name directive.bkndNgGrid
 */
angular.module('backAnd.directives')
    .directive('bkndNgGrid', ['Global', 'dataListService', 'dataItemService', 'configService', '$filter', 'filterService', '$location', '$route', '$sce', '$compile', '$window',
        function (Global, dataListService, dataItemService, configService, $filter, filterService, $location, $route, $sce, $compile, $window) {
        /**
         * @ngdoc directive
         * @name directive.bkndNgGrid
         * @description grid element, ng-grid wrapper that binds to backand rest api
         * @param {string} viewName, view or table from the database
         * @param {object} options, ng-grid options
         * @param {object} filterOptions, backand rest api filter options: {fieldName, operator, value}
         * @param {string} inputStyle, optional, optional css class
         * @returns {object} directive
         */
        return {
            restrict: 'E',
            scope: {
                viewName: '=',
                options: '=',
                filterOptions: '=',
                inputStyle: '=',
                buttonGroups: '=',
                disableEditOnDblClick: '='
            },
            replace: false,
            templateUrl: ($(window).width() > 768) ? 'backand/js/directives/grids/partials/grid.html' : 'backand/js/directives/grids/partials/grid-mobile.html',

            /**
             * @name link
             * @methodOf directive.bkndNgGrid
             * @description manage the scope of the bkndNgGrid directive
             * @param {object} scope, required, the scope of the directive
             * @param {object} el, required, the element of the directive
             * @param {object} attrs, required, the attributes of the directive
             */
            link: function (scope) {
                scope.global = Global;
                scope.isMobile = $(window).width() < 768;
                /**
                 * @ngdoc function
                 * @name viewName
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Get the new Backand's view name and re-load the configraion
                 *              and data
                 */
                scope.$watch('viewName', function () {
                    if (scope.viewName) {
                        scope.viewNameId = scope.viewName;
                        scope.buildNewGrid(scope.viewNameId);
                        //scope.getData();

                    }
                    else if ($location.$$path == '/grids' && $location.search().viewName) {
                        scope.viewNameId = $location.search().viewName;
                        scope.buildNewGrid(scope.viewNameId);
                        //scope.getData();
                    }
                });

                 /**
                 * @ngdoc function
                 * @name buildNewGrid
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Due to limitations in ng-grid, in order to reload the settings,
                 *              we must remove it and rebuild it.
                 *              Configuration loaded async
                 * @param {string} viewName reference to view name
                 */
                scope.buildNewGrid = function (viewName) {
                    scope.isLoad = true;
                    var configTable = {};
                    //Read the View's configuration
                    configService.read({
                        dataType: "view",
                        id: viewName
                    }, function (data) {
                        scope.$emit('gridConfigCompleted', data);

                        scope.configTable = data;
                        var tableElementScope = $("#bknd-grid_" + scope.viewNameId + " .ngGrid").scope();
                        if (tableElementScope) {
                            $("#bknd-grid_" + scope.viewNameId + " .ngGrid").remove();
                        }
                        var inputStyle = (scope.inputStyle) ? angular.toJson(scope.inputStyle).replace(/\"/gi, "'") : 'getTableStyle()';
                        var html = '<div ng-if="dataTable" ng-style="' + inputStyle + '" ng-grid="dataTable"></div>';
                        // Step 1: parse HTML into DOM element
                        var template = angular.element(html);
                        // Step 2: compile the template
                        var linkFn = $compile(template);
                        //Step 3: link the compiled template with the scope.
                        var element = linkFn(scope);
                        // Step 4: Append to DOM
                        $("#bknd-grid_" + scope.viewNameId).append(element);

                        scope.setNGGridConfiguration();
                    });
                };

                scope.setNGGridConfiguration = function () {
                    //Grid Settings


                    scope.dataTable = {};
                    scope.columns = [];
                    scope.sortOptions = {};
                    scope.mySelections = [];
                    scope.totalServerItems = 0;


                    scope.pagingOptions = {
                        pageSizes: [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000],
                        pageSize: scope.configTable.design.rowsperPage,
                        currentPage: 1
                    };

                    scope.dataTable = {
                        columnDefs: 'columns',
                        data: 'dataFill',
                        selectedItems: scope.mySelections,
                        enablePaging: true,
                        showFooter: scope.configTable && scope.configTable.toolbarSettings.hideFooter ? !scope.configTable.toolbarSettings.hideFooter : true,
                        useExternalSorting: true,
                        sortOptions: scope.sortOptions,
                        totalServerItems: 'totalServerItems',
                        pagingOptions: scope.pagingOptions,
                        rowHeight: scope.configTable && scope.configTable.design.rowHeightInPixels ? scope.configTable.design.rowHeightInPixels : 30,
                        headerRowHeight: 30,
                        footerRowHeight: 47,
                        multiSelect: false,
                        enableColumnResize: true,
                        rowTemplate: '<div ' + (scope.disableEditOnDblClick ? '' : 'ng-dblclick="editSelected(row)" ') + 'ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>',
                        // grid edititing
                        //enableCellEditOnFocus: true,
                    };
                    if (scope.isMobile)
                        scope.dataTable.plugins = [new ngGridFlexibleHeightPlugin()];

                    //Grid caption
                    scope.global.currentName = scope.configTable.captionText;
                    //Toolbar setting
                    scope.showToolbar = scope.configTable && scope.configTable.toolbarSettings ? !scope.configTable.toolbarSettings.hideToolbar : true;
                    scope.showSearch = scope.configTable && scope.configTable.design ? !scope.configTable.design.hideSearchBox : true;
                    scope.showAdd = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowAdd : true;
                    scope.showEdit = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowEdit : true;
                    scope.showDelete = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowDelete : true;
                    scope.showFilter = scope.configTable && !scope.configTable.hideFilter;
                    scope.collapseFilter = scope.configTable && !scope.configTable.collapseFilter;
                    
                    scope.filterToolbarOptionsOutput = null;

                    if (scope.showFilter) {
                        filterService.getFilterOptions(scope.viewNameId, function (data) {
                            scope.$emit('filterToolbarOptionsInput', data, scope);
                            scope.filterToolbarOptions = data;
                        });
                    }

                    scope.filterScope = null;

                    scope.$on('onfilter', function (event, filterToolbarOptions, filterScope) {
                        scope.filterScope = filterScope;
                        scope.filterToolbarOptionsOutput = filterToolbarOptions;
                        scope.$emit('filterToolbarOptionsOutput', scope.filterToolbarOptionsOutput, scope, filterScope);

                        scope.getData();
                    });

                    // Grid footer custom style
                    if (!scope.isMobile)
                        scope.dataTable.footerTemplate =
                            '<div class="ngFooterPanel" ng-show="showFooter" style="height:{{footerRowHeight}}px;">' +
                            '<div class="col-xs-3 text-left" style="margin-top: 12px;">' +
                            '<span>Showing {{pagingOptions.pageSize * (pagingOptions.currentPage-1) +1}} to {{footerPageMax(pagingOptions.pageSize,pagingOptions.currentPage,maxRows())}} of {{maxRows()}} rows</span>' +
                            '</div>' +
                            '<div class="col-xs-3 text-right" style="margin-top: 12px;">' +
                            '<span>{{i18n.ngPageSizeLabel}}&nbsp;</span>' +
                            '<select class="bkndGridSelect" ng-model="pagingOptions.pageSize" >' +
                            '<option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>' +
                            '</select>' +
                            '</div>' +
                            '<div class="col-xs-6 text-right">' +
                            '<pagination style="margin-top:6px;" total-items="maxRows()" ng-model="pagingOptions.currentPage" max-size="5" class="pagination-md" boundary-links="true" rotate="false" items-per-page="pagingOptions.pageSize"></pagination>' +
                            '</div>' +
                            '</div>';
                    else
                        scope.dataTable.footerTemplate =
                            '<div class="ngFooterPanel" ng-show="showFooter" style="height:{{footerRowHeight}}px;">' +
                            '<div class="col-xs-6 text-left" style="margin-top: 12px;">' +
                            '<span>{{pagingOptions.pageSize * (pagingOptions.currentPage-1) +1}} to {{footerPageMax(pagingOptions.pageSize,pagingOptions.currentPage,maxRows())}} of {{maxRows()}} rows</span>' +
                            '</div>' +
                            '<div class="col-xs-6 text-right">' +
                            '<pagination style="margin-top:6px;" total-items="maxRows()" ng-model="pagingOptions.currentPage" max-size="0" class="pagination pagination-sm" boundary-links="false" rotate="false" items-per-page="pagingOptions.pageSize"></pagination>' +
                            '</div>' +
                            '</div>';

                    scope.footerPageMax = function (pageSize, currentPage, max) {
                        return Math.min((pageSize * currentPage), max);
                    };

                    //update the configuration
                    scope.newButton = scope.configTable.description.newButtonName;
                    scope.editButton = scope.configTable.description.editButtonName;
                    scope.deleteButton = scope.configTable.description.deleteButtonName;
                    scope.setToolbar();

                    // We are adding columns and its custom filter to the table based on type
                    // this will also need to be changed to handle multiple tables on the same page
                    angular.forEach(scope.configTable.fields, function (col) {
                        if (!col.donotDisplayinGrid) {
                            scope.columns.push({
                                headerCellTemplate: scope.myHeaderCellTemplate(col, scope.configTable),
                                cellFilter: col.type,
                                displayName: col.displayName,
                                width: col.columnWidth,
                                cellTemplate: scope.getCellTemplate(col, scope.configTable),
                                //// grid edititing
                                //enableCellEditOnFocus: true,
                                //editableCellTemplate: scope.getEditableCellTemplate(col, scope.configTable),
                            });
                        }
                    });

                };

                scope.setToolbar = function () {
                    if (scope.buttonGroups)
                        scope.btnGroups = scope.buttonGroups;
                    else
                        scope.btnGroups = [
                            { buttons: [
                                { text: scope.newButton, iconClass: "glyphicon-plus", callback: scope.addRow },
                                { text: scope.editButton, iconClass: "glyphicon-pencil", callback: scope.editSelected },
                                { text: scope.deleteButton, iconClass: "glyphicon-trash", callback: scope.deleteSelected }
                            ] }
                        ];
                    scope.$emit('setToolbarCompleted', scope.btnGroups, scope);

                };

                scope.showClearFilter = false;

                /**
                 * @ngdoc function
                 * @name getData
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Reads the data from the API and populate the grid
                 * @param {string} searchText The value of the filter search text box
                 */
                scope.getData = function (searchText) {
                    scope.isLoad = true;
                    if (searchText == 'undefined') searchText == null;
                    // We are requesting data for the specific page of the table.
                    var sortString = '[' + JSON.stringify(scope.sortOptions) + ']';
                    // Read the filter either from attribute or query string
                    var filterString = '';
                    if (scope.filterOptions)
                        filterString = scope.filterOptions;
                    else if ($location.search().filterOptions)
                        filterString = $location.search().filterOptions;
                    else
                        filterString = scope.filterToolbarOptionsOutput;

                    if (!(typeof filterString == 'string' || filterString instanceof String)) {// is not string
                        filterString = JSON.stringify(filterString);
                    }
                    //Read from the service configuration
                    dataListService.read({
                        dataType: "view",
                        viewName: scope.viewNameId,
                        pageSize: scope.pagingOptions.pageSize,
                        pageNumber: scope.pagingOptions.currentPage,
                        filter: filterString,
                        sort: sortString,
                        search: searchText
                    }, function (largeLoad) {
                        // We have received table data and add the data to the scope
                        scope.$emit('gridDataCompleted', { config: scope.configTable, data: largeLoad });

                        scope.dataFill = largeLoad.data;
                        scope.totalServerItems = largeLoad.totalRows;
                        scope.isLoad = false;

                        scope.showClearFilter = searchText || (scope.filterToolbarOptionsOutput && scope.filterToolbarOptionsOutput.length);
                            
                    });
                };


                scope.filterKeyPress = function (keyEvent) {
                    if (keyEvent.which === 13)
                        scope.activateFilter();
                };
                scope.activateFilter = function () {
                    var searchText = scope.searchText || null;
                    scope.getData(searchText);
                };
                scope.deactivateFilter = function () {
                    scope.searchText = '';
                    if (scope.filterScope)
                        scope.filterScope.reset();

                    scope.getData('');
                };

                scope.editSelected = function () {

                    if (!scope.isSingleRowSelected()) {
                        $window.alert(messages.pleaseSelectRow);
                        return;
                    }

                    if (scope.mySelections != null && scope.mySelections.length == 1) {
                        $location.search({
                            rowId: scope.mySelections[0].__metadata.id,
                            viewName: scope.viewNameId
                        });
                        $location.path('/forms');
                    }
                };

                scope.addRow = function () {

                    var defaultFieldsValues = null;

                    if (scope.filterOptions) {
                        defaultFieldsValues = [];
                        var filterOptions = JSON.parse(scope.filterOptions);

                        angular.forEach(filterOptions, function (filterOption) {
                            var defaultFieldValue = new backand.defaultFieldValue(filterOption.fieldName, filterOption.value);
                            defaultFieldsValues.push(defaultFieldValue);
                        });
                    }

                    $location.search({
                        viewName: scope.viewNameId,
                        defaultFieldsValues: angular.toJson(defaultFieldsValues)
                    });

                    $location.path('/forms');
                };

                // todo: take it out of here! (check out ngTranslate or angular get-text modulse)
                var messages = {
                    pleaseSelectRow: "Please select a row.",
                    confirm: "Are you sure that you want to delete the selected row?",
                    failure: "Failed to delete the row. Please contact your system administrator.",
                    idMissing: "id is missing.",
                    tableMissing: "table is missing."
                };

                scope.deleteSelected = function () {

                    if (!scope.isSingleRowSelected()) {
                        $window.alert(messages.pleaseSelectRow);
                        return;
                    }

                    if (!confirm(messages.confirm)) {
                        return;
                    }

                    var id = scope.getSelectedRowId();

                    if (!id) {
                        console.error(messages.idMissing)
                        $window.alert(messages.failure);
                        return;
                    }

                    var viewName = scope.viewNameId;
                    if (!viewName) {
                        console.error(messages.tableMissing)
                        $window.alert(messages.failure);
                        return;
                    }

                    var params = {
                        dataType: "view",
                        id: id,
                        viewName: viewName
                    };

                    try {
                        dataItemService.delete(params, function (data) {
                                scope.getData();
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
                };

                scope.isSingleRowSelected = function () {
                    return (scope.mySelections != null && scope.mySelections.length == 1);
                };

                scope.getSelectedRowId = function () {
                    if (!scope.isSingleRowSelected())
                        return null;

                    return scope.mySelections[0].__metadata.id;
                };


                // This is the call to get the data based on the table
                // and receives arguments of page size and page number
                // should look into creating a table directive that receives
                // arguments eg table name, and paging information
                scope.myHeaderCellTemplate = function (col, view) {
                    return '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
                        '<div ng-click="myCustomSort(col)"  class="ngHeaderText" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}">{{col.displayName}}</div>' +
                        '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
                        '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
                        '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
                        '</div>' +
                        '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
                }


                scope.getTextAlignment = function (col, view) {
                    if (col.grid.textAlignment == "inherit") {
                        if (col.type == "Numeric" || col.type == "DateTime")
                            return "right";
                        else return "left";
                    }
                    else return col.grid.textAlignment;
                }

                scope.myCustomSort = function (col) {
                    if (!col.sortDirection || col.sortDirection == "asc")
                        col.sortDirection = "desc";
                    else
                        col.sortDirection = "asc";
                    scope.sortOptions = {
                        fieldName: col.displayName,
                        order: col.sortDirection
                    };
                    scope.getData();
                }

                scope.getCellTemplate = function (col, view) {
                    var cellTemplate = '';
                    switch (col.type) {
                        case 'Image':
                            var height = (view.design.rowHeightInPixels != '') ? view.design.rowHeightInPixels + 'px' : 'auto';
                            var width = (height != 'auto') ? 'auto' : col.columnWidth + 'px';
                            cellTemplate = '<div class="ngCellText" ng-class=""><span ng-cell-text><img ng-src="' + col.urlPrefix + '/{{row.entity[\'' + col.name + '\']}}" width="' + width + '" height="' + height + '" lazy-src/></span></div>';
                            break;
                        case 'Html':
                            cellTemplate = '<p ng-bind-html="renderHtml(\'{{row.entity[\'' + col.name + '\']}}\')"></p>';
                            break;
                        case 'LongText':
                            cellTemplate = '<div class="ngCellText" ng-class="" style="white-space: normal;"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                            break;
                        case 'Url':
                            cellTemplate = '<div class="ngCellText" ng-class="" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}"><p ng-bind-html="renderUrl(\'{{row.entity[\'' + col.name + '\']}}\')"></p></div>';
                            break;
                        case 'MultiSelect':
                            cellTemplate = '<div class="ngCellText" ng-class="" style="white-space: normal;"><a href ng-click="renderSubGridUrl(\'' + col.name + '\',row.entity.__metadata.id)">' + col.displayName + '</a></div>';
                            break;
                        default:
                            cellTemplate = '<div class="ngCellText" ng-class="" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                            break;
                    }

                    var colAndCellTemplate = { col: col, cellTemplate: cellTemplate };
                    scope.$emit('setCellTemplate', colAndCellTemplate);

                    return colAndCellTemplate.cellTemplate;
                };

                scope.renderHtml = function (html_code) {
                    return $sce.trustAsHtml(html_code);
                };

                scope.renderUrl = function (value) {
                    var html = '';
                    if (value != '') {
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

                scope.renderSubGridUrl = function (value, id) {
                    var field = $filter('filter')(scope.configTable.fields, function (f) {
                        return f.name === value;
                    })[0];
                    if (field) {
                        var filterItem = new backand.filter.item(field.relatedParentFieldName, backand.filter.operator.relation.in, id);

                        $location.search({
                            viewName: field.relatedViewName,
                            filterOptions: angular.toJson([filterItem])
                        });
                        $location.path('/grids');
                    }
                }

                scope.$watch('pagingOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.getData();
                    }
                }, true);

                scope.$watch('filterOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.getData();
                    }
                }, true);

                scope.getTableStyle = function () {
                    var top = ($('.ngViewport').offset() != undefined) ? $('.ngViewport').offset().top : 0;
                    var bottom = 0;
                    if ($('.ngFooterPanel').height() != undefined) {
                        bottom = $('.ngFooterPanel').height();
                    }

                    var height = ($(window).height() - top - bottom);
                    if (scope.collapseFilter) {
                        height += -1;
                    }
                    height += 'px';

                    return {
                        'height': height
                    };
                };

                //scope.fixHorizontalScroll = false;
                //scope.$on('ngGridEventData', function (newColumns) {
                //    if (!scope.fixHorizontalScroll) {
                //        setTimeout(function () {
                //            if (!scope.fixHorizontalScroll) {
                //                var colCount = newColumns.targetScope.columns.length;
                //                var lastCells = $('.' + newColumns.targetScope.gridId + ' .colt' + (colCount - 1));
                //                if (lastCells.length > 1) {
                //                    scope.fixHorizontalScroll = true;
                //                    lastCells.each(function () {
                //                        var lastCell = $(this);
                //                        lastCell.width(lastCell.width() - 18);
                //                    })
                //                }
                //            }
                //        }, 1);

                //    }

                //});

            }
        }
            ;
    }])
    .
    directive('ngBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {
                scope.$apply(attrs.ngBlur);
            });
        };
    });