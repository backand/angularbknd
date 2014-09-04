To use the directive, install the [Angular bootstrap date & time picker](https://github.com/dalelotts/angular-bootstrap-datetimepicker). It can be installed using bower:

    bower install angular-bootstrap-datetimepicker

Include in the `head` of your file, 

    <link rel="stylesheet" href="bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css"/>

In your controller module, declare a dependency:
    
    angular.module('myModule', ['ui.bootstrap.datetimepicker']);

In the field parameter, the format attribute defines the format of the combined date and time string.
