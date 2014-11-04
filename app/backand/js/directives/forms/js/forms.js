'use strict';

/**
* @ngdoc overview
* @name directive.bkndForm
*/
angular.module('backAnd.directives')
    .directive('bkndForm', ['$sce','$q','$location','$route','configService','dataItemService','dataListService','$log','Global',
        function ($sce, $q, $location, $route, configService, dataItemService, dataListService, $log, Global) {
    /**
    * @ngdoc directive
    * @name directive.bkndForm
    * @description binding a form to a database table or view
    * @param {string} viewName, required, reference to table or view name
    * @param {string} rowId, optional, the row primary key, if provided then the form is in EDIT mode otherwise it is in a CREATE mode
    *       if the primary key of the row has multiple column values then they should be comma delimited in the primary key columns' order
    * @param {string} defaultFieldsValues, optional, this is a JSON string of an array of backand.defaultOption with two properties: fieldName, value
    *       if provided it precedes the default value of a field from configuration. it is only relevant in CREATE mode
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'backand/js/directives/forms/partials/form.html',
        scope: {
            viewName: '=',
            rowId: '=',
            defaultFieldsValues: '=',
        },
         /**
         * @name link
         * @methodOf directive.bkndForm
         * @description manage the scope of the bkndForm directive
         * @param {object} scope, required, the scope of the directive
         * @param {object} el, required, the element of the directive
         * @param {object} attrs, required, the attributes of the directive
         */
        link: function (scope) {
            /**
            * @name configInfo
            * @propertyOf directive.bkndForm {object} 
            * @description configuration information of the form and its fields
            */
            scope.configInfo = {
                fields: [],
                categoriesDictionary: {},
                title: '',
                id: null
            };
            var searchParams = $location.search();

            /**
             * @name init
             * @methodOf directive.bkndForm
             * @description initiate the configuration of the form
             * @param {object} params, required, either the search parameters or directive attributes containing the scope parameters
             */
            scope.init = function (params) {

                /**
                * @name isNew
                * @propertyOf directive.bkndForm {boolean} 
                * @description if isNew then CREATE mode, otherwise EDIT mode
                */
                scope.isNew = !params.rowId;
                /**
                * @name continue
                * @propertyOf directive.bkndForm {boolean} 
                * @description relevant only in CREATE mode, if true then after submit show the in CREATE mode for new row, otherwise shows the new created row in an EDIT mode
                */
                scope.continue = false;

                //$log.debug("params", params);
                var dataForm = $q.defer();
                var dataItem = $q.defer();
                var selectOptions = $q.defer();

                configService.read({
                    dataType: "view",
                    id: params.viewName
                }, function (data) {
                    dataForm.resolve(data);
                });

                if (!scope.isNew) {
                    dataItemService.read({
                        dataType: "view",
                        viewName: params.viewName,
                        id: params.rowId
                    }, function (data) {
                        dataItem.resolve(data);
                    });
                }

                var loadSelectOptions = function () {
                    dataListService.read({
                        dataType: "view",
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
                    var dataToSubmit = {};
                    if (params.defaultFieldsValues) {
                        var defaultFieldsValues = JSON.parse(params.defaultFieldsValues);
                        angular.forEach(defaultFieldsValues, function (defaultOption) {
                            dataToSubmit[defaultOption.fieldName] = defaultOption.value;
                        });
                    }

                    if (!Global.selectOptions[params.viewName]) {
                        loadSelectOptions();
                        $q.all([dataForm.promise, selectOptions.promise]).then(function (data) {
                            scope.processForm(data[0], dataToSubmit, params);
                        });
                    }
                    else {
                        $q.all([dataForm.promise]).then(function (data) {
                            scope.processForm(data[0], dataToSubmit, params);
                        });
                    }
                }

                /**
                * @name dataToSubmit
                * @propertyOf directive.bkndForm {object} 
                * @description the data to submit to the database
                */
                scope.dataToSubmit = null;
                var updateMessages = {
                    failure: "Failed to update the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };
                var createMessages = {
                    failure: "Failed to create the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };

                /**
                * @name submitCaption
                * @propertyOf directive.bkndForm {string} 
                * @description the submit button caption
                */
                scope.submitCaption = scope.isNew ? 'Create' : 'Update';
                /**
                * @name submitAndContinueCaption
                * @propertyOf directive.bkndForm {string} 
                * @description the submit and continue button caption, relevant only in CREATE mode
                */
                scope.submitAndContinueCaption = scope.isNew ? 'Create and Continue' : '';


                /**
                * @name submit
                * @methodOf directive.bkndForm 
                * @description submit the form data to the database
                */
                scope.submit = function () {
                    var messages = scope.isNew ? createMessages : updateMessages;
                    scope.submitAction(messages);
                }

                /**
                * @name setFieldValue
                * @methodOf directive.bkndForm 
                * @description handles each field value
                * @param {object} field, required, the field/column of the database table or view
                */
                scope.setFieldValue = function (field) {
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
                }

                /**
                * @name submitAction
                * @methodOf directive.bkndForm 
                * @description submit the form data to the database
                * @param {object} service, required, if the mode is CREATE then the create service otherwise the edit service
                * @param {object} messages, required, success and failure messages
                */
                scope.submitAction = function (messages) {
                    angular.forEach(scope.configInfo.fields, function (field) {
                        scope.setFieldValue(field);
                    });

                    angular.forEach(scope.configInfo.categories, function (category) {
                        angular.forEach(category.fields, function (field) {
                            
                            scope.setFieldValue(field);
                        });
                    });

                    scope.waiting = true;
                    scope.alerts = [];
                    scope.closeAlert = function (index) {
                        scope.alerts.splice(index, 1);
                    };

                    var submitParams = null;
                    if (scope.isNew) {
                        submitParams = {
                            dataType: "view",
                            viewName: params.viewName
                        };
                    }
                    else {
                        submitParams = {
                            dataType: "view",
                            viewName: params.viewName,
                            id: params.rowId
                        };
                    }

                    var errorCallback = function (error) {
                        scope.waiting = false;
                        if (error.status == 500) {
                            console.error(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: messages.failure }];
                        }
                        else {
                            console.warn(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: error.data }];
                        }
                    };

                    if (scope.isNew) {
                        dataItemService.create(submitParams, JSON.stringify(scope.dataToSubmit), function (data) {
                            scope.waiting = false;
                            if (scope.continue) {
                                $route.reload();
                            }
                            else {
                                $location.search({
                                    viewName: params.viewName,
                                    rowId: data.__metadata.id
                                });
                                $location.path('/forms');
                            }
                        },
                        errorCallback);
                    }
                    else {
                        dataItemService.update(submitParams, JSON.stringify(scope.dataToSubmit), function (data) {
                            scope.waiting = false;
                            
                            scope.alerts = [{ type: 'success', msg: messages.success }];
                            window.setTimeout(function () {
                                $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                    $(this).remove();
                                });
                            }, 5000);
                            
                        },
                        errorCallback);
                    }

                };

            }

            /**
            * @ngdoc function
            * @name viewName
            * @methodOf directive.bkndForm 
            * @description Get the new Backand's view name and re-load the configraion
            *              and data
            */
            scope.$watch('viewName', function () {
                if (scope.viewName) {
                    if (scope.rowId) {
                        scope.init({ viewName: scope.viewName, rowId: scope.rowId });
                    }
                    else {
                        scope.init({ viewName: scope.viewName });
                    }
                }
                else {
                    scope.init(searchParams);

                }
            });



            /**
            * @name processForm
            * @methodOf directive.bkndForm 
            * @description initiate each field configuration
            * @param {object} viewConfig, required, configuration of the view or table from the database and all its columns
            * @param {object} dataItem, required, the row from the database, if CREATE mode the an empty object
            * @param {object} params, required, either the search parameters or directive attributes containing the scope parameters
            */
            scope.processForm = function (viewConfig, dataItem, params) {
                scope.dataToSubmit = dataItem;
                scope.configInfo.title = viewConfig.captionText;
                scope.configInfo.columnsInDialog = viewConfig.dataEditing.columnsInDialog;
                scope.configInfo.editable = (scope.isNew && viewConfig.dataEditing.allowAdd) || (!scope.isNew && viewConfig.dataEditing.allowEdit);

                angular.forEach(viewConfig.fields, function (field) {
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
                            else if (field.displayFormat == "NumberWithSeparator") {
                                type = 'numberWithSeparator';
                            }
                            else {
                                type = 'numeric';
                            }

                            break;
                        case 'DateTime':
                            if (field.displayFormat == "Date_mm_dd" || field.displayFormat == "Date_dd_mm" || field.displayFormat == "None" || !field.displayFormat)
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
                            //pattern example = /[0-9]/;
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
                        case 'Image':
                            type = 'image';
                            break;

                        default:
                            type = 'text'

                            break;
                    }
                    var val = '';
                    if (scope.isNew) {
                        val = dataItem[field.name] || field.advancedLayout.defaultValue || '';
                    }
                    else {
                        val = dataItem[field.name] || '';
                    }
                        
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
                        show: scope.isNew ? !field.form.hideInCreate : !field.form.hideInEdit,
                        disabled: scope.isNew ? field.form.disableInCreate : field.form.disableInEdit,
                        required: field.advancedLayout.required,
                        viewName: params.viewName,
                        relatedViewName: field.relatedViewName,
                        relatedParentFieldName: field.relatedParentFieldName,
                        minimumValue: field.advancedLayout.minimumValue,
                        maximumValue: field.advancedLayout.maximumValue,
                    };

                    if (field.categoryName && f.show) {
                        if (!scope.configInfo.categoriesDictionary[field.categoryName]) {
                            scope.configInfo.categoriesDictionary[field.categoryName] = {
                                catName: field.categoryName,
                                fields: []
                            };
                        }
                        scope.configInfo.categoriesDictionary[field.categoryName].fields.push(f);
                    } else {
                        scope.configInfo.fields.push(f);
                    }
                    if (f.type == "singleSelect" || f.type == "multiSelect") {
                        if (Global.selectOptions && Global.selectOptions[params.viewName] && Global.selectOptions[params.viewName][f.name]) {
                            f.options = Global.selectOptions[params.viewName][f.name];
                        }
                        if (scope.isNew) {
                            f.inlineEditing = field.form.inlineAdding;
                        }
                        else {
                            f.inlineEditing = field.form.inlineEditing;
                        }
                    }
                    else if (type == "autocomplete") {
                        if (scope.isNew) {
                            f.selected = val;
                            if (val)
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
                    else if (type == "image") {
                        f.urlPrefix = field.urlPrefix;
                    }
                    f.errors = { required: "Data required", minimumValue: "Must be more than " + f.minimumValue, maximumValue: "Must be less than " + f.maximumValue, number: "Must be a number",email: "Must be a valid email" };

                    /// subgrid
                    f.filterSubgrid = function () {
                        var filterItem = new backand.filter.item(f.relatedParentFieldName, backand.filter.operator.relation.in, dataItem.__metadata.id);
                        return angular.toJson([filterItem]);
                    };
                })

                scope.configInfo.categories = [];
                var firstCategory = true;
                angular.forEach(viewConfig.categories, function (cat) {
                    if (scope.configInfo.categoriesDictionary[cat.name]) {
                        scope.configInfo.categoriesDictionary[cat.name].columnsInDialog = cat.columnsInDialog;
                        if (scope.configInfo.categoriesDictionary[cat.name].fields.length == 1 && scope.configInfo.categoriesDictionary[cat.name].fields[0].type == 'subgrid') {
                            scope.configInfo.categoriesDictionary[cat.name].fields[0].hideLabel = true;
                            scope.configInfo.categoriesDictionary[cat.name].fields[0].tempRelatedViewName = scope.configInfo.categoriesDictionary[cat.name].fields[0].relatedViewName;
                            if (!firstCategory) {
                                scope.configInfo.categoriesDictionary[cat.name].fields[0].relatedViewName = '';
                            }
                            else {
                                firstCategory = false;
                            }
                        }
                        scope.configInfo.categories.push(scope.configInfo.categoriesDictionary[cat.name]);
                    }
                });

                if (!scope.isNew) {
                    scope.configInfo.id = dataItem.__metadata.id;
                }
            };

            /**
            * @name renderHtml
            * @methodOf directive.bkndForm 
            * @description render text to html
            * @param {string} html_code, required, text to render to html
            * @returns {string} the rendred html
            */
            scope.renderHtml = function (html_code) {
                return $sce.trustAsHtml(html_code);
            };
            
            /**
            * @name tabClick
            * @methodOf directive.bkndForm 
            * @description handles subgrids, only activates them when the user select their tabs, to increase performance
            * @param {object} category, required, the category of the tab
            */
            scope.tabClick = function (category) {
                angular.forEach(category.fields, function (field) {
                    field.relatedViewName = field.tempRelatedViewName;
                });
            }
        }
    };
}])
/**
* @ngdoc filter
* @name filter.parseLabel
* @description when need to hide the input label it returns an empty string instead of hiding the entire label element that contains the input element
*/
.filter('parseLabel', function () {
    return function (label, field) {
        if (field && field.hideLabel)
            return '';
        return label;
    }
})
.directive('showtab',
    function () {
        return {
            link: function (scope, element) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });