'use strict';


var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('myGridController', ['$scope', 'Global', 'dataListService', 'dataItemService', 'configService', '$filter', '$location', '$route', '$sce', '$compile', '$window',
    function ($scope, Global, dataListService, dataItemService, configService, $filter, $location, $route, $sce, $compile, $window) {


        //$scope.$on('gridConfigCompleted', function (event, config) {
            
        //    /*  an example of how to add your own column  */
        //    if (config.name != "Employees")
        //        return;

        //    var col = angular.copy(config.fields[18]);
        //    col.name = "calcSalary";
        //    col.displayName = "Calculated Salary";
        //    config.fields.splice(22, 0, col);

        //})

        //$scope.$on('gridDataCompleted', function (event, dataAndConfig) {

        //    /*  an example of how to add your own column with calculated data  */
        //    if (dataAndConfig.config.name != "Employees")
        //        return;

        //    angular.forEach(dataAndConfig.data.data, function (row) {
        //        row["calcSalary"] = parseInt(row["salary"].replace('$', '').replace(',', '')) * (1 + parseFloat(parseInt(row["Position__"].replace('%','')) / 100)) + parseInt(row["Bonus"]);
        //    });
            
        //})

        //$scope.$on('setCellTemplate', function (event, colAndCellTemplate) {
        //    /*  an example of how to add your own cell styling  */
        //    if (colAndCellTemplate.col.name != "Bonus")
        //        return;

        //    colAndCellTemplate.cellTemplate = colAndCellTemplate.cellTemplate.replace('ng-class="', 'ng-class="\'bg-success\' ');
        //})
    }
])
