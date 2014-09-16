'use strict';

var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('dynamicFormController', ['$scope', 
    function ($scope) {

        $scope.viewName = 'Customers';
        $scope.id = 1;
    }
])
