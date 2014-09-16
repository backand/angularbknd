'use strict';
/**
* @ngdoc overview
* @name directive.email
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/email/partials/email.html", '<ng-form name="innerForm">\n' +
    '    <div class="input-group">\n' +
    '        <input type="{{field.type}}" name="field" class="form-control" ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled" ng-class="inputClass" />\n' +
    '        <div class="input-group-addon">\n' +
    '            <i class="fa fa-envelope"></i>\n' +
    '        </div>\n' +
    '    </div>\n' +
	'    <div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
	'    <div ng-if="field.type == \'email\'" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.email">{{errors.email}}</div>\n' +
    '</ng-form>')
})
.directive('email', function ($log, $templateCache) {
    /**
    * @ngdoc directive
    * @name directive.email
    * @description email element
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
    	templateUrl: 'backand/js/directives/email/partials/email.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});