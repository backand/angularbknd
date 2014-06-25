'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', 'configService', '$rootScope',
        function($scope, Global, menuService, $timeout, $rootScope) {
            $scope.global = Global;
            $scope.init = function() {
                menuService.queryjsonp({
                    table: $scope.global.currentTable
                }, function(data) {
                    console.log(data);
                    $scope.pages = data.workspace.pages;
                    $timeout(function() {
                        adminLteInit();
                    });
                    // $scope.$evalAsync($scope.pages = data.workspace.pages);

                });
            }
            $scope.setCurrentTable = function(table) {
                $scope.global.currentTable = table;
                $rootScope.$broadcast('aa');
            }

        }
    ])
