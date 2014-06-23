'use strict';


angular.module('backAnd.controllers')
    .controller('tableController', ['$scope', 'tableService', 
        function($scope, tableService) {
        	 $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Teancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.myOptions = { data: 'myData' };
            $scope.init = function() {
                tableService.queryjsonp({
                    table: 'test1'
                }, function(data) {
                    console.log(data);
                   
                });
            }

        }
    ])
