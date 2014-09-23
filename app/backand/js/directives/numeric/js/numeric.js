'use strict';
/**
* @ngdoc overview
* @name directive.numeric
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/numeric/partials/numeric.html", '<ng-form name="innerForm">\n' +
	'    <div class="input-group">\n' +
    '      <input type="number" name="field" ng-model="value.val" class="form-control"\n' + 
    '      ng-disabled="field.disabled" ng-required="field.required" ng-class="inputClass" ng-show="field.show"\n' +
    '      min="{{field.minimumValue}}" max="{{field.maximumValue}}">\n' +
    '  <div class="input-group-addon">{{ field.type == \"percentage\" ? \"%\" : field.type == \"currency\" ? field.currencySymbol : field.type == \"numberWithSeparator\" ? \".00\" : \"#\" }}</div>\n' +
    '    </div>\n' +
	'    <div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
	'    <div class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.number">{{errors.number}}</div>\n' +
	'    <div class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.min">{{errors.minimumValue}}</div>\n' +
	'    <div class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.max">{{errors.maximumValue}}</div>\n' +
    '</ng-form>')
})
.directive('numeric', function ($log, $templateCache) {
    /**
    * @ngdoc directive
    * @name directive.numeric
    * @description numeric element
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
    	templateUrl: 'backand/js/directives/numeric/partials/numeric.html',
    	link: function(scope, el, attrs) {
            $log.debug("numeric scope", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
});