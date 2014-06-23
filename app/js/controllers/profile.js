'use strict';


angular.module('backAnd.controllers')
    .controller('profileController', ['$scope', 'menuService',
        function($scope, menuService) {
            $scope.init = function() {
                menuService.queryjsonp({
                    table: 'test1'
                }, function(data) {
                    $scope.profile = data.company;
                     console.log($scope.profile);
                });
            }

        }
    ])
