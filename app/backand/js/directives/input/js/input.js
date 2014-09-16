'use strict';
/**
* @ngdoc overview
* @name directive.input
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/input/partials/input.html", '<ng-form name="innerForm">\n' +
	    '<input ng-if="field.format" type="{{field.type}}" name="field" class="form-control"  ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled"  ng-class="inputClass" ng-pattern="field.format" />\n' +
	    '<input ng-if="!field.format" type="{{field.type}}" name="field" class="form-control"  ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled"  ng-class="inputClass" />\n' +
	    '<div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
	    '<div ng-if="field.format" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.pattern">{{errors.format}}</div>\n' +
        '<div ng-if="field.type == \'email\'" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.email">{{errors.email}}</div>\n' +
    '</ng-form>')
})

.directive('input', function ($log, $templateCache) {
    /**
    * @ngdoc directive
    * @name directive.input
    * @description input element
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
    	templateUrl: 'backand/js/directives/input/partials/input.html',
        link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});