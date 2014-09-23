'use strict';
/**
* @ngdoc overview
* @name directive.textarea
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/textarea/partials/textarea.html", '<ng-form name="innerForm">\n' +
	'    <textarea name="field" class="form-control" ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled" ng-class="inputClass"></textarea>\n' +
	'    <div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
    '</ng-form>')
})
.directive('textarea', function ($log, $templateCache) {
    /**
    * @ngdoc directive
    * @name directive.textarea
    * @description textarea element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
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
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/textarea/partials/textarea.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
});