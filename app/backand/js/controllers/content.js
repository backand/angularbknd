'use strict';

/**
* @ngdoc overview
* @name controller.contentController
*/
angular.module('backAnd.controllers')
.controller('contentController', ['$scope', 'Global', '$http', 'contentService', '$sce','$location',
    function ($scope, Global, $http, contentService, $sce, $location) {

        /**
        * @ngdoc function
        * @name contentId
        * @methodOf backand.js.controllers:contentController
        * @description Get the new Backand's content id and re-load the data
        */
        $scope.$watch('contentId', function () {
            if ($scope.contentId)
                $scope.setData($scope.contentId);
            else if ($location.search().contentId) {
                $scope.setData($location.search().contentId);
            }
        });

        /**
        * @ngdoc function
        * @name setData
        * @methodOf backand.js.controllers:contentController
        * @param {string} id reference to content
        * @description set the data
        */
        $scope.setData = function (id) {
            contentService.queryjsonp({
                content: id
            }, function (data) {
                $scope.content = data;
                
            });
            
        }

        $scope.contentService = contentService;

        /**
        * @ngdoc function
        * @name getDefaultIFrameHeight
        * @methodOf backand.js.controllers:contentController
        * @description get the default iframe height
        * @returns {int} height in pixels
        */
        $scope.getDefaultIFrameHeight = function () {
            var top = $('div[data-ng-controller="contentController"]').position().top;
            var height = ($(window).height() - top - 40);
            return height;
        };

    }
])
