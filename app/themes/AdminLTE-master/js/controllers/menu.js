'use strict';


angular.module('backAnd.controllers')
.controller('myMenuController', ['$scope', 'Global', '$compile', 'configService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function ($scope, Global, $compile, configService, menuService, $timeout, $rootScope, $http, $location, $route) {


        //$scope.$on('appConfigCompleted', function (event, data) {
            
        //    /*  an example of how to add your own menu item  */
        //    if (data && data.workspace && data.workspace.pages && data.workspace.pages.length > 3){
        //        data.workspace.pages.splice(3, 0, {name: "my menu item", partType: "content"})
        //    }

        //})

        //$scope.$on('menuItemSelected', function (event, data) {
        //    /*  an example of how to navigate when menu item is selected  */
        //    alert(data.name);
        //    $location.path("/");
        //})
    }
])
