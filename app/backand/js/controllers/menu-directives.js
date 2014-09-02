'use strict';


var backAndControllers = angular.module('backAnd.controllers');
backAndControllers.controller('menuDirectivesController', ['$scope', 'Global', '$compile', 'gridConfigService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route', '$interval', '$window', 
    function($scope, Global, $compile, gridConfigService, menuService, $timeout, $rootScope, $http, $location, $route, $interval, $window) {


        // directives experiments
        $scope.fields = [

            {
                name: "firstName",
                
                required: true,
                disabled: false,
                defaultValue: "Ruth",
                show: true
            },

            {
               name: "link", 
               type: "link"
            },

            {
                name: "nickname",
                show: true,
                disabled: false,
                required: false,
                type: "text",
                format: /[a-z]+/
            },

            {
                name: "fullName",
                show: true,
                disabled: false,
                required: true,
                type: "number",
                minimumValue: 6000,
                maximumValue: 30000
            },

            {

                name: "date"
            }
        ];

        $scope.values = [
            { 
                val: "Dano"
            },

            {
                url: "http://www.nytimes.com",
                linkText: "NY Times",
                target: "_blank"
            },

            {
                val: "cat"
            },

            {
                val: 3233
            },

            {
                val: "2014-08-09"
            }
        ];

        $scope.arrange = [
            {
                span: 2,
            },

            {
                span: 4
            },


            {
                span: 6
            },


            {
                span: 8
            },


            {
                span: 10
            }
        ];

        $scope.errors = [
            {},
            {},
            {
                required: "required",
                format: "pattern"

            },
            {
                minimumValue: "Need min",
                maximumValue: "Need max",
                required: "Need required"
            },
            {}
        ];

        $scope.formDetails = {
            name: "surprise"
        };

        $scope.formatArray = [
          ["orange"], "green", { "yellow" : true, "red" : false }, ["orange", "green"], { "green" : true }
        ];

        $interval(function() {
          if ($scope.values[0].val == "Moshe") {
            $scope.values[0].val = "Tami";
          } 
          else{
            $scope.values[0].val = "Moshe";
          };
        }, 300);

        // $scope.$watch('values[2].val', function(newValue, oldValue) {
        //     $window.alert("new input:" + newValue);
        // });



        ////////////////

        $scope.global = Global;

        $scope.init = function () {
            // hack to work on pure forms
            return;

            if (!localStorage.getItem('Authorization')) {
                $location.path('/login');
            } else {
                $location.path('/');
                $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                $scope.loadPages();
            }
        }

        $scope.loadPages = function (workspaceId) {
            menuService.queryjsonp({ workspaceId: workspaceId },
                    function success(data) {
                        $scope.pages = data.workspace.pages;
                        $scope.currentWorkspace = data.workspace;
                        $scope.additionalWorkspaces = data.additionalWorkspaces;
                        $scope.setDefaultMenu();

                        $timeout(function () {
                            $(window).trigger("appConfigCompleted", data);
                        });
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
        }

        $scope.setDefaultMenu = function () {
        }

        $scope.setCurrentMenuSelection = function (current, parent) {
            $scope.global.currentName = current.name;
            if (current.partType == "table") {
                $scope.getConfigTable(current.partId);
                $location.path("/grids");
            }
            else if (current.partType == "dashboard") {
                $scope.global.currentTableID = current.partId;
                $location.path("/dashboard");
            }
            else if (current.partType == "content") {
                $scope.global.currentTableID = current.partId;
                $location.path("/content");
            }
            $scope.curTable = current.index;

            $scope.setBreadcrumbs(current, parent);
        }
        
        $scope.setBreadcrumbs = function (current, parent) {
            $scope.breadcrumbs = [{ name: $scope.currentWorkspace.name }];
            if (parent)
                $scope.breadcrumbs.push(parent);
            $scope.breadcrumbs.push(current);
        }

        $scope.getConfigTable = function(table, elm) {
            var configTable = {};
            // Request to get the field information about the table
            // This config call needs to be separated into a separate function
            // that is only called once
            gridConfigService.queryjsonp({
                table: table
                }, function(data) {
                    $scope.global.configTable = data;
                    $scope.global.currentTable = table;
                    var tableElementScope = $("ngback-grid").scope();  
                    $("ngback-grid").remove();
                    var html = '<ngback-grid table-name="global.currentTable"></ngback-grid>';
                    // Step 1: parse HTML into DOM element
                    var template = angular.element(html);
                    // Step 2: compile the template
                    var linkFn = $compile(template);
                    //Step 3: link the compiled template with the scope.
                    var element = linkFn($scope);
                    // Step 4: Append to DOM 
                    $(".ngback-container .ng-scope").append(element);
            });
        };

        $scope.$on('load', function() {
            $scope.init();
        });

}
])
