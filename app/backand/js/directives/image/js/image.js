'use strict';
/**
 * @ngdoc overview
 * @name directive.image
 */
angular.module('backAnd.directives')
    .directive('image', ['fileUploadService','$upload',
        function () {
            /**
             * @ngdoc directive
             * @name directive.image
             * @description image element
             * @param {object} field, required, field configuration and data
             * @param {object} value, optional, value of the field, could be null
             * @param {object} form, required, the form that contains the field
             * @param {string} inputClass, optional, optional css class
             * @param {string} errors, optional, error messages
             * @returns {object} directive
             */
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    field: "=",
                    value: "=",
                    form: "=",
                    inputClass: "=",
                    errors: "="
                },
                templateUrl: 'backand/js/directives/image/partials/image.html',
                controller: ['$scope', 'fileUploadService', '$upload',
                    function ($scope, fileUploadService, $upload) {
                        $scope.myFiles = [];
                        $scope.imageUrl = $scope.field.urlPrefix + "/" + $scope.value.val;
                        $scope.fileSelected = function ($files, $event) {
                            $scope.uploadError = false;
                            $scope.uploadErrorMessage = '';
                            for (var i = 0; i < $files.length; i++) {
                                var file = $files[i];
                                $scope.upload = $upload.upload({
                                    url: backandGlobal.url + '/1/file/upload/' + $scope.field.viewName + '/' + $scope.field.displayName,
                                    file: file
                                }).progress(function (evt) {
                                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
                                }).success(function (data, status, headers, config) {
                                    if (data.files[0].success) {
                                        $scope.imageUrl = data.files[0].url;
                                        $scope.value.val = data.files[0].url;
                                    } else {
                                        $scope.uploadError = true;
                                        $scope.uploadErrorMessage = data.files[0].error;
                                    }
                                }).error(function (data) {
                                    $scope.uploadError = true;
                                    $scope.uploadErrorMessage = data.ExceptionMessage;
                                });
                            }
                        }
                }],
                link: function (scope, el, attrs) {
                    if (!scope.value.val) {
                        scope.value.val = scope.field.defaultValue;
                    };
                }
            }
        }
    ]);