'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope','$http','$location',
        function($scope, Global, menuService, $timeout, $rootScope, $http ,$location) {

           // $http.defaults.headers.common['Authorization'] = 'bearer dwxEjQkFM_Yv6XsBmeoHpAg6QLGNn_n7jL8ZRRpdKDOMYyJ3IkWiaUaGk_6r4KGBnChslSnO4saK92QfD78MQ5_F7Xb-i0ltmEKp9ztJtb4zy83bUzpsI0TWTrX-k9wT_Locks7-d3le_qORsVaL9Yc-5T8kZK43jE8-v4h5B98Wzx_lY7FsEwQN1D4TLtn3e-GH7d1BuRlIfuTPc90RNagA05BikIiWYuHYZdvPHeXOCRWDa6O2Y7uZO4YWZyU33p_CFiANMdouwHb9cg-ODw'
           
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
