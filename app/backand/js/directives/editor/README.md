To use the directive, install the [textAngular](http://textangular.com) text editor. It can be installed using bower:

    bower install textAngular

Include in the `head` of your file, a minimal css file, 

    .ta-editor in app.css

In your controller module, declare a dependency on the `textAngular` module:
    
    angular.module('myModule', ['textAngular']);