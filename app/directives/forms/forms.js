'use strict';

/* Directives */

angular.module('backAnd.directives')
  .directive('myform', function ($sce,configService) {
    return {
      restrict: 'A',
      transclude : false,
      template: '\
      <form role="form">\
        <div class="panel panel-default">\
          <div class="panel-body">\
            <div class="form-group" ng-repeat="field in formSchema.fields">\
              <hr ng-if="field.hr">\
              <div ng-bind-html="renderHtml(field.preLabel)"></div>\
              <label>{{field.name}}\
                <input type="text" class="form-control" placeholder="type: {{field.type}}">\
              </label>\
              <div ng-bind-html="renderHtml(field.postLabel)"></div>\
            </div>\
            <div class="tabbable form-group">\
              <ul class="nav nav-tabs" role="tablist">\
                <li ng-repeat="category in formSchema.categories" ng-class="{active : $first}">\
                  <a href="#{{category.catName}}" ng-click="toggleActive(category.catName, $event)" role="tab" data-toggle="tab">{{category.catName}}</a>\
                </li>\
              </ul>\
              <div class="tab-content panel-body">\
                <div class="tab-pane fade in" ng-class="{active : $first}" ng-repeat="category in formSchema.categories" id="{{category.catName}}">\
                  <div class="form-group" ng-repeat="field in category.fields" style="display: inline-block;width: {{100 / category.columnsInDialog * field.columns}}%;">\
                    <hr ng-if="field.hr">\
                    <div ng-bind-html="renderHtml(field.preLabel)"></div>\
                    <label>{{field.name}}\
                      <input type="text" class="form-control" placeholder="type: {{field.type}}">\
                    </label>\
                    <div ng-bind-html="renderHtml(field.postLabel)"></div>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="form-actions text-right">\
              <button type="reset" class="btn btn-danger">Cancel</button>\
              <button type="submit" class="btn btn-primary">Submit</button>\
            </div>\
          </div>\
        </div>\
      </form>',
      link: function(scope, el, attrs) {
        var formSchema = {
          fields: [],
          categories: {}
        };
        configService.queryjsonp({
            table: 'Employees'
        }, function(data) {
          processForm(data);
        })
    
        function processForm(data) {
          angular.forEach(data.fields, function (field) {
            var f = {
              name : field.name,
              type : field.type,
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
        scope.toggleActive = function(ind, $event){
          $event.preventDefault();
          el.find('a[href="#' + ind + '"]').tab('show');
        };
      }
    };
  });
