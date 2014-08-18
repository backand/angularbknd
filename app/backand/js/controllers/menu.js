'use strict';


angular.module('backAnd.controllers')
.controller('menuController', ['$scope', 'Global', '$compile', 'gridConfigService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function($scope, Global, $compile, gridConfigService, menuService, $timeout, $rootScope, $http, $location, $route) {

        $scope.global = Global;

        $scope.templateUrl = function() {
            if ($scope.global.url) {
                $location.path($scope.global.url);
                //return "backand/partials/" + $scope.global.url  + ".html";
            }
        }

        $scope.init = function () {

            if (!localStorage.getItem('Authorization')) {
                $location.path('/login');
            } else {
                $location.path('/');
                $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                $scope.loadPages();
            }
        }

        $scope.loadPages = function (workspaceId) {
            menuService.queryjsonp({ workspaceId: workspaceId },
                    function success(data) {
                        $scope.pages = data.workspace.pages;
                        $scope.currentWorkspace = data.workspace;
                        $scope.additionalWorkspaces = data.additionalWorkspaces;
                        $scope.setDefaultMenu();

                        $timeout(function () {
                            //adminLteInit();
                            $(window).trigger("appConfigCompleted", data);
                        });
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
        }

        $scope.setDefaultMenu = function () {
        }

        $scope.setCurrentMenuSelection = function (current, parent) {
            $scope.global.currentName = current.name;
            if (current.partType == "table") {
                $scope.global.url = "/grids";
                $scope.getConfigTable(current.partId);

            }
            else if (current.partType == "dashboard") {
                $scope.global.url = "/dashboard";
                $scope.global.currentTableID = current.partId;
            }
            else if (current.partType == "content") {
                $scope.global.url = "/content";
                $scope.global.currentTableID = current.partId;
            }
            $scope.curTable = current.index;

            $scope.setBreadcrumbs(current, parent);
        }
        
        $scope.setBreadcrumbs = function (current, parent) {
            $scope.breadcrumbs = [{ name: $scope.currentWorkspace.name }];
            if (parent)
                $scope.breadcrumbs.push(parent);
            $scope.breadcrumbs.push(current);
        }

        $scope.getConfigTable = function(table) {
            var configTable = {};
            // Request to get the field information about the table
            // This config call needs to be separated into a separate function
            // that is only called once
            gridConfigService.queryjsonp({
                table: table
                }, function(data) {
                    $scope.global.configTable = data;
                    $scope.global.currentTable = table;
                    var tableElementScope = $("ngback-grid").scope();  
                    $("ngback-grid").remove();
                    var html = '<ngback-grid table-name="global.currentTable"></ngback-grid>';
                    // Step 1: parse HTML into DOM element
                    var template = angular.element(html);
                    // Step 2: compile the template
                    var linkFn = $compile(template);
                    //Step 3: link the compiled template with the scope.
                    var element = linkFn($scope);
                    // Step 4: Append to DOM 
                    $(".right-side .ng-scope").append(element);
            });
        };

        $scope.$on('load', function() {
            $scope.init();
        });

}
])
