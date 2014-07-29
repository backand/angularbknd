'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function($scope, Global, menuService, $timeout, $rootScope, $http, $location, $route) {

            $scope.global = Global;

            $scope.templateUrl = function() {
                if ($scope.global.url)
                    return "views/" + $scope.global.url + ".html";
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
                if (partType == "table")
                    $scope.global.url = "tables";
                if (partType == "dashboard")
                    $scope.global.url = "dashboard/my-website";
                $scope.curTable = index;
                $scope.global.currentTableID = table;
                $scope.global.currentTable = table;
                $scope.global.currentTableName = name;
                //$rootScope.$broadcast('loadData');
            }

            $scope.$on('load', function() {
                $scope.init();
            });

        }
    ])
