'use strict';

/* Directives */

var backAndDirectives = angular.module('backAnd.directives', ['ui.bootstrap', 'textAngular']);
backAndDirectives.directive('pureForm', function ($sce, $q, $location, gridConfigService, gridViewDataItemService, $log) {
    return {
      restrict: 'A',
      transclude : false,
      templateUrl: 'backand/js/directives/forms/partials/pure-form.html',
      scope: {
        fields: "=",
        form: "=",
        values: "=",
        layout: "=",
        format: "=",
        errors: "="
      },
      link: function(scope, el, attrs) {

        
        scope.$watch('htmlValue.val', function(newValue, oldValue) {
            $log.debug("new input:" + newValue);
        });

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
        scope.valuesArray = scope.values.slice(2,4);
        scope.classesArray = [
          ["orange"], "green" 
        ];
        

        scope.htmlField = {
          required: false,
          show: true,
          disabled: false
        };

        scope.htmlValue = {
          val: "xxx"
        };

        scope.booleanField = {
          show: true,
          disabled: false,
          defaultValue: false
        };

        scope.booleanValue = {
          
        };

        scope.plainHtmlField = {
          required: false,
          show: true,
          disabled: false
        };

        scope.plainHtmlValue = {
          val: "<p>kuku</p>"
        };

        scope.$watch('booleanValue.val', function(newValue, oldValue) {
            $log.debug("new input:" + newValue);
        });

        scope.$watch('htmlValue.val', function(newValue, oldValue) {
            $log.debug("new input:" + newValue);
        });

        scope.$watch('plainHtmlValue.val', function(newValue, oldValue) {
            $log.debug("new plain html input:" + newValue);
        });

        scope.numericField = {
          required: false,
          disabled: false,
          show: true,
          minimumValue: -8,
          maximumValue: 10,
          type: "currency",
          currencySymbol: "NIS"

        };

        scope.numericValue = {
          val: 2
        };

        scope.numericErrors = {
          required: "Value required",
          number: "Number required",
          minimumValue: "beyond minimum value" + scope.numericField.minimumValue,
          maximumValue: "beyond maximum value" + scope.numericField.maximumValue
        };

        scope.$watch('numericValue.val', function(newValue, oldValue) {
            $log.debug("new numeric input:" + newValue);
        });

        // $window.uploadUrl = $window.uploadUrl || 'upload';
        // scope.uploadUrl = 'server/upload/url';
        // scope.uploadMethod = 'POST';
        // scope.uploadHeaders = {}; // {'header-key': 'header-value'}
        // scope.withUploadCredentials = false;

        // scope.onFileSelect = function($files) {
        //   //$files: an array of files selected, each file has name, size, and type.
        //   for (var i = 0; i < $files.length; i++) {
        //     var file = $files[i];
        //     scope.upload(file);
           
        //   }
          
        // };

        // scope.upload = function(file) {

        //    $upload.upload({
        //       url: scope.uploadUrl, 
        //       method: scope.uploadMethod,
        //       headers: scope.uploadHeaders,
        //       withCredentials: scope.withUploadCredentials,
              
        //       file: file, 
        //     }).progress(function(evt) {
        //       console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        //     }).success(function(data, status, headers, config) {
        //       // file is uploaded successfully
        //       console.log(data);
        //     });
        //     //.error(...)
        //     //.then(success, error, progress); 
        //     // access or attach event listeners to the underlying XMLHttpRequest.
        //     //.xhr(function(xhr){xhr.upload.addEventListener(...)})

        // };

        scope.dateField = {
          show: true,
          required: false,
          disabled: false,
          minimumValue: '2014-01-12',
          maximumValue: '2015-06-22',
          format: 'MM-dd-yyyy'
        };

        scope.dateValue = {
          val: '2014-01-12'
        };

        scope.dateField1 = {
          show: true,
          required: false,
          disabled: false,
          minimumValue: '2014-01-12',
          maximumValue: '2015-06-22',
          format: 'MM-dd-yyyy'
        };

        scope.dateValue1 = {
          val: '2014-01-12'
        };

        

            scope.open = function($event) {
              event.preventDefault();
              event.stopPropagation();

              scope.opened = true;
            };

            scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };

            
            // timepicker

            scope.dateErrors = {
              date: "not a date",
              min: "before min",
              max: "after max"
            }


            scope.dateErrors1 = {
              date: "not a date",
              min: "before min",
              max: "after max"
            }
            scope.timeErrors = {
              time: "not a time",
              minimumValue: "before min",
              maximumValue: "after max"
            }


            scope.myTimeField = {
              format: "24",
              required: false,
              show: true,
              disabled: false,
              minimumValue: "2:30",
              maximumValue: "4:20"
            }

            scope.myTimeValue = { 
              val: "11:39"
            };
          
            


            // scope.toggleMode = function() {
            //   scope.ismeridian = ! scope.ismeridian;
            // };

            // scope.update = function() {
            //   var d = new Date();
            //   d.setHours( 14 );
            //   d.setMinutes( 0 );
            //   scope.mytime = d;
            // };

            // scope.changed = function () {
            //   console.log('Time changed to: ' + scope.mytime);
            // };

            // scope.clear = function() {
            //   scope.mytime = null;
            // };


       

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
        // scope.open = function($event, field) {
        //   $event.preventDefault();
        //   $event.stopPropagation();
        //   field.opened = true;
        // };
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
  
  
