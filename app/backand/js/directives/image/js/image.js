'use strict';
/**
* @ngdoc overview
* @name directive.image
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/image/partials/image.html", '<ng-form name="innerForm">\n' +
    '    <div class="input-group" ng-class="inputClass">\n' +
    '        <input type="text" name="field" class="form-control" ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled" ng-class="inputClass"></input>\n' +
    '        <span class="input-group-btn" ng-show="!field.largeImage">\n' +
    '            <img ng-src="{{field.urlPrefix}}/{{value.val}}" class="btn btn-default" style="padding: 0; margin-right: 34px; width: 34px;" />\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <img ng-src="{{field.urlPrefix}}/{{value.val}}" style="width: 300px;" ng-show="field.largeImage" />\n' +
    '    <div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
    '    <div ng-if="field.format" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.pattern">{{errors.format}}</div>\n' +
    '</ng-form>')
})
.directive('image', function ($log, $templateCache) {
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
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});