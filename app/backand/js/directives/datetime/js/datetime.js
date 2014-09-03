'use strict';

var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.directive('datetime', function($log) {
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
    	templateUrl: 'backand/js/directives/datetime/partials/datetime.html',
      link: function(scope, el, attrs) {
            if (!scope.value.val){
              scope.value.val = scope.field.defaultValue;
            };

            //var convertTextToDate = function (text, format) {
            //    var date = null;
            //    var dateTimeParts = text.split(" ");
            //    if (dateTimeParts.length < 2)
            //        return null;
            //    var datePart = dateTimeParts[0];
            //    var dateParts = datePart.split("/");
            //    if (dateParts.length != 3)
            //        return null;
            //    var timePart = dateTimeParts[1];
            //    var timeParts = timePart.split(":");
            //    if (timeParts.length != 3)
            //        return null;

            //    switch (format) {
            //        case 'dd/MM/yyyy hh:mm:ss tt':
            //            if (dateTimeParts.length < 3)
            //                break;
            //            var ampmPart = dateTimeParts[2];
                        
            //            date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]), ampmPart == 'PM' ? parseInt(timeParts[0]) + 12 : parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]), 0);
            //            break;

            //        case 'MM/dd/yyyy hh:mm:ss':
                        
            //            date = new Date(parseInt(dateParts[2]), parseInt(dateParts[0]) - 1, parseInt(dateParts[1]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]), 0);

            //            break;

            //        case 'dd/MM/yyyy hh:mm:ss':
            //            date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]), 0);

            //            break;

            //        default:
            //            date = new Date(text);
            //            break;
            //    }

            //    return date;
            //}

            //var convertDateToText = function (date, format) {
            //    var text = null;
            //    switch (format) {
            //        case 'MM/dd/yyyy hh:mm:ss tt':
            //            var hour = date.getHours();
            //            var ampm = "AM";
            //            if (hour > 12) {
            //                hour = hour - 12;
            //                ampm = "PM";
            //            }

            //            text = zfill((date.getMonth() + 1), 2) + '/' + zfill(date.getDate(), 2) + '/' + date.getFullYear() + ' ' + zfill(hour, 2) + ":" + zfill(date.getMinutes(), 2) + ":" + zfill(date.getSeconds(), 2) + " " + ampm;
            //            break;

            //        case 'dd/MM/yyyy hh:mm:ss tt':
            //            var hour = date.getHours();
            //            var ampm = "AM";
            //            if (hour > 12) {
            //                hour = hour - 12;
            //                ampm = "PM";
            //            }

            //            text = zfill(date.getDate(), 2) + '/' + zfill((date.getMonth() + 1), 2) + '/' + date.getFullYear() + ' ' + zfill(hour, 2) + ":" + zfill(date.getMinutes(), 2) + ":" + zfill(date.getSeconds(), 2) + " " + ampm;
            //            break;

            //        case 'MM/dd/yyyy hh:mm:ss':

            //            date = new Date(parseInt(dateParts[2]), parseInt(dateParts[0]) - 1, parseInt(dateParts[1]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]), 0);

            //            break;

            //        case 'dd/MM/yyyy hh:mm:ss':
            //            date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]), 0);

            //            break;

            //        default:
            //            date = new Date(text);
            //            break;
            //    }
            //    return text;
            //}

            
            scope.combinedValue = {
                //val: scope.value.val ? convertTextToDate(scope.value.val, scope.field.format) : null
                val: scope.value.val ? new Date(scope.value.val) : null
            };

            scope.value.val = JSON.stringify(scope.combinedValue.val);

            scope.combinedConfig = {
              startView: "day",
              minView: "minute",
              minuteStep: 3,
              weekStart: 0, 
              dropdownSelector: '.my-toggle-select-' + scope.field.name
            };

            scope.onTimeSet = function (newDate, oldDate) {
              if (newDate){
                  //scope.value.val = convertDateToText(newDate, scope.field.format);
                  scope.value.val = JSON.stringify(newDate);
              }        
              else{
                scope.value.val = null;
              }   
            };

            scope.tooEarly = function() {
              if (!scope.field.minimumValue)
                return false;
              var current = moment(scope.combinedValue.val);
              return current.isBefore(moment(scope.field.minimumValue));
            };
       
            scope.tooLate = function() {
              if (!scope.field.maximumValue)
                return false;
              var current = moment(scope.combinedValue.val);
              return current.isAfter(moment(scope.field.maximumValue));
            };

        }
    }         
});