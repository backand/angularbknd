'use strict';

/* Directives */

angular.module('backAnd.directives')
  .directive('myform', function ($sce, $q, $location, configService, viewDataItemService) {
    return {
      restrict: 'A',
      transclude : false,
      templateUrl: 'directives/forms/views/form.html',
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
          dataForm.resolve(data)
        });

        viewDataItemService.queryjsonp(params, function(data) {
          dataItem.resolve(data)
        });

        $q.all([dataForm.promise, dataItem.promise]).then(function (data){
          processForm(data[0], data[1]);
        })

        function processForm(data, dataItem) {
          angular.forEach(data.fields, function (field) {
            var value = dataItem[field.name] || '';
            var f = {
              name : field.name,
              type : field.type,
              value : value,
              hr: field.formLayout.addhorizontallineabouvethefield,
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
  });
