'use strict';

/* Directives */

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('pureForm', function ($sce, $q, $location, gridConfigService, gridViewDataItemService, $log) {
    return {
      restrict: 'A',
      transclude : false,
      templateUrl: 'backand/js/directives/forms/partials/pure-form.html',
      scope: {
        fields: "=",
        form: "=",
        value: "=",
        layout: "=",
        format: "="
      },
      link: function(scope, el, attrs) {

        

        scope.nicknameClass = { 'yellow' : true };


        $log.debug("pure-form.js", scope);
        
        
        $log.debug(scope.layout);  

        scope.computeFieldSpan = function(fieldId) {
          var span = "col-md-" + scope.layout[fieldId]["span"];
          return span;
        };

        scope.newspaper = {};
        scope.newspaper[scope.computeFieldSpan(1)] = true;
        scope.editor = {};
        scope.editor[scope.computeFieldSpan(0)] = true;
        

        scope.fieldsArray = scope.fields.slice(2, 4);
        scope.valuesArray = scope.value.slice(2,4);
        scope.classesArray = [
          ["orange"], "green" 
        ];
        

        scope.processForm = function(data, dataItem) {
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
            //$log.debug(field.type + ' : ' + field.name + ' : ' + dataItem[field.name])
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
                  fields: [f]
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
        // scope.formSchema = formSchema;
        scope.toggleActive = function($event){
          $event.preventDefault();
          $($event.currentTarget).tab('show');
        };
      }
    };
});
  
  
