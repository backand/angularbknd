'use strict';

/* Directives */

angular.module('backAnd.directives')
  .directive('myform', function ($sce, $q, $location, configService, viewDataItemService) {
    return {
      restrict: 'A',
      transclude : false,
      templateUrl: 'views/forms/form.html',
      link: function(scope, el, attrs) {
        var formSchema = {
          fields: [],
          categories: {}
        },
        params = $location.search(),
        dataForm =  $q.defer(),
        dataItem =  $q.defer();

        configService.queryjsonp({
            table: params.table
        }, function(data) {
          dataForm.resolve(data);
        });

        viewDataItemService.queryjsonp(params, function(data) {
          dataItem.resolve(data);
        });

        $q.all([dataForm.promise, dataItem.promise]).then(function (data){
          processForm(data[0], data[1]);
        })

        function processForm(data, dataItem) {
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
                type = 'textarea';
                break;
              default:
                type = 'text'
            }
            //console.log(field.type + ' : ' + field.name + ' : ' + dataItem[field.name])
            var f = {
              name : field.name,
              type : type,
              value : dataItem[field.name] || '',
              hr: field.formLayout.addhorizontallineabouvethefield,
              seperatorTitle: field.formLayout.seperatorTitle,
              columns: field.formLayout.columnSpanInDialog,
              preLabel: field.formLayout.preLabel,
              postLabel: field.formLayout.postLabel
            };
            if (field.categoryName) {
              if (!formSchema.categories[field.categoryName]) {
                formSchema.categories[field.categoryName] = {
                  catName : field.categoryName,
                  fields: []
                };
              }
              formSchema.categories[field.categoryName].fields.push(f);
            } else {
              formSchema.fields.push(f);
            }
          })
          angular.forEach(data.categories, function (cat) {
            if (formSchema.categories[cat.name]) {
              formSchema.categories[cat.name].columnsInDialog = cat.columnsInDialog;
            }
          });
        };
        scope.open = function($event, field) {
          $event.preventDefault();
          $event.stopPropagation();
          field.opened = true;
        };
        scope.renderHtml = function(html_code) {
          return $sce.trustAsHtml(html_code);
        };
        scope.formSchema = formSchema;
        scope.toggleActive = function($event){
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
