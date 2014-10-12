'use strict';

/***********************************************/
/** To customize the grid use this controller **/
/***********************************************/
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
            });
            
        })

        /*  an example of how to add your own cell styling  */
        $scope.$on('setCellTemplate', function (event, colAndCellTemplate) {

            /*  making sure its the view that I am working on  */
            if (event.targetScope.configTable.name != "Employees")
                return;

            /* only apply to the Full_Name column */
            if (colAndCellTemplate.col.name != "Full_Name")
                return;

            /* change the background of the column */
            colAndCellTemplate.cellTemplate = colAndCellTemplate.cellTemplate.replace('ng-class="', 'ng-class="\'bg-success\' ');
        })
       
    }
])
