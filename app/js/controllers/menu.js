'use strict';


angular.module('backAnd.controllers')
.controller('menuController', ['$scope', 'Global', '$compile', 'configService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function($scope, Global, $compile, configService, menuService, $timeout, $rootScope, $http, $location, $route) {

        $scope.global = Global;

        $scope.templateUrl = function() {
            if ($scope.global.url)  {
                return "views/" + $scope.global.url + ".html";
            }
        }

        $scope.init = function() {

            if (!localStorage.getItem('Authorization')) {
                $location.path('/login');
            } else {
                $location.path('/');
                $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                menuService.queryjsonp({},
                    function success(data) {
                        $scope.pages = data.workspace.pages;

                        $timeout(function() {
                            adminLteInit();
                        });
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
            }
        }
        $scope.setCurrentTable = function(table,name, index, partType) {
            if (partType == "table")  {
                $scope.global.url = "tables"; 
                $scope.global.currentTableName = name;
                $scope.getConfigTable(table); 
                
          }      
          else if (partType == "dashboard")  {
            $scope.global.url = "dashboard/my-website";
            $scope.global.currentTableID = table;
          }
          else if (partType == "content") {
              $scope.global.url = "content";
              $scope.global.currentTableID = table;
          }
        $scope.curTable = index;
        }
        
        $scope.getConfigTable = function(table) {
            var configTable = {};
            // Request to get the field information about the table
            // This config call needs to be separated into a separate function
            // that is only called once
            configService.queryjsonp({
                table: table
                }, function(data) {
                    $scope.global.configTable = data;
                    $scope.global.currentTable = table;
                    var tableElementScope = $("ngback-table").scope();  
                    $("ngback-table").remove();
                    var html = '<ngback-table table-name="global.currentTable"></ngback-table>';
                    // Step 1: parse HTML into DOM element
                    var template = angular.element(html);
                    // Step 2: compile the template
                    var linkFn = $compile(template);
                    //Step 3: link the compiled template with the scope.
                    var element = linkFn($scope);
                    // Step 4: Append to DOM 
                    $(".right-side .ng-scope").append(element);
            });
        };

        $scope.$on('load', function() {
            $scope.init();
        });

}
])
