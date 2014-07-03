'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope',
        function($scope, Global, menuService, $timeout, $rootScope) {
            $scope.global = Global;
            $scope.init = function() {
                menuService.queryjsonp({
                    table: $scope.global.currentTable
                }, function(data) {
                    $scope.pages = data.workspace.pages;

                    $timeout(function() {
                        adminLteInit();
                    });
                   
                });
            }
            $scope.setCurrentTable = function(table, index) {
                $scope.curTable = index;
                $scope.global.currentTable = table;
                //$rootScope.$broadcast('loadData');
            }

        }
    ])
