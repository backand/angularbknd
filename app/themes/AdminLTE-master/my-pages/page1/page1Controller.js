'use strict';

/***********************************************/
/** To customize the grid use this controller **/
/***********************************************/
<<<<<<< HEAD
angular.module('backAnd.controllers')
    .controller('page1Controller', ['$scope',function ($scope) {

        /*  an example of how to add your own column  */
        $scope.$on('gridConfigCompleted', function (event, config) {
            
            /*  making sure its the view that I am working on  */
            if (config.name != "Employees")
                return;

            /* duplicate the First_Name column since it is very similar to the new Full_Name column that I want to create */
            var fieldName = "First_Name";
            var col = angular.copy(backand.api.view.config.getFieldByName(config, fieldName));
            /* name it Full_Name */
            col.name = "Full_Name";
            col.displayName = "Full Name";
            /* and add the calcSalary column to the grid */
            config.fields.splice(4, 0, col);

        })

        /*  an example of how to add your own column with calculated data  */
        $scope.$on('gridDataCompleted', function (event, dataAndConfig) {

            /*  making sure its the view that I am working on  */
            if (dataAndConfig.config.name != "Employees")
                return;

            /*  concat two columns values to one */
            angular.forEach(dataAndConfig.data.data, function (row) {
                row["Full_Name"] = row["First_Name"] + " " + row["Last_Name"];
=======
var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('myNewPageController', ['$scope', 
    function ($scope) {


        $scope.$on('gridConfigCompleted', function (event, config) {
            
            /*  an example of how to add your own column  */
            if (config.name != "Employees")
                return;

            var col = angular.copy(config.fields[18]);
            col.name = "calcSalary";
            col.displayName = "Calculated Salary";
            config.fields.splice(22, 0, col);

        })

        $scope.$on('gridDataCompleted', function (event, dataAndConfig) {

            /*  an example of how to add your own column with calculated data  */
            if (dataAndConfig.config.name != "Employees")
                return;

            angular.forEach(dataAndConfig.data.data, function (row) {
                row["calcSalary"] = parseInt(row["salary"].replace('$', '').replace(',', '')) * (1 + parseFloat(parseInt(row["Position__"].replace('%','')) / 100)) + parseInt(row["Bonus"]);
>>>>>>> origin/master
            });
            
        })

<<<<<<< HEAD
        /*  an example of how to add your own cell styling  */
        $scope.$on('setCellTemplate', function (event, colAndCellTemplate) {

            /*  making sure its the view that I am working on  */
            if (event.targetScope.configTable.name != "Employees")
                return;

            /* only apply to the Full_Name column */
            if (colAndCellTemplate.col.name != "Full_Name")
                return;

            /* change the background of the column */
=======
        $scope.$on('setCellTemplate', function (event, colAndCellTemplate) {
            /*  an example of how to add your own cell styling  */
            if (colAndCellTemplate.col.name != "Bonus")
                return;

>>>>>>> origin/master
            colAndCellTemplate.cellTemplate = colAndCellTemplate.cellTemplate.replace('ng-class="', 'ng-class="\'bg-success\' ');
        })
       
    }
])
