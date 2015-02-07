'use strict';

/**
 * @ngdoc overview
 * @name controller.menuController
 */
angular.module('backAnd.controllers')
    .controller('initController', ['$scope', 'Global', '$compile', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function ($scope, Global, $compile, menuService, $timeout, $rootScope, $http, $location) {

            $scope.global = Global;


            /**
             * @ngdoc function
             * @name init
             * @methodOf backand.js.controllers:menuController
             * @description initiate the configuration of the menu
             */
            $scope.init = function () {
			
				var haveToGoToRoot = false;
				
				if($location.search().token){
					// handle external login result
					localStorage.setItem('Authorization', "Bearer " + $location.search().token);
					haveToGoToRoot = true;
				}
			
                if (!localStorage.getItem('Authorization')) {
                    $location.path('/login');
                } else {
                    if ($location.$$path == "/login" || haveToGoToRoot) {
                        $location.path('/');
                    }
					
                    $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                    backand.security.authentication.token = $http.defaults.headers.common['Authorization'];

                }
            }

            $scope.isGrid = function () {
                return $location.path().indexOf('grid') != -1;
            }
        }


    ])
