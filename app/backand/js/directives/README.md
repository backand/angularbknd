All Backand's directives are defined as attributes:

    <ANY directive
        field="..."
        value="..."
        form="..."
        inputClass="..."
        errors="..."
    > 
    ... 
    </ANY>

The following parameters are passed to the directives

* field - object - information of field, such as type, required, disabled, show
* value - object - values to be filled in the field
* form - object - general information on the form in which the directive is used, such as the name of the form (optional)
* inputClass - CSS classes to be used to format the directive, in one of the ngClass allowed values (string, array of strings, object) (optional)
* errors - object - error strings to be used when the directive values are not filled in a valid way. Each error string is keyed by the invalid reason, such as required, pattern, etc. (optional)

Directives support two-way data binding.

To use a directive, include in the bottom of your file, the js file of the directive.

Include in the `head` of your file, a minimal css file, 

    date.css

To use the directive, install [Angular Bootstrap](http://angular-ui.github.io/bootstrap/#/top). It can be installed using bower:

    bower install angular-bootstrap

In your controller module, declare a dependency on the `textAngular` module:
    
    angular.module('myModule', ['textAngular']);
