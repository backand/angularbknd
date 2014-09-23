'use strict';
/**
* @ngdoc overview
* @name directive.singleSelect
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/singleSelect/partials/singleSelect.html", '<ng-form name="innerForm">\n' +
    '    <select ng-change="changed()" ng-show="!field.inlineEditing && field.show" name="field" class="form-control" ng-required="field.required" ng-model="value.val" ng-disabled="field.disabled" ng-class="inputClass" ng-options="o.name for o in options"></select>\n' +
    '    <div class="input-group" ng-class="inputClass" ng-show="field.inlineEditing">\n' +
    '        <select ng-change="changed()" name="field" class="form-control" ng-required="field.required" ng-model="value.val" ng-show="field.show" ng-disabled="field.disabled" ng-class="inputClass" ng-options="o.name for o in options"></select>\n' +
    '        <span class="input-group-btn">\n' +
    '            <button type="button" class="btn btn-default" data-toggle="modal" ng-click="inlineEditing()">\n' +
    '                <i class="fa custom-icon ng-isolate-scope fa-table" icon-type="grid"></i>\n' +
    '            </button>\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">{{errors.required}}</div>\n' +
    '</ng-form>')
})
.directive('singleSelect', function ($location, $templateCache) {
    console.log("singleSelect called");
    /**
    * @ngdoc directive
    * @name directive.singleSelect
    * @description select element
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
    	templateUrl: 'backand/js/directives/singleSelect/partials/singleSelect.html',
    	link: function(scope, el, attrs) {
    	    console.log("singleSelect.js", scope);

    	    /**
            * @name options
            * @propertyOf directive.singleSelect {array} 
            * @description get the select options from configuration
            */
    	    scope.options = scope.field.options;

    	    if (scope.value.val) {
    	        angular.forEach(scope.options, function (option) {
    	            if (option.value == scope.value.val) {
    	                scope.value.val = option;
    	            }
    	        });
    	    }

    	    /**
             * @name inlineEditing
             * @methodOf directive.singleSelect
             * @description when configured adds a button that links to the related table of the select options
             */
    	    scope.inlineEditing = function () {
    	        $location.search({
    	            viewName: scope.field.relatedViewName,
    	        });
    	        $location.path('/grids');
    	    }

    	    /**
            * @name changed
            * @methodOf directive.singleSelect
            * @description change callback to set the back the selected value
            */
    	    scope.changed = function () {
    	        if (!scope.value.val.value)
    	            scope.value.val = null;
    	    }
    	}
    }
});