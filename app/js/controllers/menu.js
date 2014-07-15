'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function($scope, Global, menuService, $timeout, $rootScope, $http, $location, $route) {

            $scope.global = Global;
            /*set contentType*/
$scope.global.url = "dashboard/my-website"
            $scope.templateUrl = function() {
                return "views/" + $scope.global.url + ".html";
            }
            /**/
            $scope.init = function() {
                console.log("fff")
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
            $scope.setCurrentTable = function(table, index, partType) {
                console.log(partType)
                if (partType == "table")
                    $scope.global.url = "tables"
                if (partType == "dashbboard")
                    $scope.global.url = "dashboard/my-website"

                $scope.curTable = index;
                $scope.global.currentTable = table;
                //$rootScope.$broadcast('loadData');
            }
            $scope.$on('load', function() {
                $scope.init();
            });

        }
    ])
