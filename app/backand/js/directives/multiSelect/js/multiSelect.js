'use strict';
/**
* @ngdoc overview
* @name directive.autocomplete
*/
angular.module('backAnd.directives')
    .directive('multiSelect', [
        function () {
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
    	templateUrl: 'backand/js/directives/multiSelect/partials/multiSelect.html',
    	controller: ['$scope', '$http', '$sce', '$q', '$timeout', '$log', function ($scope, $http, $sce, $q, $timeout, $log) {


    	   
            $scope.dirty = {};
            var states = _.map($scope.field.options, function(o) {
                return { label: o.name, value: o.value };
            });
            var mapValuesLabels = _.object(_.pluck(states, "value"), _.pluck(states, "label"));
            var mapLabelsValues = _.object(_.pluck(states, "label"), _.pluck(states, "value"));
            var a = $scope.value.val.split(",");
            $scope.tags = _.map(a, function(v) {
                return mapValuesLabels[v];
            });
 
            $scope.dropdownStructure = null;
            $scope.dropdownValue = null;
            if ($scope.field.small){

                $scope.dropdownStructure = {
                    options: _.map($scope.field.options, function(o) {
                        o.name = o.label;
                        return o;
                    }),
                    inlineEditing: false,
                    show: $scope.field.show,
                    required: false,
                    disabled: $scope.field.disabled,
                    name: $scope.field.name
                };

                $scope.dropdownValue = {
                    val: null
                };

            }


            $scope.$watchCollection("dropdownValue", function(newValue, oldValue) {
                if (newValue && newValue.val){
                    add_tag(newValue.val);
                    $scope.dropdownValue = {
                        val: null
                    };
                }
            });

            function suggest_state(term) {
                $log.debug("suggest_state", term);
                var q = term.toLowerCase().trim();
                var results = [];

                // Find first 10 states that start with `term`.
                for (var i = 0; i < states.length && results.length < 10; i++) {
                  var state = states[i];
                  if (state.label.toLowerCase().indexOf(q) === 0)
                    results.push(state);
                }
                $log.debug(results);
                return results;
            };

            function suggest_state_remote(term) {
              var deferred = $q.defer();
              // Fake remote source using timeout
              $timeout(function () {
                deferred.resolve(suggest_state(term));
              }, 500);
              return deferred.promise;
            };

            function suggest_state_backand(term) {
                $log.debug("suggest_state_backand");
                var deferred = $q.defer();
                $http.get(backandGlobal.url + "/1/view/data/autocomplete/" + $scope.field.viewName + '/' + $scope.field.name, 
                    { 
                        params: { term: term, limit: 20 }
                    }
                )
                .success(
                    function(data) { 
                        console.log("success", data); 
                        deferred.resolve(data);
                })
                .error(function(error) { 
                        console.log("error", error);
                        deferred.resolve([]);
                });
                return deferred.promise;
            }

            function add_tag(selected) {
              $log.debug(selected);
              $scope.tags = _.uniq($scope.tags.concat(selected.label));         
              // Clear model
              $scope.dirty.value = undefined;
            };

            $scope.clickDelete = function(v) {
                $log.debug(v);
                $scope.tags = _.without($scope.tags, v);
            };

            $scope.debounce_options = {
                debounce_position: 50,
                debounce_attach: 50,
                debounce_suggest: 50,
                debounce_blur: 50
            }

            $scope.autocomplete_options = {
                // suggest: suggest_state,
                // suggest: suggest_state_remote,
                suggest: suggest_state_backand,
                on_select: add_tag
            };

            $scope.$watchCollection("tags", function(newValue, oldValue) {
                $log.debug("new tags", newValue);        
                var a =_.map($scope.tags, function(v) {
                    return mapLabelsValues[v];
                });
                 $scope.value.val = a.join(",");
            });


            
            $scope.options = function (query) {
				if($scope.firstTime){
					$scope.firstTime = false;
					return null;
				}
    	        return $http.get(
                    //backandGlobal.url + "/1/view/data/autocomplete/" + 'Employees' + '/' + 'Manager',
                    backandGlobal.url + "/1/view/data/autocomplete/" + $scope.field.viewName + '/' + $scope.field.name, 
                    {
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
    	link: function(scope, elm, attrs, ctrl) {
    	}
    }
}]);