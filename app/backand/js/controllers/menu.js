'use strict';


angular.module('backAnd.controllers')
.controller('menuController', ['$scope', 'Global', '$compile', 'gridConfigService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function($scope, Global, $compile, gridConfigService, menuService, $timeout, $rootScope, $http, $location, $route) {

        $scope.global = Global;

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
                //$scope.getConfigTable(current.partId);
                $scope.global.currentTableID = current.partId;
                $location.path("/grids");
            }
            else if (current.partType == "dashboard") {
                $scope.global.currentTableID = current.partId;
                $location.path("/dashboard");
            }
            else if (current.partType == "content") {
                $scope.global.currentTableID = current.partId;
                $location.path("/content");
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

        $scope.$on('load', function() {
            $scope.init();
        });

}
])
