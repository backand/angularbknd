//'use strict';

///* Directives */

//angular.module('backAnd.directives')
//  .directive('myform', function ($sce, $q, $location, gridConfigService, gridViewDataItemService, $log) {
//    return {
//      restrict: 'A',
//      transclude : false,
//      templateUrl: 'backand/js/directives/forms/partials/form.html',
//      scope: {
//        form: "=",
//        formDetails: "=",
//        value: "=",
//        layout: "="
//      },
//      link: function(scope, el, attrs) {

//        $log.debug("forms.js", scope);

//        var formSchema = {
//          fields: [],
//          categories: {}
//        },
//        params = $location.search();
//        $log.debug("params", params);
//        var dataForm =  $q.defer();
//        var dataItem =  $q.defer();


//        scope.y = scope.form.fields.text;
//        scope.v = scope.value.text;
//        scope.z = scope.form.fields.input;
//        scope.i = scope.value.input;
//        scope.nytimes = scope.value.link;   

//        $log.debug(scope.layout);  

//        scope.computeFieldSpan = function(fieldId) {
//          $log.debug(fieldId);
//          var span = "col-md-" + scope.layout[fieldId]["span"];
//          $log.debug(span);
//          return span;
//        };

//        scope.newspaper = {};
//        scope.newspaper[scope.computeFieldSpan("link")] = true;
//        scope.editor = {};
//        scope.editor[scope.computeFieldSpan("text")] = true;

//        // move to controller

//        gridConfigService.queryjsonp({
//            table: params.table
//        }, function(data) {
//          $log.debug("resolution from gridConfigService", data);
//          dataForm.resolve(data);
//        });

//        gridViewDataItemService.queryjsonp(params, function(data) {
//          $log.debug("resolution from gridViewDataItemService", data);
//          dataItem.resolve(data);
//        });

//        $q.all([dataForm.promise, dataItem.promise]).then(function (data){
//          $log.debug("$q.all", data);
//          processForm(data[0], data[1]);
//        });

//        // end of controller

//        function processForm(data, dataItem) {
//          angular.forEach(data.fields, function (field) {
//            var type;
//            switch (field.type) {
//              case 'Numeric':
//                type = 'number';
//                break;
//              case 'DateTime':
//                type = 'date';
//                break;
//              case 'LongText':
//                type = 'textarea';
//                break;
//              default:
//                type = 'text'
//            }
//            //$log.debug(field.type + ' : ' + field.name + ' : ' + dataItem[field.name])
//            var f = {
//              name : field.name,
//              type : type,
//              value : dataItem[field.name] || '',
//              hr: field.formLayout.addhorizontallineabouvethefield,
//              seperatorTitle: field.formLayout.seperatorTitle,
//              columns: field.formLayout.columnSpanInDialog,
//              preLabel: field.formLayout.preLabel,
//              postLabel: field.formLayout.postLabel
//            };
//            if (field.categoryName) {
//              if (!formSchema.categories[field.categoryName]) {
//                formSchema.categories[field.categoryName] = {
//                  catName : field.categoryName,
//                  fields: [f]
//                };
//              }
//              formSchema.categories[field.categoryName].fields.push(f);
//            } else {
//              formSchema.fields.push(f);
//            }
//          })
//          angular.forEach(data.categories, function (cat) {
//            if (formSchema.categories[cat.name]) {
//              formSchema.categories[cat.name].columnsInDialog = cat.columnsInDialog;
//            }
//          });
//        };
//        scope.open = function($event, field) {
//          $event.preventDefault();
//          $event.stopPropagation();
//          field.opened = true;
//        };
//        scope.renderHtml = function(html_code) {
//          return $sce.trustAsHtml(html_code);
//        };
//        scope.formSchema = formSchema;
//        scope.toggleActive = function($event){
//          $event.preventDefault();
//          $($event.currentTarget).tab('show');
//        };
//      }
//    };
//  })
//  .directive('toNumber', function () {
//    return {
//      require: 'ngModel',
//      link: function (scope, elem, attrs, ctrl) {
//        return ctrl.$parsers.push(function (value) {
//            return parseFloat(value || '');
//        });
//      }
//    };
//  })
//  .directive('isDate', function () {
//    return {
//      require: 'ngModel',
//      link: function (scope, elem, attr, ngModel) {
//        function validate(value) {
//          var d = Date.parse(value);
//          // it is a date
//          if (isNaN(d)) { // d.valueOf() could also work
//            ngModel.$setValidity('valid', false);
//          } else {
//            ngModel.$setValidity('valid', true);
//          }
//        }
//      }
//    };
//  })
'use strict';

/* Directives */

