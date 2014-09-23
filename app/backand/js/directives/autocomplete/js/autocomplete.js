'use strict';
/**
* @ngdoc overview
* @name directive.autocomplete
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/autocomplete/partials/autocomplete.html", '<ng-form name="innerForm">\n' +
        '<input typeahead-on-select="setPcode($item)" typeahead-editable="false" type="text" name="field" class="form-control" ng-required="field.required" ng-model="field.selected" ng-show="field.show" ng-disabled="field.disabled" ng-class="inputClass" min-length="2" typeahead="option.label for option in options($viewValue)">\n' +
        '<div ng-if="field.required" class="alert alert-danger" role="alert" ng-show="innerForm.field.$error.required">Missing</div>\n' +
        '<div class="alert alert-danger" role="alert" ng-show="!innerForm.field.$valid">Not matched</div>\n' +
    '</ng-form>')
})
backAndDirectives.directive('autocomplete', function ($templateCache) {
    console.log("autocomplete called");
    /**
    * @ngdoc directive
    * @name directive.autocomplete
    * @description automatic complition for parent relation
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
    	templateUrl: 'backand/js/directives/autocomplete/partials/autocomplete.html',
    	controller: ['$scope', '$http', function ($scope, $http) {
    	    $scope.options = function (query) {
    	        return $http.get(backandGlobal.url + "/1/view/data/autocomplete/" + $scope.field.viewName + '/' + $scope.field.name, {
    	            params: { term: query, limit: 20 }
    	        })
                .then(function (response) {
                    return response.data;
                });
    	    };

    	    $scope.setPcode = function (item) {
    	        $scope.field.value.val = item.value;
    	    };
    	}],
    	link: function(scope, el, attrs) {
    	    console.log("autocomplete.js", scope);

    	}
    }
});