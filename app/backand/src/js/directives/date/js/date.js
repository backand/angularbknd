'use strict';
/**
* @ngdoc overview
* @name directive.date
*/
angular.module('backAnd.directives')
    .directive('date', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.date
    * @description date element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
    * @param {string} inputClass, optional, optional css class
    * @param {string} errors, optional, error messages
    * @returns {object} directive
    */
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
    	templateUrl: 'backand/js/directives/date/partials/date.html',
        link: function(scope) {
            var date = null;
            if (scope.value.val) {
                if (scope.value.val.toLowerCase() == "now")
                    date = new Date();
                else
                    date = new Date(scope.value.val);
            };

            /**
            * @name mydate
            * @propertyOf directive.date {date} 
            * @description convert initial string to date
            */
            scope.mydate = date;


            /**
            * @name opened
            * @propertyOf directive.date {boolean} 
            * @description opened flag
            */
            scope.opened = false;
            /**
             * @name open
             * @methodOf directive.date
             * @description stop the click event and switch to opened state
             * @param {object} $event, required, angular event
             */
            scope.open = function ($event) {
              event.preventDefault();
              event.stopPropagation();
              scope.opened = true;
            };

            /**
            * @name dateOptions
            * @propertyOf directive.date {object} 
            * @description convert format date
            */
            scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };

            /**
             * @name mydate
             * @methodOf directive.date
             * @description convert the date back to string
             * @param {date} newValue, required, new date entered
             * @param {date} oldValue, optional, previous date
             */
            scope.$watch("mydate", function (newValue, oldValue) {
                if (newValue)
                    scope.value.val = JSON.stringify(newValue);
                else
                    scope.value.val = null;
            });

            /**
             * @name tooEarly
             * @methodOf directive.date
             * @description minimum value validation
             */
            scope.tooEarly = function() {
              if (!scope.field.minimumValue)
                return false;
              var current = moment(scope.mydate);
              return current.isBefore(moment(scope.field.minimumValue));
            };
       
            /**
             * @name tooLate
             * @methodOf directive.date
             * @description maximum value validation
             */
            scope.tooLate = function () {
              if (!scope.field.maximumValue)
                return false;
              var current = moment(scope.mydate);
              return current.isAfter(moment(scope.field.maximumValue));
            };

        }
    }         
}]);