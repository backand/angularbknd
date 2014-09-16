'use strict';
/**
* @ngdoc overview
* @name directive.link
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/link/partials/link.html", '<ng-form name="innerForm">\n' +
    '    <div class="input-group" ng-class="inputClass">\n' +
    '        <a ng-show="value.url" href="{{value.url}}" target="{{value.target}}" class="form-control">{{value.linkText}}</a>\n' +
    '        <span ng-hide="value.url" class="form-control"></span>\n' +
    '        <span class="input-group-btn">\n' +
    '            <button type="button" class="btn btn-default" data-toggle="modal" data-target="{{ \'#myModal-\' + field.name }}"><i class="fa fa-link"></i></button>\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <div class="modal fade" data-backdrop="static" id="{{ \'myModal-\' + field.name }}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
    '        <div class="modal-dialog">\n' +
    '            <div class="modal-content">\n' +
    '                <div class="modal-header">\n' +
    '                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n' +
    '                </div>\n' +
    '                <div class="modal-body">\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="linkText">Label</label>\n' +
    '                        <input type="text" ng-model="value.linkText" class="form-control" id="linkText" placeholder="Link Text">\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="linkUrl">Url</label>\n' +
    '                        <input type="url" ng-model="value.url" name="editUrl" class="form-control" id="linkUrl" placeholder="http://">\n' +
    '                    </div>\n' +
    '                   <div class="form-group">\n' +
    '                        <label for="checkboxOpen">\n' +
    '                            <input type="checkbox" id="checkboxOpen" class="" ng-model="value.target" ng-true-value="null" ng-false-value="_blank">\n' +
    '                            Open in same tab\n' +
    '                        </label>\n' +
    '                    </div>\n' +
    '                    <div class="alert alert-danger" role="alert" ng-show="innerForm.editUrl.$error.url">{{errors.url}}</div>\n' +
    '                </div>\n' +
    '                <div class="modal-footer">\n' +
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</ng-form>')
})
.directive('link', function ($log, $templateCache) {
    /**
    * @ngdoc directive
    * @name directive.link
    * @description link element
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
      field: '=',
      value: '=',
      form: '=',
      inputClass: "=",
      errors: '='
    },
    templateUrl: 'backand/js/directives/link/partials/link.html',
    link: function (scope, el, attrs) {

        /**
        * @name isTargetBlank
        * @propertyOf directive.link {boolean} 
        * @description blank target flag
        */
      scope.isTargetBlank = scope.value.target == "_blank";
        /**
        * @name targetChange
        * @methodOf directive.link
        * @description change event callback to set the blank flag
        */
      scope.targetChange = function () {
        scope.value.target = scope.isTargetBlank ? "_blank" : null;
      };

    },
  };
});