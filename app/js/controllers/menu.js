'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope','$http','$location',
        function($scope, Global, menuService, $timeout, $rootScope, $http ,$location) {

            $http.defaults.headers.common['Authorization'] = 'bearer LyhMUueWnZAr3lpGSEp9zr6yaol21QK7b1LvPr_MT_eiUyh20wMTBX26TNzBPdVp1DvrQE9LooHBcBuVQARYQGM43ajAFeeqxLNCe53Xml2aJMSTlk905oxXW0ujZHyIYWVpbckehJ3QjBSJEvSJjBhKDFCsnfa5E6xP74uV1iEVxvQ_KxmJZAzq_OHV2KBOFieVORdhpuBNm42CNCGD2wW0Ztwd-7YfD64aEaHj3Bqdv4AVB6_dQrW70KK9LZsQ';
          /*  alert($scope.authentication)*/
            //$location.path("/login");
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
