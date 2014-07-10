'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function($scope, Global, menuService, $timeout, $rootScope, $http, $location, $route) {

            $scope.global = Global;
            $scope.init = function() {
                /*                localStorage.clear();
                 */
                if (!localStorage.getItem('Authorization'))
                    $location.path('/login');
                else {
                    alert("ddd")
                    $location.url();
                    $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                    menuService.queryjsonp({
                        table: $scope.global.currentTable
                    }, function(data) {
                        $scope.pages = data.workspace.pages;

                        $timeout(function() {
                            adminLteInit();
                        });

                    });
                }

            }
            $scope.setCurrentTable = function(table, index) {
                $scope.curTable = index;
                $scope.global.currentTable = table;
                //$rootScope.$broadcast('loadData');
            }
             $scope.$on('load', function() {
                $scope.init();
            });

        }
    ])
