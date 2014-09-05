'use strict';

/* Directives */

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('ngbackForm', function ($sce, $q, $location, $route, gridConfigService, gridViewDataItemService, gridCreateItemService, gridUpdateItemService, gridService, $log, Global) {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'backand/js/directives/forms/partials/form.html',
        scope: {
            viewName: '=',
            id: '=',
        },
        link: function (scope, el, attrs) {
            scope.formSchema = {
                fields: [],
                categories: {},
                title: '',
                id: null
            };
            var searchParams = $location.search();


            scope.init = function (params) {

                scope.isNew = !params.id;
                scope.continue = false;

                $log.debug("params", params);
                var dataForm = $q.defer();
                var dataItem = $q.defer();
                var selectOptions = $q.defer();

                gridConfigService.queryjsonp({
                    viewName: params.viewName
                }, function (data) {
                    dataForm.resolve(data);
                });

                if (!scope.isNew) {
                    gridViewDataItemService.queryjsonp({ viewName: params.viewName, id: params.id }, function (data) {
                        dataItem.resolve(data);
                    });
                }

                var loadSelectOptions = function () {
                    gridService.queryjsonp({
                        viewName: params.viewName,
                        withSelectOptions: true,
                        filter: null,
                        sort: null,
                        search: null
                    }, function (data) {
                        selectOptions.resolve(data);
                        if (!Global.selectOptions) {
                            Global.selectOptions = [];
                        }
                        if (!Global.selectOptions[params.viewName]) {
                            Global.selectOptions[params.viewName] = data.selectOptions;
                        }


                    });
                }

                if (!Global.selectOptions) {
                    Global.selectOptions = [];
                }

                if (!scope.isNew) {
                    if (!Global.selectOptions[params.viewName]) {
                        loadSelectOptions();
                        $q.all([dataForm.promise, dataItem.promise, selectOptions.promise]).then(function (data) {
                            scope.processForm(data[0], data[1], params);
                        });
                    }
                    else {
                        $q.all([dataForm.promise, dataItem.promise]).then(function (data) {
                            scope.processForm(data[0], data[1], params);
                        });
                    }
                }
                else {
                    if (!Global.selectOptions[params.viewName]) {
                        loadSelectOptions();
                        $q.all([dataForm.promise, selectOptions.promise]).then(function (data) {
                            scope.processForm(data[0], {}, params);
                        });
                    }
                    else {
                        $q.all([dataForm.promise]).then(function (data) {
                            scope.processForm(data[0], {}, params);
                        });
                    }
                }


                scope.dataToSubmit = null;
                var updateMessages = {
                    failure: "Failed to update the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };
                var createMessages = {
                    failure: "Failed to create the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };

                scope.submit = function () {
                    var service = scope.isNew ? gridCreateItemService : gridUpdateItemService;
                    var messages = scope.isNew ? createMessages : updateMessages;
                    scope.submitAction(service, messages);
                }

                scope.submitAction = function (service, messages) {
                    angular.forEach(scope.formSchema.categories, function (category) {
                        angular.forEach(category.fields, function (field) {
                            var val = field.value.val;
                            if (scope.dataToSubmit[field.name] != undefined || scope.isNew) {
                                switch (field.type) {
                                    case 'singleSelect':
                                        scope.dataToSubmit[field.name] = val && val.value ? val.value : '';
                                        break;
                                    case 'hyperlink':
                                        scope.dataToSubmit[field.name] = field.value && field.value.linkText ? field.value.linkText + '|' + (field.value.target ? "_blank" : "_self") + '|' + field.value.url : '';
                                        break;
                                    case 'percentage':
                                        scope.dataToSubmit[field.name] = field.value && field.value.val ? (val / 100).toFixed(2) : val;
                                        break;

                                    default:
                                        scope.dataToSubmit[field.name] = val ? val : '';
                                        break;
                                }
                            }

                        });
                    });

                    scope.waiting = true;
                    scope.alerts = [];
                    scope.closeAlert = function (index) {
                        scope.alerts.splice(index, 1);
                    };
                    service.queryjsonp(params, JSON.stringify(scope.dataToSubmit), function (data) {
                        scope.waiting = false;
                        if (scope.isNew) {
                            if (scope.continue) {
                                $route.reload();
                            }
                            else {
                                $location.search({
                                    viewName: params.viewName,
                                    id: data.__metadata.id
                                });
                                $location.path('/forms');
                            }

                        }
                        else {
                            scope.alerts = [{ type: 'success', msg: messages.success }];
                            window.setTimeout(function () {
                                $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                    $(this).remove();
                                });
                            }, 5000);
                        }
                    },
                    function (error) {
                        scope.waiting = false;
                        if (error.status == 500) {
                            console.error(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: messages.failure }];
                        }
                        else {
                            console.warn(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: error.data }];
                        }
                    });

                };

            }

            scope.$watch('viewName', function () {
                if (scope.viewName) {
                    if (scope.id) {
                        scope.init({ viewName: scope.viewName, id: scope.id });
                    }
                    else {
                        scope.init({ viewName: scope.viewName });
                    }
                }
                else {
                    scope.init(searchParams);

                }
            });




            scope.processForm = function (data, dataItem, params) {
                scope.dataToSubmit = dataItem;
                scope.formSchema.title = data.captionText;

                angular.forEach(data.fields, function (field) {
                    var type;
                    var currencySymbol;
                    switch (field.type) {
                        case 'Numeric':
                            type = 'number';
                            if (field.displayFormat == "Currency") {
                                type = 'currency';
                                currencySymbol = '$';
                            }
                            else if (field.displayFormat == "Percentage") {
                                type = 'percentage';
                            }

                            break;
                        case 'DateTime':
                            if (field.displayFormat == "Date_mm_dd" || field.displayFormat == "Date_dd_mm")
                                type = 'date';
                            else
                                type = 'datetime';
                            break;
                        case 'LongText':
                            if (field.displayFormat == "MultiLines")
                                type = 'textarea';
                            else if (field.displayFormat == "MultiLinesEditor")
                                type = 'editor';
                            else
                                type = 'text';
                            break;
                        case 'SingleSelect':
                            if (field.displayFormat == "AutoCompleteStratWith" || field.displayFormat == "AutoCompleteMatchAny")
                                type = "autocomplete"
                            else
                                type = 'singleSelect';
                            break;
                        case 'MultiSelect':
                            if (field.displayFormat == "Grid")
                                if (scope.isNew)
                                    type = 'disabledSubgrid';
                                else
                                    type = 'subgrid';
                            else if (field.displayFormat == "CheckList")
                                type = 'multiSelect';
                            else
                                type = 'text';
                            break;
                        case 'ShortText':
                            //pattern = /[0-9]/;
                            if (field.displayFormat == "MultiLines")
                                type = 'textarea';
                            else if (field.displayFormat == "MultiLinesEditor")
                                type = 'editor';
                            else if (field.displayFormat == "Hyperlink")
                                type = 'hyperlink';
                            else if (field.displayFormat == "Email")
                                type = 'email';
                            else if (field.displayFormat == "Password")
                                type = 'password';
                            else
                                type = 'text';
                            break;
                        case 'Boolean':
                            type = 'checkbox';
                            break;
                        case 'Url':
                            type = 'hyperlink';
                            break;
                        case 'Email':
                            type = 'email';
                            break;


                        default:
                            type = 'text'

                            break;
                    }
                    var val = scope.isNew ? field.advancedLayout.defaultValue || '' : dataItem[field.name] || '';
                    var f = {
                        name: field.name,
                        displayName: field.displayName,
                        type: type,
                        value: { val: val },
                        hr: field.formLayout.addhorizontallineabouvethefield,
                        seperatorTitle: field.formLayout.seperatorTitle,
                        columns: field.formLayout.columnSpanInDialog,
                        preLabel: field.formLayout.preLabel,
                        postLabel: field.formLayout.postLabel,
                        show: field.form.hideInEdit,
                        disabled: field.form.disableInEdit,
                        required: field.advancedLayout.required,
                        viewName: params.viewName,
                        relatedViewName: field.relatedViewName,
                        relatedParentFieldName: field.relatedParentFieldName,
                        minimumValue: field.advancedLayout.minimumValue,
                        maximumValue: field.advancedLayout.maximumValue,
                    };

                    if (field.categoryName) {
                        if (!scope.formSchema.categories[field.categoryName]) {
                            scope.formSchema.categories[field.categoryName] = {
                                catName: field.categoryName,
                                fields: []
                            };
                        }
                        scope.formSchema.categories[field.categoryName].fields.push(f);
                    } else {
                        scope.formSchema.fields.push(f);
                    }
                    if (f.type == "singleSelect" || f.type == "multiSelect") {
                        if (Global.selectOptions && Global.selectOptions[params.viewName] && Global.selectOptions[params.viewName][f.name]) {
                            f.options = Global.selectOptions[params.viewName][f.name];
                        }
                    }
                    else if (type == "autocomplete") {
                        if (scope.isNew) {
                            f.selected = val;
                            f.value.val = val.value;
                        }
                        else {
                            f.selected = dataItem.__metadata.autocomplete[f.name];
                        }
                    }
                    else if (type == "currency") {
                        f.currencySymbol = currencySymbol;
                    }
                    else if (type == 'hyperlink') {
                        var url = '';
                        var linkText = '';
                        var target = '';
                        if (dataItem[field.name]) {
                            var segments = dataItem[field.name].split('|');
                            if (segments.length == 3) {
                                url = segments[2];
                                linkText = segments[0];
                                target = segments[1];
                            }
                            else {
                                url = dataItem[field.name];
                                linkText = dataItem[field.name];
                            }
                        }

                        f.value.url = url;
                        f.value.linkText = linkText;
                        f.value.target = target;
                    }
                    else if (type == "date") {
                        f.format = field.advancedLayout.format;
                        if (!scope.isNew)
                            f.value.val = dataItem.__metadata.dates[field.name];
                    }
                    else if (type == "datetime") {
                        f.type = 'text';
                        if (!scope.isNew)
                            f.value.val = dataItem[field.name];
                        f.disabled = true;
                    }
                    else if (type == "percentage") {
                        f.value.val = val ? val * 100 : val;
                    }

                    f.errors = { required: "Data required", minimumValue: "Must be more than " + f.minimumValue, maximumValue: "Must be less than " + f.maximumValue, number: "Must be a number" };

                    /// subgrid
                    f.filterSubgrid = function () {
                        var filterItem = new backand.filter.item(f.relatedParentFieldName, backand.filter.operator.relation.in, dataItem.__metadata.id);
                        return [filterItem];
                    };
                })
                angular.forEach(data.categories, function (cat) {
                    if (scope.formSchema.categories[cat.name]) {
                        scope.formSchema.categories[cat.name].columnsInDialog = cat.columnsInDialog;
                        if (scope.formSchema.categories[cat.name].fields.length == 1 && scope.formSchema.categories[cat.name].fields[0].type == 'subgrid') {
                            scope.formSchema.categories[cat.name].fields[0].hideLabel = true;
                        }
                    }
                });

                if (!scope.isNew) {
                    scope.formSchema.id = dataItem.__metadata.id;
                }
            };
            scope.open = function ($event, field) {
                $event.preventDefault();
                $event.stopPropagation();
                field.opened = true;
            };
            scope.renderHtml = function (html_code) {
                return $sce.trustAsHtml(html_code);
            };
            scope.toggleActive = function ($event) {
                $event.preventDefault();
                $($event.currentTarget).tab('show');
            };


        }
    };
})
  .directive('toNumber', function () {
      return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
              return ctrl.$parsers.push(function (value) {
                  return parseFloat(value || '');
              });
          }
      };
  })
  .directive('isDate', function () {
      return {
          require: 'ngModel',
          link: function (scope, elem, attr, ngModel) {
              function validate(value) {
                  var d = Date.parse(value);
                  // it is a date
                  if (isNaN(d)) { // d.valueOf() could also work
                      ngModel.$setValidity('valid', false);
                  } else {
                      ngModel.$setValidity('valid', true);
                  }
              }
          }
      };
  })
.filter('parseLabel', function () {
    return function (label, field) {
        if (field && field.hideLabel)
            return '';
        return label;
    }
});