angular.module('backAnd.directives')
  .directive('myform', function ($sce, $q, $location, gridConfigService, gridViewDataItemService, gridService, $log, Global) {
      return {
          restrict: 'A',
          transclude: false,
          templateUrl: 'backand/js/directives/forms/partials/form.html',
          link: function (scope, el, attrs) {
              var formSchema = {
                  fields: [],
                  categories: {},
                  title: '',
                  id: null
              },
              params = $location.search();
              $log.debug("params", params);
              var dataForm = $q.defer();
              var dataItem = $q.defer();
              var selectOptions = $q.defer();

              gridConfigService.queryjsonp({
                  table: params.table
              }, function (data) {
                  dataForm.resolve(data);
              });

              gridViewDataItemService.queryjsonp(params, function (data) {
                  dataItem.resolve(data);
              });

              var loadSelectOptions = function () {
                  gridService.queryjsonp({
                      table: params.table,
                      withSelectOptions: true,
                      filter: null,
                      sort: null,
                      search: null
                  }, function (data) {
                      selectOptions.resolve(data);
                      if (!Global.selectOptions) {
                          Global.selectOptions = [];
                      }
                      if (!Global.selectOptions[params.table]) {
                          Global.selectOptions[params.table] = data.selectOptions;
                      }


                  });
              }

              if (!Global.selectOptions) {
                  Global.selectOptions = [];
              }

              if (!Global.selectOptions[params.table]) {
                  loadSelectOptions();
                  $q.all([dataForm.promise, dataItem.promise, selectOptions.promise]).then(function (data) {
                      processForm(data[0], data[1]);
                  });
              }
              else {
                  $q.all([dataForm.promise, dataItem.promise]).then(function (data) {
                      processForm(data[0], data[1]);
                  });
              }
              

              function processForm(data, dataItem) {
                  formSchema.title = data.captionText;

                  angular.forEach(data.fields, function (field) {
                      var type;
                      switch (field.type) {
                          case 'Numeric':
                              type = 'number';
                              break;
                          case 'DateTime':
                              type = 'date';
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
                                  type = 'subgrid';
                              else if (field.displayFormat == "CheckList")
                                  type = 'multiSelect';
                              else
                                  type = 'text';
                              break;
                          case 'ShortText':
                              if (field.displayFormat == "MultiLines")
                                  type = 'textarea';
                              else if (field.displayFormat == "MultiLinesEditor")
                                  type = 'editor';
                              else
                                  type = 'text';
                              break;
                          case 'Boolean':
                              type = 'checkbox';
                              break;
                          default:
                              type = 'text'
                      }
                      //console.log(field.type + ' : ' + field.name + ' : ' + dataItem[field.name])
                      var f = {
                          name: field.name,
                          displayName: field.displayName,
                          type: type,
                          value: { val: dataItem[field.name] || '' },
                          hr: field.formLayout.addhorizontallineabouvethefield,
                          seperatorTitle: field.formLayout.seperatorTitle,
                          columns: field.formLayout.columnSpanInDialog,
                          preLabel: field.formLayout.preLabel,
                          postLabel: field.formLayout.postLabel,
                          show: true,
                          disabled: field.form.disableInEdit,
                          required: field.advancedLayout.required,
                          viewName: params.table,
                          relatedViewName: field.relatedViewName,
                          relatedParentFieldName: field.relatedParentFieldName
                      };
                      if (field.categoryName) {
                          if (!formSchema.categories[field.categoryName]) {
                              formSchema.categories[field.categoryName] = {
                                  catName: field.categoryName,
                                  fields: []
                              };
                          }
                          formSchema.categories[field.categoryName].fields.push(f);
                      } else {
                          formSchema.fields.push(f);
                      }
                      if (f.type == "singleSelect" || f.type == "multiSelect") {
                          if (Global.selectOptions && Global.selectOptions[params.table] && Global.selectOptions[params.table][f.name]) {
                              f.options = Global.selectOptions[params.table][f.name];
                          }
                      }
                      else if (type == "autocomplete") {
                          f.value.val = dataItem.__metadata.autocomplete[f.name];
                      }
                  })
                  angular.forEach(data.categories, function (cat) {
                      if (formSchema.categories[cat.name]) {
                          formSchema.categories[cat.name].columnsInDialog = cat.columnsInDialog;
                          if (formSchema.categories[cat.name].fields.length == 1 && formSchema.categories[cat.name].fields[0].type == 'subgrid') {
                              formSchema.categories[cat.name].fields[0].hideLabel = true;
                          }
                      }
                  });

                  scope.formSchema.id = dataItem.__metadata.id;
              };
              scope.open = function ($event, field) {
                  $event.preventDefault();
                  $event.stopPropagation();
                  field.opened = true;
              };
              scope.renderHtml = function (html_code) {
                  return $sce.trustAsHtml(html_code);
              };
              scope.formSchema = formSchema;
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
