'use strict';

backAndControllers.controller('filterDashboardController', ['$scope', 'dataListService',
    function ($scope, dataListService) {

        $scope.dashboardId = '1';
        $scope.filterOptions = [{ fieldName: 'First_Name', operator: 'contains', value: '' }, { fieldName: 'Job_Title', operator: 'in', value: '' }];

        $scope.loadSelectOptions = function () {
            dataListService.read({
                dataType: "view",
                viewName: "EmployeesJob_Title",
                withSelectOptions: null,
                filter: null,
                sort: JSON.stringify([{fieldName:"Ordinal", order: "asc"}]),
                search: null
            }, function (data) {
                
                $scope.Job_TitleOptions = data.data;
            });
        }

        $scope.loadSelectOptions();
    }
])
