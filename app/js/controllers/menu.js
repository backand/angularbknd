'use strict';


angular.module('backAnd.controllers')
.controller('menuController', ['$scope', 'Global', '$compile', 'configService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function($scope, Global, $compile, configService, menuService, $timeout, $rootScope, $http, $location, $route) {

        $scope.global = Global;

        $scope.templateUrl = function() {
            if ($scope.global.url)  {
                return "views/" + $scope.global.url + ".html";
            }
        }

        $scope.init = function() {

            if (!localStorage.getItem('Authorization')) {
                $location.path('/login');
            } else {
                $location.path('/');
                $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                menuService.queryjsonp({},
                    function success(data) {
                        $scope.pages = data.workspace.pages;

                        $timeout(function() {
                            adminLteInit();
                        });
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
            }
        }
        $scope.setCurrentTable = function(table,name, index, partType) {
            if (partType == "table")  {
                $scope.global.url = "tables"; 
                $scope.global.currentTableName = name;
                $scope.getConfigTable(table); 
                
          }      
          else if (partType == "dashboard")  {
            $scope.global.url = "dashboard/my-website";
            $scope.global.currentTableID = table;
        }
        $scope.curTable = index;


                //$rootScope.$broadcast('loadData');
        }
        $scope.getConfigTable = function(table) {
            var configTable = {};
            // Request to get the field information about the table
            // This config call needs to be separated into a separate function
            // that is only called once
            configService.queryjsonp({
            // Need to change this to handle multiple tables on the same page
                table: table
                }, function(data) {
                    configTable.config = data.fields;
                    configTable.columns = [];
                    configTable.pagingOptions = {}
                    configTable.pagingOptions.pageSize = data.design.rowsperPage;
                    // We are adding columns and its custom filter to the table based on type
                    // this will also need to be changed to handle multiple tables on the same page
                    angular.forEach(configTable.config, function (col) {
                        if (!col.donotDisplayinGrid && col.type != 'MultiSelect') {
                            configTable.columns.push({
                                cellFilter: col.type,
                                displayName: col.displayName,
                                width: col.columnWidth,
                                cellTemplate: $scope.getCellTemplate(col, data)
                            });
                        }
                    });
                    
                    $scope.global.configTable = configTable;
                    $scope.global.currentTable = table;

                     
                    var tableElementScope = $("ngback-table").scope();
                    if(tableElementScope) {
                        //tableElementScope.$destroy();
                    }
                    $("ngback-table").remove();  
                    var html = '<ngback-table table-name="global.currentTable"></ngback-table>';  
                       // Step 1: parse HTML into DOM element
                    var template = angular.element(html);
                       // Step 2: compile the template
                    var linkFn = $compile(template);
                       //Step 3: link the compiled template with the scope.
                    var element = linkFn($scope);
                    $(".right-side .ng-scope").append(element);
            });
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

        $scope.$on('load', function() {
            $scope.init();
        });

}
])
