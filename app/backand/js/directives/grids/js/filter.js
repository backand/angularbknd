'use strict';
/**
* @ngdoc overview
* @name directive.bkndToolbar
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('bkndFilter', function ($sanitize, $sce) {//$templateCache) {
    /**
    * @ngdoc directive
    * @name directive.bkndFilter
    * @description grid filter
    * @filterOptions {object} filter, filter options array 
    * @returns {object} directive
    */
    return {
        restrict: 'A',
        replace: true,
        scope: {
            filterOptions: "=",
            showOperators: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/filter.html',
        link: function (scope, el, attrs, bkndNgGridCtrl) {

            scope.$watch('filterOptions', function (newVal, oldVal) {
                if (scope.filterOptions) {
                    scope.filterOptionsOutput = angular.copy(scope.filterOptions);
                }
            }, true);

            
            scope.filterChanged = function () {
                scope.$emit('onfilter', scope.getFilter(), scope);

            }

            scope.getFilter = function () {
                var filter = [];
                angular.forEach(scope.filterOptionsOutput, function (option) {
                    if (option.value) {
                        filter.push({ "fieldName": option.fieldName, "operator": option.operator, "value": option.value });
                    }
                });
                return filter;
            }

            scope.reset = function () {
                scope.filterOptionsOutput = angular.copy(scope.filterOptions);
                scope.$emit('onfilter', scope.getFilter(), scope);
            }

            function htmlDecode(input) {
                var e = document.createElement('div');
                e.innerHTML = input;
                return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
            }

            scope.getOperatorSymbol = function (operator) {
                var symbol = null;
                switch (operator) {
                    case 'equals':
                        symbol = '=';
                        break;
                    case 'notEquals':
                        symbol = $sanitize('&ne;');
                        break;
                    case 'greaterThan':
                        symbol = $sce.trustAsHtml(htmlDecode('&gt;'));
                        break;
                    case 'greaterThanOrEqualsTo':
                        symbol = $sanitize('&ge;');
                        break;
                    case 'lessThan':
                        symbol = $sce.trustAsHtml(htmlDecode('&lt;'));
                        break;
                    case 'lessThanOrEqualsTo':
                        symbol = $sanitize('&le;');
                        break;
                    case 'empty':
                        symbol = $sanitize('&empty;');
                        break;
                    case 'notEmpty':
                        symbol = $sanitize('&exist;');
                        break;
                    case 'startsWith':
                        symbol = $sanitize('&rarr;');
                        break;
                    case 'endsWith':
                        symbol = $sanitize('&larr;');
                        break;
                    case 'contains':
                        symbol = $sanitize('&harr;');
                        break;
                    case 'notContains':
                        symbol = 'glyphicon glyphicon-align-justify';
                        break;

                    default:
                        break;
                }

                return symbol;
            }
         
            scope.getOperatorIcon = function (operator) {
                var icon = null;
                switch (operator) {
                    case 'equals':
                        icon = 'glyphicon glyphicon-pause';
                        break;
                    case 'notEquals':
                        icon = 'glyphicon glyphicon-stop';
                        break;
                    case 'greaterThan':
                        icon = 'glyphicon glyphicon-chevron-right';
                        break;
                    case 'greaterThanOrEqualsTo':
                        icon = 'glyphicon glyphicon-step-forward';
                        break;
                    case 'lessThan':
                        icon = 'glyphicon glyphicon-chevron-left';
                        break;
                    case 'lessThanOrEqualsTo':
                        icon = 'glyphicon glyphicon-step-backward';
                        break;
                    case 'empty':
                        icon = 'glyphicon glyphicon-remove-circle';
                        break;
                    case 'notEmpty':
                        icon = 'glyphicon glyphicon-ok-circle';
                        break;
                    case 'startsWith':
                        icon = 'glyphicon glyphicon-align-left';
                        break;
                    case 'endsWith':
                        icon = 'glyphicon glyphicon-align-right';
                        break;
                    case 'contains':
                        icon = 'glyphicon glyphicon-align-center';
                        break;
                    case 'notContains':
                        icon = 'glyphicon glyphicon-align-justify';
                        break;

                    default:
                        break;
                }

                return icon;
            }
        }
    }
});