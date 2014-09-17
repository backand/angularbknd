'use strict';

var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('dynamicGridController', ['$scope', 
    function ($scope) {

        $scope.viewName = 'Customers';
        $scope.inputStyle = { 'height': 300 };
    }
])
backAndControllers.controller('filterController', ['$scope',
    function ($scope) {

        $scope.viewName = 'Customers';
        $scope.inputStyle = { 'height': 300 };
    }
])
