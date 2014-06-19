'use strict';


angular.module('backAnd.controllers', [])
    .controller('menuController', ['$scope', 'menuService', '$timeout',
        function($scope, menuService, $timeout) {
            $scope.init = function() {
                menuService.queryjsonp({
                    table: 'test1'
                }, function(data) {
                    console.log(data);
                    $scope.pages = data.workspace.pages;
                    $timeout(function() {
                        adminLteInit();
                    });
                    // $scope.$evalAsync($scope.pages = data.workspace.pages);

                });
            }

        }
    ])
