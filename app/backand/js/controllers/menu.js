'use strict';


angular.module('backAnd.controllers')
.controller('menuController', ['$scope', 'Global', '$compile', 'gridConfigService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function($scope, Global, $compile, gridConfigService, menuService, $timeout, $rootScope, $http, $location, $route) {

        $scope.global = Global;

        $scope.init = function () {

            if (!localStorage.getItem('Authorization')) {
                $location.path('/login');
            } else {
                if ($location.$$path == "/login") {
                    $location.path('/');
                }
                $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                backand.security.authentication.token = $http.defaults.headers.common['Authorization'];
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

                        $scope.$broadcast('appConfigCompleted', data);

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
            if (current.partType == "table") {
                $location.search({
                    viewName: current.partId
                });
                $location.path("/grids");
            }
            else if (current.partType == "dashboard") {
                $location.search({
                    dashboardId: current.partId
                });
                $location.path("/dashboard");
            }
            else if (current.partType == "content") {
                $location.search({
                    contentId: current.partId
                });
                $location.path("/content");
            }
            $scope.curTable = current.index;

            $scope.setBreadcrumbs(current, parent);

            $scope.$broadcast('menuItemSelected', current);

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
