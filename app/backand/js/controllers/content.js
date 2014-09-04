'use strict';


angular.module('backAnd.controllers')
.controller('contentController', ['$scope', 'Global', '$http', 'contentService', '$sce','$location',
    function ($scope, Global, $http, contentService, $sce, $location) {

        $scope.$watch('contentId', function () {
            if ($scope.contentId)
                $scope.setData($scope.contentId);
            else if ($location.search().contentId) {
                $scope.setData($location.search().contentId);
            }
        });

        $scope.setData = function(id) {
            contentService.queryjsonp({
                content: id
            }, function (data) {
                $scope.content = data;
                
            });
            
        }
        $scope.contentService = contentService;

        $scope.getDefaultIFrameHeight = function () {
            var top = $('div[data-ng-controller="contentController"]').position().top;
            var height = ($(window).height() - top - 40);
            return height;
        };

    }
    ])
