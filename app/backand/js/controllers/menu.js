'use strict';

/**
 * @ngdoc overview
 * @name controller.menuController
 */
angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', '$compile', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function ($scope, Global, $compile, menuService, $timeout, $rootScope, $http, $location) {

            $scope.global = Global;


            /**
             * @ngdoc function
             * @name loadMenu
             * @methodOf backand.js.controllers:menuController
             * @description loads the menu with api
             * @param {object} workspaceId, required, each workspace have a different menu
             */
            $scope.loadMenu = function (workspaceId) {
                menuService.queryjsonp({ workspaceId: workspaceId },
                    function success(data) {
                        $scope.currentWorkspace = data.workspace;
                        //$scope.pages = data.workspace.pages;
                        //$scope.currentWorkspace = data.workspace;
                        $scope.additionalWorkspaces = data.additionalWorkspaces;

                        $location.search(
                            'workspaceId', data.workspace.id
                        );

                        $scope.$broadcast('appConfigCompleted', data);

                        $timeout(function () {
                            $(window).trigger("appConfigCompleted", data);
                        });

                        if (!$location.search().viewName && !$location.search().dashboardId && !$location.search().contentId && $scope.currentWorkspace.homePage) {
                            var homePage = $scope.getHomePage($scope.currentWorkspace, $scope.currentWorkspace.homePage);

                            if (homePage)
                                $scope.setCurrentMenuSelection(homePage);
                        }
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
            }

            $scope.getHomePage = function (parent, id) {
                for (var i = 0; i < parent.pages.length; i++) {
                    var page = parent.pages[i];
                    if (page.id == id)
                        return page;
                    else if (page.pages)
                        return $scope.getHomePage(page, id);
                }
                return null;
            }

            /**
             * @ngdoc function
             * @name setCurrentMenuSelection
             * @methodOf backand.js.controllers:menuController
             * @description set the selected menu and opens the selected part
             * @param {object} current, required, current selected menu
             * @param {object} parent, optional, parent selected menu for breadcrumbs
             */
            $scope.setCurrentMenuSelection = function (current, parent) {
                if (current.partType == "table") {
                    $location.search({
                        viewName: current.partId,
                        workspaceId: $scope.currentWorkspace.id
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

            /**
             * @ngdoc function
             * @name setBreadcrumbs
             * @methodOf backand.js.controllers:menuController
             * @description set the breadcrumbs
             * @param {object} current, required, current selected menu
             * @param {object} parent, optional, parent selected menu
             */
            $scope.setBreadcrumbs = function (current, parent) {
                $scope.breadcrumbs = [
                    { name: $scope.currentWorkspace.name }
                ];
                if (parent)
                    $scope.breadcrumbs.push(parent);
                $scope.breadcrumbs.push(current);
            }

            /**
             * @ngdoc function
             * @name init
             * @methodOf backand.js.controllers:menuController
             * @description initiate the configuration of the menu
             */
            $scope.init = function () {

                if (!localStorage.getItem('Authorization')) {
                    $location.path('/login');
                } else {
                    if ($location.$$path == "/login") {
                        $location.path('/');
                    }
                    $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                    backand.security.authentication.token = $http.defaults.headers.common['Authorization'];

                    var workspaceId = null;
                    var search = $location.search();
                    if (search && search.workspaceId)
                        workspaceId = search.workspaceId;

                    $scope.loadMenu(workspaceId);
                }
            }


        }


    ])
