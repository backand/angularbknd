'use strict';
/**
* @ngdoc overview
* @name directive.autocomplete
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('autocomplete', function () {
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