function restCodeBulider() { 
    var self = this;

    self.getList = function (name, pageSize, pageNumber, filter, sort, search, deep, withSelectOptions) {

    }

    self.getItem = function (name, id, deep) {

    }

    self.getCreate = function (name, returnObject, object) {

    }

    self.getUpdate = function (name, id, returnObject, object) {

    }

    self.getDelete = function (name, id) {

    }
}

function resourceCodeBulider() {
    var self = this;

    self.getList = function (name, pageSize, pageNumber, filter, sort, search, deep, withSelectOptions) {

    }

    self.getItem = function (name, id, deep) {

    }

    self.getCreate = function (name, returnObject, object) {

    }

    self.getUpdate = function (name, id, returnObject, object) {

    }

    self.getDelete = function (name, id) {

    }
}


function restAngularCodeBulider() {
    var self = this;

    self.getList = function (name, pageSize, pageNumber, filter, sort, search, deep, withSelectOptions) {
        var code = "var " + name + "List = Restangular.all(\"" + name + "\").getList({ " + (pageSize ? "pageSize: " + pageSize + ", " : "") + (pageNumber ? "pageNumber: " + pageNumber + ", " : "") + (filter ? "filter: JSON.stringify(" + filter + ")" + ", " : "") + (sort ? "sort: JSON.stringify(" + sort + "), " : "") + (search ? "search: \"" + search + "\", " : "") + (deep ? "deep: " + deep + ", " : "") + (withSelectOptions ? "withSelectOptions: " + withSelectOptions : "");
        if (code[code.length - 2] == ",")
            code = code.slice(0, -2);
        if (code[code.length - 2] == "{") {
            code = code.slice(0, -2);
            code += ").$object;";
        }
        else {
            code += " }).$object;";
        }

        var code2 = "Restangular.all(\"" + name + "\").getList({ " + (pageSize ? "pageSize: " + pageSize + ", " : "") + (pageNumber ? "pageNumber: " + pageNumber + ", " : "") + (filter ? "filter: JSON.stringify(" + filter + ")" + ", " : "") + (sort ? "sort: JSON.stringify(" + sort + "), " : "") + (search ? "search: \"" + search + "\", " : "") + (deep ? "deep: " + deep + ", " : "") + (withSelectOptions ? "withSelectOptions: " + withSelectOptions : "");
        if (code2[code2.length - 2] == ",")
            code2 = code2.slice(0, -2);
        if (code2[code2.length - 2] == "{") {
            code2 = code2.slice(0, -2);
            code2 += ")";
        }
        else {
            code2 += " })";
        }
        code2 += ".then(function (" + name + ") {\n" +
        "\t" + "//...\n" +
        "\t" + "// Iterate through the array\n" +
        "\t" + "//...\n" +
        "});";
        return [{ description: "Get list", code: code }, { description: "With promise", code: code2 }];
    }

    self.getItem = function (name, id, deep) {
        return [{ description: "Get a single item by id", code: "var " + name + id + " = Restangular.one(\"" + name + "\", " + id + ").get(" + (deep ? "{ deep: " + deep + " }" : "") + ").$object;" },
            {
                description: "With promise", code: "Restangular.one(\"" + name + "\", " + id + ").get(" + (deep ? "{ deep: " + deep + " }" : "") + ").then(function(" + name + id + ") {\n" +
                "\t" + "//...\n" +
                "\t" + "// Handle the object\n" +
                "\t" + "//...\n" +
                "});"
            }
        ];
    }

    self.getCreate = function (name, returnObject, object) {
        return [{
            description: "Create a single item",
            code: (returnObject ? "// Set the returnObject to true if you have business logic that does additional server updates to the object beside the updates from the ui.\n" : "") +
            (returnObject ? "var new" + name + " = " : "") + "Restangular.all('" + name + "').post(" + object + (returnObject ? ", { returnObject: " + returnObject + " }" : "") + ")" + (returnObject ? ".$object;" : ";")
        }];
    }

    self.getUpdate = function (name, id, returnObject, object) {
        return [
            {
                description: "Get a list or single item and update it",
                code: "Restangular.one(\"" + name + "\", " + id + ").get().then(function (" + name + id + ") {\n" +
                "\t" + "//...\n" +
                "\t" + "// make some changes in the object\n" +
                "\t" + "//...\n" +
                (returnObject ? "\t// Set the returnObject to true if you have business logic that does additional server updates to the object beside the updates from the ui.\n" : "") +
                "\t" + (returnObject ? name + id + " = " : "") + name + id + ".put(" + (returnObject ? "{ returnObject: " + returnObject + " }" : "") + ");\n" +
                "});"
            },
            {
                description: "Update a single item",
                code: (returnObject ? "var " + name + id + " = " : "") + "Restangular.all(\"" + name + "\").customPUT(" + object + ", " + id + (returnObject ? ", { returnObject: " + returnObject + " }" : "") + ")" + (returnObject ? ".$object;" : ";")
            }
        ];

        
    }

    self.getDelete = function (name, id) {
        return [
            {
                description: "Get a list or single item and delete it",
                code: "Restangular.one(\"" + name + "\", " + id + ").get().then(function (" + name + id + ") {\n" +
                "\t" + name + id + ".remove();\n" +
                "});"
            },
            {
                description: "Delete a single item",
                code: "Restangular.all(\"" + name + "\").customDELETE(" + id + ")"
            }
        ];
    }

    return self;
}