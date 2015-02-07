'use strict';
angular.module('backAnd').service('fileUploadService',['$q', '$upload', function($q, $upload) {
    var self = this;

    this.uploadFile = function (file, viewName, fieldName) {
        var response = $q.defer();
        $upload.upload({
            url: backandGlobal.url  + '/1/file/upload/' + viewName + '/' + fieldName,
            file: file
        }).success(function (data, status, headers, config) {
            var curr = {message : '' , url :'', success : false};

            if (data.files[0].success) {
                curr.url = data.files[0].url;
                curr.success = true;
            } else {
                curr.message = data.files[0].error;
                curr.success = false;
            }
            response.resolve(curr);
        }).error(function (data) {
            var curr = {message : '' , url :'', success : false};
            curr.message = data.Message;
            curr.success = false;
            response.resolve(curr);
        });

        return response.promise;
    };
}])
