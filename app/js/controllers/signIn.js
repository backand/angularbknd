'use strict';


angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global',
        function($scope, Global) {
            $scope.global = Global;
            $scope.init = function() {

            }
            $scope.authentication = function() {
                console.log(backand.security.authentication)
                backand.security.authentication.login($scope.user, $scope.password, $scope.appName)
            }

        }
    ])
