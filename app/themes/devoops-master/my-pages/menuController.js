'use strict';

/***********************************************/
/** Use this controller to customize the menu **/
/***********************************************/

angular.module('backAnd.controllers')
.controller('myMenuController', ['$scope', 'Global', '$compile', 'configService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function ($scope, Global, $compile, configService, menuService, $timeout, $rootScope, $http, $location, $route) {


        /* Uncomment to see an example of how to add your own menu item  */
        //$scope.$on('appConfigCompleted', function (event, data) {
        //    /*  this example adds a menu item to page1 */
        //    if (data && data.workspace && data.workspace.pages && data.workspace.pages.length > 3) {
        //        data.workspace.pages.splice(3, 0, {name: "page1", partType: "content"})
        //    }
        //})

        /*  Uncomment to see an example of how to navigate when menu item is selected  */
        //$scope.$on('menuItemSelected', function (event, data) {
        //    /*  this example navigates to page1 see the routings at \themes\AdminLTE-master\backand\js\app.js */
        //    if (data.name == 'page1')
        //        $location.path("/page1");
        //})
    }
])
