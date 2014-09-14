'use strict';

var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('dynamicGridController', ['$scope', 
    function ($scope) {

        $scope.viewName2 = 'Employees';
        
    }
])
