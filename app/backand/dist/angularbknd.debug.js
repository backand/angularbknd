/*
 angularbknd v0.9.1 
 (c) Copyright 2014 Backand All rights reserved. https://backand.com 
 License: MIT
 */
/***********************************************
* backand JavaScript Library
* Authors: backand 
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
* Compiled At: 06/24/2014 
***********************************************/

var backand = {
    /* initiate app and user security tokens */
    options: {
        url: '',
        version: '1',
        getUrl: function (apiUrl) {
            return this.url + '/' + this.version + apiUrl;
        },
        /* general ajax call for backand rest api */
        ajax: function (url, data, verb, successCallback, erroCallback) {

        },
        verbs: { get: "GET", put: "PUT", post: "POST", delete: "DELETE" }


    },
    security: {
        banner: {
            url: '/api/banner',
            getAdminInfo: function () {
                var adminInfo = null;
                backand.options.ajax(backand.options.url + backand.security.banner.url, null, backand.options.verbs.post, function (data) { adminInfo = data; }, function (xhr, textStatus, err) {
                    if (xhr) {
                        if (xhr.responseJSON) {
                            if (xhr.responseJSON.error_description) {
                                console.error("ERROR: " + xhr.responseJSON.error_description)
                            }
                            else {
                                if (err) {
                                    console.error("ERROR: " + JSON.stringify(err));
                                }
                                else {
                                    console.error("ERROR: Failed to getAdminInfo");
                                }
                            }
                        }
                        else {
                            console.error("ERROR: " + JSON.stringify(xhr));
                        }
                    }
                    else {
                        if (err) {
                            console.error("ERROR: " + JSON.stringify(err));
                        }
                        else {
                            console.error("ERROR: Failed to getAdminInfo");
                        }
                    }
                });
                return adminInfo;
            }

        },
        authentication: {
            url: "/token",
            token: null,
            onlogin: null,
            addLoginEvent: function (appname) {
                if (backand.security.authentication.onlogin != null) return;
                // Create the event
                if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    backand.security.authentication.onlogin = document.createEvent("CustomEvent");
                    backand.security.authentication.onlogin.initCustomEvent('onlogin', false, false, { "appname": appname });
                }
                else {
                    backand.security.authentication.onlogin = new CustomEvent("onlogin", { "appname": appname });
                }
            },

            login: function (username, password, appname, successCallback, errorCallback) {
                backand.security.authentication.addLoginEvent();
                backand.options.ajax(backand.options.url + backand.security.authentication.url, { grant_type: "password", username: username, password: password, appname: appname }, backand.options.verbs.post, function (data) {
                    backand.security.authentication.token = data.token_type + " " + data.access_token;
                    document.dispatchEvent(backand.security.authentication.onlogin);
                    if (successCallback) successCallback(data);
                },

                function (xhr, textStatus, err) {
                    if (errorCallback && xhr) errorCallback(xhr, textStatus, err)
                },
                true);
            }
        },
        unlock: function (username, successCallback, errorCallback) {
            var url = backand.options.getUrl('/account/unlock');
            backand.options.ajax(url, JSON.stringify({username: username}), backand.options.verbs.post, successCallback, errorCallback);

        }
    },

    api: {
        /* app is the object the contains the information of all the genral content of the app */
        app: {
            url: '/app/config',
            /* get the configuration information of the app */
            getConfig: function (successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.app.url);
                backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        },
        /* view is the object the contains the information about a database table or view */
        view: {
            config: {
                url: '/view/config/',
                /* get the configuration information of the view such as view name, columns names and columns types */
                getItem: function (name, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.config.url + name);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.config.url);
                    var data = { withSelectOptions: withSelectOptions, pageNumber: pageNumber, pageSize: pageSize, filter: JSON.stringify(filter), sort: JSON.stringify(sort), search: search };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
                getFieldByName: function (configView, fieldName) {
                    if (!configView.hashFieldsByName) {
                        configView.hashFieldsByName = {};
                        for (var i = 0; i < configView.fields.length; i++) {
                            var field = configView.fields[i];
                            configView.hashFieldsByName[field.name] = field;
                        }
                    }

                    return configView.hashFieldsByName[fieldName];
                },

            },
            /* get the view data */
            data: {
                url: '/view/data/',
                /* get a single row by the primary key (id) */
                getItem: function (name, id, deep, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    var data = { deep: deep };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);
                },
                /* get a list of rows with optional filter, sort and page */
                getList: function (name, withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name);
                    var data = { withSelectOptions: withSelectOptions, pageNumber: pageNumber, pageSize: pageSize, filter: JSON.stringify(filter), sort: JSON.stringify(sort), search: search };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
                createItem: function (name, data, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name);
                    backand.options.ajax(url, data, backand.options.verbs.post, successCallback, errorCallback);
                },
                updateItem: function (name, id, data, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    backand.options.ajax(url, data, backand.options.verbs.put, successCallback, errorCallback);
                },
                deleteItem: function (name, id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    backand.options.ajax(url, null, backand.options.verbs.delete, successCallback, errorCallback);
                },
                autoComplete: function (viewName, fieldName, data, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + "autocomplete/" + viewName + '/' + fieldName);
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);
                }
            }

        },
        /* dashboard is a collection of charts */
        dashboard: {
            config: {
                url: '/dashboard/config/',
                /* get the configuration information of a specific dashboard */
                getItem: function (id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.config.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.config.url);
                    var data = { withSelectOptions: withSelectOptions, pageNumber: pageNumber, pageSize: pageSize, filter: JSON.stringify(filter), sort: JSON.stringify(sort), search: search };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
            },
            /* get the data of all the charts in this dashboard */
            data: {
                url: '/dashboard/data/',
                getItem: function (id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.data.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
            }

        },
        chart: {
            config: {
                url: '/chart/config/',
                /* get the configuration information of a specific chart */
                getItem: function (id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.config.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.config.url);
                    var data = { withSelectOptions: withSelectOptions, pageNumber: pageNumber, pageSize: pageSize, filter: JSON.stringify(filter), sort: JSON.stringify(sort), search: search };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
            },
            data: {
                url: '/chart/data/',
                /* get the data of a specific chart */
                getItem: function (id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.data.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
            }

        },
        content: {
            config: {
                url: '/content/config/',
                /* get the configuration information of a specific content */
                getItem: function (id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.content.config.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.content.config.url);
                    var data = { withSelectOptions: withSelectOptions, pageNumber: pageNumber, pageSize: pageSize, filter: JSON.stringify(filter), sort: JSON.stringify(sort), search: search };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
            }
        },
    },
    filter: {
        item: function (fieldName, operator, value) {
            this.fieldName = fieldName;
            this.operator = operator;
            this.value = value;
        },
        operator: {
            numeric: { equals: "equals", notEquals: "notEquals", greaterThan: "greaterThan", greaterThanOrEqualsTo: "greaterThanOrEqualsTo", lessThan: "lessThan", lessThanOrEqualsTo: "lessThanOrEqualsTo", empty: "empty", notEmpty: "notEmpty" },
            date: { equals: "equals", notEquals: "notEquals", greaterThan: "greaterThan", greaterThanOrEqualsTo: "greaterThanOrEqualsTo", lessThan: "lessThan", lessThanOrEqualsTo: "lessThanOrEqualsTo", empty: "empty", notEmpty: "notEmpty" },
            text: { equals: "equals", notEquals: "notEquals", startsWith: "startsWith", endsWith: "endsWith", contains: "contains", notContains: "notContains", empty: "empty", notEmpty: "notEmpty" },
            boolean: { equals: "equals" },
            relation: { in: "in" },
        },
    },
    sort: {
        item: function (fieldName, order) {
            this.fieldName = fieldName;
            this.order = order;
        },
        order: { asc: "asc", desc: "desc" }

    },
    defaultFieldValue: function (fieldName, value) {
        this.fieldName = fieldName;
        this.value = value;
    },

};


backand.filter.item.prototype.constructor = backand.filter.item;

backand.filter.item.prototype.fieldName = function () {
    return this.fieldName;
};

backand.filter.item.prototype.operator = function () {
    return this.operator;
};

backand.filter.item.prototype.value = function () {
    return this.value;
};


backand.sort.item.prototype.constructor = backand.sort.item;

backand.sort.item.prototype.fieldName = function () {
    return this.fieldName;
};

backand.sort.item.prototype.order = function () {
    return this.order;
};

backand.defaultFieldValue.prototype.constructor = backand.defaultFieldValue;

backand.defaultFieldValue.prototype.fieldName = function () {
    return this.fieldName;
};

backand.defaultFieldValue.prototype.value = function () {
    return this.value;
};




backand.security.authentication.login('nir', 123456789, 'manager', function (data) {


    backand.api.view.data.getList('list')




} ,null);






;backand.options.ajax = function (url, data, verb, successCallback, erroCallback, forToken) {
    $.ajax({
        url: url,
        async: false,
        type: verb,
        beforeSend: function (xhr) {
            if (!forToken)
                xhr.setRequestHeader('Authorization', backand.security.authentication.token);
        },
        data: data,
        dataType: 'json', 
        cache: false,
        error: function (xhr, textStatus, err) { if (xhr, textStatus, err) erroCallback(xhr, textStatus, err); },
        success: function (data, textStatus, xhr) { if (successCallback) successCallback(data, textStatus, xhr); }
    });
};var url ="https://api.backand.com:8080";
try{url = myUrl} catch(err){}
var backandGlobal = {
    url: url,//
    defaultApp: null
};

//load the backand banner
$(document).ready(function () {
    angular.element(document).ready(function () {
        backand.security.authentication.addLoginEvent();
        document.dispatchEvent(backand.security.authentication.onlogin);
    });
});


var zfill = function (num, len) { return (Array(len).join("0") + num).slice(-len); }
;'use strict';
/**
 * @ngdoc overview
 * @name service.gridService
 */
angular.module('backAnd')
    .factory('dataListService', ['$resource', function ($resource, CONSTANTS) {
        /**
         * @ngdoc service
         * @name service.gridService
         * @description get the grid data
         * @param {string} viewName, the name of the view or table from the database
         * @param {integer} pageSize, the number of rows in a page
         * @param {integer} pageNumber, the number of the page
         * @param {boolean} withSelectOptions, default false, if true then it gets the select options of each parent relation fields that is not an autocomplete field
         * @param {string} filter, a json array of {fieldName, operator, value}
         * @param {string} sort,  a json array of {fieldName, ascending or descending oreder}
         * @param {string} search,  a free text search
         */
//        return $resource(CONSTANTS.URL + '/1/:dataType/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
	    return $resource(backandGlobal.url + '/1/:dataType/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
            dataType: 'view',
            viewName: '',
            pageSize: '',
            pageNumber: '',
            withSelectOptions: '',
            filter: '',
            sort: '',
            search: ''
        }, {
            read: {
                method: 'GET',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
    ]);

/**
 * @ngdoc overview
 * @name service.gridViewDataItemService
 */
angular.module('backAnd').factory('dataItemService', ['$resource',
    function ($resource) {
        /**
         * @ngdoc service
         * @name service.gridViewDataItemService
         * @description get a single row data
         * @param {string} viewName, the name of the view or table from the database
         * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
         */


        return $resource(backandGlobal.url + '/1/:dataType/data/:viewName/:id?:qs', {
                dataType: 'view',
                viewName: '',
                id: 'id',
                qs: ''
            },
            {
                read: {
                    method: 'GET',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                create: {
                    method: 'POST',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                update: {
                    method: 'PUT',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                delete: {
                    method: 'DELETE',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                }
            });
    }



]);


//************************************** EXAMPLE **************************************** //

//angular.module('backAnd')
//    .service('dataItemService', ['$http', 'CONSTANTS', function ($http, CONSTANTS) {
//
//        var baseUrl = CONSTANTS.URL + '/1/:dataType/data/:viewName/:id';
//
//        this.read = function (dataType, viewName, id) {
//            return $http({
//                url: baseUrl + '/1/' + dataType + '/data/' + viewName + '/' + id,
//                cache: false,
//                responseType: 'json'
//            })
//        };


//        return $resource(backandGlobal.url + '/1/:dataType/data/:viewName/:id', {
//                dataType: 'view',
//                viewName: '',
//                id: 'id'
//            },
//            {
//                read: {
//                    method: 'GET',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                create: {
//                    method: 'POST',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                update: {
//                    method: 'PUT',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                },
//
//                delete: {
//                    method: 'DELETE',
//                    params: {
//                        callback: 'JSON_CALLBACK'
//                    }
//                }
//            });
//    }



//    ]);

























;'use strict';
/**
 * @ngdoc overview
 * @name service.gridConfigService
 */
angular.module('backAnd')
    .factory('configService', ['$resource', function ($resource) {

        /**
         * @ngdoc service
         * @name service.gridService
         * @description get the grid configuration
         * @param {string} viewName, the name of the view or table from the database
         */
        return $resource(backandGlobal.url + '/1/:dataType/config/:id', {
            dataType: 'view',
            id: ''
        }, {
            read: {
                method: 'GET',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
    ]);

/**
 * @ngdoc overview
 * @name service.menuService
 */
angular.module('backAnd.services').
    value('version', '0.1');

angular.module('backAnd.services').factory('menuService', ['$resource',
    function ($resource) {
        /**
         * @ngdoc service
         * @name service.menuService
         * @description get the app configuration, menu, company and user profile
         */
        return $resource(backandGlobal.url + '/1/app/config', { workspaceId: 'workspaceId' }, {
            queryjsonp: {
                method: 'GET',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
]);


;angular.module('backAnd.services')
    .constant('CONSTANTS', {
        URL: "https://api.backand.com:8080",
        DEFAULT_APP: null,
        VERSION : '0.1'
    });;'use strict';

//Global service for global variables
angular.module('backAnd.services')
    .factory('Global', [
        function () {
            var _this = this;
            _this._data = {
                user: window.user,
                authenticated: !!window.user
            };

            return _this._data;
        }
    ]);
;'use strict';
/**
 * @ngdoc overview
 * @name service.gridService
 */
angular.module('backAnd')
    .factory('filterService', ['$http', '$log', 'Global',
    function ($http, $log, Global) {
        return {

            getFilterOptions: function (viewName, callback) {
               if (!Global.filterOptions) {
                   Global.filterOptions = [];
                }
               if (!Global.filterOptions[viewName]) {
                    $http.get(backandGlobal.url + '/1/view/data/' + viewName, {
                        params: { pageSize: 1, pageNumber: 1, withFilterOptions: true }
                    })
                    .then(function (response) {
                        Global.filterOptions[viewName] = response.data.filterOptions;
                        callback(Global.filterOptions[viewName]);
                    });
                }
                else {
                    callback(Global.filterOptions[viewName]);
                }

            }
        }
    }]);



;'use strict';

/**
 * @ngdoc overview
 * @name controller.menuController
 */
angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', '$compile', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function ($scope, Global, $compile, menuService, $timeout, $rootScope, $http, $location) {

            $scope.global = Global;


            /**
             * @ngdoc function
             * @name loadMenu
             * @methodOf backand.js.controllers:menuController
             * @description loads the menu with api
             * @param {object} workspaceId, required, each workspace have a different menu
             */
            $scope.loadMenu = function (workspaceId) {
                menuService.queryjsonp({ workspaceId: workspaceId },
                    function success(data) {
                        $scope.currentWorkspace = data.workspace;
                        //$scope.pages = data.workspace.pages;
                        //$scope.currentWorkspace = data.workspace;
                        $scope.additionalWorkspaces = data.additionalWorkspaces;

                        $location.search(
                            'workspaceId', data.workspace.id
                        );

                        $scope.$broadcast('appConfigCompleted', data);

                        $timeout(function () {
                            $(window).trigger("appConfigCompleted", data);
                        });

                        if (!$location.search().viewName && !$location.search().dashboardId && !$location.search().contentId && $scope.currentWorkspace.homePage) {
                            var homePage = $scope.getHomePage($scope.currentWorkspace, $scope.currentWorkspace.homePage);

                            if (homePage)
                                $scope.setCurrentMenuSelection(homePage);
                        }
                    },
                    function err(error) {
                        if (error.status == 401) {
                            localStorage.removeItem("Authorization");
                            window.location.reload();
                        }
                    });
            }

            $scope.getHomePage = function (parent, id) {
                for (var i = 0; i < parent.pages.length; i++) {
                    var page = parent.pages[i];
                    if (page.id == id)
                        return page;
                    else if (page.pages)
                        return $scope.getHomePage(page, id);
                }
                return null;
            }

            /**
             * @ngdoc function
             * @name setCurrentMenuSelection
             * @methodOf backand.js.controllers:menuController
             * @description set the selected menu and opens the selected part
             * @param {object} current, required, current selected menu
             * @param {object} parent, optional, parent selected menu for breadcrumbs
             */
            $scope.setCurrentMenuSelection = function (current, parent) {
                if (current.partType == "table") {
                    $location.search({
                        viewName: current.partId,
                        workspaceId: $scope.currentWorkspace.id
                    });
                    $location.path("/grids");
                }
                else if (current.partType == "dashboard") {
                    $location.search({
                        dashboardId: current.partId
                    });
                    $location.path("/dashboard");
                }
                else if (current.partType == "content") {
                    $location.search({
                        contentId: current.partId
                    });
                    $location.path("/content");
                }
                $scope.curTable = current.index;

                $scope.setBreadcrumbs(current, parent);

                $scope.$broadcast('menuItemSelected', current);

            }

            /**
             * @ngdoc function
             * @name setBreadcrumbs
             * @methodOf backand.js.controllers:menuController
             * @description set the breadcrumbs
             * @param {object} current, required, current selected menu
             * @param {object} parent, optional, parent selected menu
             */
            $scope.setBreadcrumbs = function (current, parent) {
                $scope.breadcrumbs = [
                    { name: $scope.currentWorkspace.name }
                ];
                if (parent)
                    $scope.breadcrumbs.push(parent);
                $scope.breadcrumbs.push(current);
            }

            /**
             * @ngdoc function
             * @name init
             * @methodOf backand.js.controllers:menuController
             * @description initiate the configuration of the menu
             */
            $scope.init = function () {

                if (!localStorage.getItem('Authorization')) {
                    $location.path('/login');
                } else {
                    if ($location.$$path == "/login") {
                        $location.path('/');
                    }
                    $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                    backand.security.authentication.token = $http.defaults.headers.common['Authorization'];

                    var workspaceId = null;
                    var search = $location.search();
                    if (search && search.workspaceId)
                        workspaceId = search.workspaceId;

                    $scope.loadMenu(workspaceId);
                }
            }

            $scope.isGrid = function () {
                return $location.path().indexOf('grid') != -1;
            }
        }


    ])
;'use strict';
/**
* @ngdoc overview
* @name controller.profileController
*/
angular.module('backAnd.controllers')
    .controller('profileController', ['$scope', 'Global', 'menuService', '$http',
        /**
        * @ngdoc function
        * @name init
        * @methodOf backand.js.controllers:profileController
        * @description initiate the configuration of the user profile
        */
        function($scope, Global, menuService, $http) {
            $scope.global = Global;
            $scope.init = function() {
                menuService.queryjsonp({
                }, function(data) {
                    $scope.profile = data.company;
                    $scope.profile.img = decodeURIComponent($scope.profile.logo);
                    $scope.profile.fullName = data.user.fullName;
                    $scope.profile.username = data.user.username;
                });
            }
            $scope.logOut = function() {
                localStorage.removeItem('Authorization');
                window.location.reload();
            }

        }
    ])
;'use strict';

/**
* @ngdoc overview
* @name controller.signInController
*/

angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global', '$http', '$location', '$rootScope','$route',
        function($scope, Global, $http, $location, $rootScope, $route) {
            $scope.global = Global;

            function toQueryString(obj) {
                var parts = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                    }
                }
                return parts.join("&");
            }

            function getDefaultApp() {
                if (backandGlobal.defaultApp)
                    return backandGlobal.defaultApp;

                var hostSegments = location.hostname.split('.');
                if (hostSegments.length > 1) {
                    return hostSegments[0];
                }
                return '';
            }

            /**
            * @name appName
            * @propertyOf directive.signInController {string} 
            * @description application name
            */
            $scope.appName = getDefaultApp();

            if ($location.search().username)
                $scope.user = $location.search().username;
            if ($location.search().password)
                $scope.password = $location.search().password;

            /**
            * @name waiting
            * @propertyOf directive.signInController {boolean} 
            * @description on and off switch to display waiting while authentication is processed
            */
            $scope.waiting = false;

            /**
            * @ngdoc function
            * @name authentication
            * @methodOf backand.js.controllers:signInController
            * @description authenticate the user
            */
            $scope.authentication = function() {
                $scope.loginError = '';
                $scope.waiting = true;
                localStorage.removeItem("Authorization");
                var data = toQueryString({
                    grant_type: "password",
                    username: $scope.user,
                    password: $scope.password,
                    appname: $scope.appName,
                });
                var request = $http({
                    method: 'POST',
                    url: backandGlobal.url + "/token",
                    data: data,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                request.success(function(data, status, headers, config) {
                    $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
                    localStorage.setItem('Authorization', $http.defaults.headers.common['Authorization']);
                    backand.security.authentication.token = $http.defaults.headers.common['Authorization'];
                    $location.path('/');
                    window.location.reload()
                });
                request.error(function (data, status, headers, config) {
                    var error_description = "The server is busy. Please contact your administrator or try again later.";
                    if (data && data.error_description)
                        error_description = data.error_description;
                    else {
                        console.error(error_description, { data: data, status: status, headers: headers, config: config })
                    }
                    $scope.loginError = error_description;
                    //console.log(status)
                    $scope.waiting = false;
                });

            }


        }
    ])
;'use strict';

/* Filters */

var backAndFilters = angular.module('backAnd.filters', []);

backAndFilters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);
  
backAndFilters.directive('isDate', function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attr, ngModel) {
        function validate(value) {
          var d = Date.parse(value);
          // it is a date
          if (isNaN(d)) { // d.valueOf() could also work
            ngModel.$setValidity('valid', false);
          } else {
            ngModel.$setValidity('valid', true);
          }
        }
      }
    };
});

backAndFilters.directive('toNumber', function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        return ctrl.$parsers.push(function (value) {
            return parseFloat(value || '');
        });
      }
    };
});


backAndFilters.filter('parseInt', function () {
    return function (a, b) {
        return (parseInt(a))
    }
});

backAndFilters.filter('removeSpaces', function () {
    return function (text) {
        return text.replace(' ', '');
    }
});;/**
 * @ngdoc overview
 * @name directive.bkndNgGrid
 */
angular.module('backAnd.directives')
    .directive('bkndNgGrid', ['Global', 'dataListService', 'dataItemService', 'configService', '$filter', 'filterService', '$location', '$route', '$sce', '$compile', '$window',
        function (Global, dataListService, dataItemService, configService, $filter, filterService, $location, $route, $sce, $compile, $window) {
        /**
         * @ngdoc directive
         * @name directive.bkndNgGrid
         * @description grid element, ng-grid wrapper that binds to backand rest api
         * @param {string} viewName, view or table from the database
         * @param {object} options, ng-grid options
         * @param {object} filterOptions, backand rest api filter options: {fieldName, operator, value}
         * @param {string} inputStyle, optional, optional css class
         * @returns {object} directive
         */
        return {
            restrict: 'E',
            scope: {
                viewName: '=',
                options: '=',
                filterOptions: '=',
                inputStyle: '=',
                buttonGroups: '=',
                disableEditOnDblClick: '='
            },
            replace: false,
            templateUrl: ($(window).width() > 768) ? 'backand/js/directives/grids/partials/grid.html' : 'backand/js/directives/grids/partials/grid-mobile.html',

            /**
             * @name link
             * @methodOf directive.bkndNgGrid
             * @description manage the scope of the bkndNgGrid directive
             * @param {object} scope, required, the scope of the directive
             * @param {object} el, required, the element of the directive
             * @param {object} attrs, required, the attributes of the directive
             */
            link: function (scope) {
                scope.global = Global;
                scope.isMobile = $(window).width() < 768;
                /**
                 * @ngdoc function
                 * @name viewName
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Get the new Backand's view name and re-load the configraion
                 *              and data
                 */
                scope.$watch('viewName', function () {
                    if (scope.viewName) {
                        scope.viewNameId = scope.viewName;
                        scope.buildNewGrid(scope.viewNameId);
                        //scope.getData();

                    }
                    else if ($location.$$path == '/grids' && $location.search().viewName) {
                        scope.viewNameId = $location.search().viewName;
                        scope.buildNewGrid(scope.viewNameId);
                        //scope.getData();
                    }
                });

                 /**
                 * @ngdoc function
                 * @name buildNewGrid
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Due to limitations in ng-grid, in order to reload the settings,
                 *              we must remove it and rebuild it.
                 *              Configuration loaded async
                 * @param {string} viewName reference to view name
                 */
                scope.buildNewGrid = function (viewName) {
                    scope.isLoad = true;
                    var configTable = {};
                    //Read the View's configuration
                    configService.read({
                        dataType: "view",
                        id: viewName
                    }, function (data) {
                        scope.$emit('gridConfigCompleted', data);

                        scope.configTable = data;
                        var tableElementScope = $("#bknd-grid_" + scope.viewNameId + " .ngGrid").scope();
                        if (tableElementScope) {
                            $("#bknd-grid_" + scope.viewNameId + " .ngGrid").remove();
                        }
                        var inputStyle = (scope.inputStyle) ? angular.toJson(scope.inputStyle).replace(/\"/gi, "'") : 'getTableStyle()';
                        var html = '<div ng-if="dataTable" ng-style="' + inputStyle + '" ng-grid="dataTable"></div>';
                        // Step 1: parse HTML into DOM element
                        var template = angular.element(html);
                        // Step 2: compile the template
                        var linkFn = $compile(template);
                        //Step 3: link the compiled template with the scope.
                        var element = linkFn(scope);
                        // Step 4: Append to DOM
                        $("#bknd-grid_" + scope.viewNameId).append(element);

                        scope.setNGGridConfiguration();
                    });
                };

                scope.setNGGridConfiguration = function () {
                    //Grid Settings


                    scope.dataTable = {};
                    scope.columns = [];
                    scope.sortOptions = {};
                    scope.mySelections = [];
                    scope.totalServerItems = 0;


                    scope.pagingOptions = {
                        pageSizes: [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000],
                        pageSize: scope.configTable.design.rowsperPage,
                        currentPage: 1
                    };

                    scope.dataTable = {
                        columnDefs: 'columns',
                        data: 'dataFill',
                        selectedItems: scope.mySelections,
                        enablePaging: true,
                        showFooter: scope.configTable && scope.configTable.toolbarSettings.hideFooter ? !scope.configTable.toolbarSettings.hideFooter : true,
                        useExternalSorting: true,
                        sortOptions: scope.sortOptions,
                        totalServerItems: 'totalServerItems',
                        pagingOptions: scope.pagingOptions,
                        rowHeight: scope.configTable && scope.configTable.design.rowHeightInPixels ? scope.configTable.design.rowHeightInPixels : 30,
                        headerRowHeight: 30,
                        footerRowHeight: 47,
                        multiSelect: false,
                        enableColumnResize: true,
                        rowTemplate: '<div ' + (scope.disableEditOnDblClick ? '' : 'ng-dblclick="editSelected(row)" ') + 'ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>',
                        // grid edititing
                        //enableCellEditOnFocus: true,
                    };
                    if (scope.isMobile)
                        scope.dataTable.plugins = [new ngGridFlexibleHeightPlugin()];

                    //Grid caption
                    scope.global.currentName = scope.configTable.captionText;
                    //Toolbar setting
                    scope.showToolbar = scope.configTable && scope.configTable.toolbarSettings ? !scope.configTable.toolbarSettings.hideToolbar : true;
                    scope.showSearch = scope.configTable && scope.configTable.design ? !scope.configTable.design.hideSearchBox : true;
                    scope.showAdd = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowAdd : true;
                    scope.showEdit = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowEdit : true;
                    scope.showDelete = scope.configTable && scope.configTable.dataEditing ? scope.configTable.dataEditing.allowDelete : true;
                    scope.showFilter = scope.configTable && !scope.configTable.hideFilter;
                    scope.collapseFilter = scope.configTable && !scope.configTable.collapseFilter;
                    
                    scope.filterToolbarOptionsOutput = null;

                    if (scope.showFilter) {
                        filterService.getFilterOptions(scope.viewNameId, function (data) {
                            scope.$emit('filterToolbarOptionsInput', data, scope);
                            scope.filterToolbarOptions = data;
                        });
                    }

                    scope.filterScope = null;

                    scope.$on('onfilter', function (event, filterToolbarOptions, filterScope) {
                        scope.filterScope = filterScope;
                        scope.filterToolbarOptionsOutput = filterToolbarOptions;
                        scope.$emit('filterToolbarOptionsOutput', scope.filterToolbarOptionsOutput, scope, filterScope);

                        scope.getData();
                    });

                    // Grid footer custom style
                    if (!scope.isMobile)
                        scope.dataTable.footerTemplate =
                            '<div class="ngFooterPanel" ng-show="showFooter" style="height:{{footerRowHeight}}px;">' +
                            '<div class="col-xs-3 text-left" style="margin-top: 12px;">' +
                            '<span>Showing {{pagingOptions.pageSize * (pagingOptions.currentPage-1) +1}} to {{footerPageMax(pagingOptions.pageSize,pagingOptions.currentPage,maxRows())}} of {{maxRows()}} rows</span>' +
                            '</div>' +
                            '<div class="col-xs-3 text-right" style="margin-top: 12px;">' +
                            '<span>{{i18n.ngPageSizeLabel}}&nbsp;</span>' +
                            '<select class="bkndGridSelect" ng-model="pagingOptions.pageSize" >' +
                            '<option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>' +
                            '</select>' +
                            '</div>' +
                            '<div class="col-xs-6 text-right">' +
                            '<pagination style="margin-top:6px;" total-items="maxRows()" ng-model="pagingOptions.currentPage" max-size="5" class="pagination-md" boundary-links="true" rotate="false" items-per-page="pagingOptions.pageSize"></pagination>' +
                            '</div>' +
                            '</div>';
                    else
                        scope.dataTable.footerTemplate =
                            '<div class="ngFooterPanel" ng-show="showFooter" style="height:{{footerRowHeight}}px;">' +
                            '<div class="col-xs-6 text-left" style="margin-top: 12px;">' +
                            '<span>{{pagingOptions.pageSize * (pagingOptions.currentPage-1) +1}} to {{footerPageMax(pagingOptions.pageSize,pagingOptions.currentPage,maxRows())}} of {{maxRows()}} rows</span>' +
                            '</div>' +
                            '<div class="col-xs-6 text-right">' +
                            '<pagination style="margin-top:6px;" total-items="maxRows()" ng-model="pagingOptions.currentPage" max-size="0" class="pagination pagination-sm" boundary-links="false" rotate="false" items-per-page="pagingOptions.pageSize"></pagination>' +
                            '</div>' +
                            '</div>';

                    scope.footerPageMax = function (pageSize, currentPage, max) {
                        return Math.min((pageSize * currentPage), max);
                    };

                    //update the configuration
                    scope.newButton = scope.configTable.description.newButtonName;
                    scope.editButton = scope.configTable.description.editButtonName;
                    scope.deleteButton = scope.configTable.description.deleteButtonName;
                    scope.setToolbar();

                    // We are adding columns and its custom filter to the table based on type
                    // this will also need to be changed to handle multiple tables on the same page
                    angular.forEach(scope.configTable.fields, function (col) {
                        if (!col.donotDisplayinGrid) {
                            scope.columns.push({
                                headerCellTemplate: scope.myHeaderCellTemplate(col, scope.configTable),
                                cellFilter: col.type,
                                displayName: col.displayName,
                                width: col.columnWidth,
                                cellTemplate: scope.getCellTemplate(col, scope.configTable),
                                //// grid edititing
                                //enableCellEditOnFocus: true,
                                //editableCellTemplate: scope.getEditableCellTemplate(col, scope.configTable),
                            });
                        }
                    });

                };

                scope.setToolbar = function () {
                    if (scope.buttonGroups)
                        scope.btnGroups = scope.buttonGroups;
                    else
                        scope.btnGroups = [
                            { buttons: [
                                { text: scope.newButton, iconClass: "glyphicon-plus", callback: scope.addRow },
                                { text: scope.editButton, iconClass: "glyphicon-pencil", callback: scope.editSelected },
                                { text: scope.deleteButton, iconClass: "glyphicon-trash", callback: scope.deleteSelected }
                            ] }
                        ];
                    scope.$emit('setToolbarCompleted', scope.btnGroups, scope);

                };

                scope.showClearFilter = false;

                /**
                 * @ngdoc function
                 * @name getData
                 * @methodOf backand.js.directive.bkndNgGrid
                 * @description Reads the data from the API and populate the grid
                 * @param {string} searchText The value of the filter search text box
                 */
                scope.getData = function (searchText) {
                    scope.isLoad = true;
                    if (searchText == 'undefined') searchText == null;
                    // We are requesting data for the specific page of the table.
                    var sortString = '[' + JSON.stringify(scope.sortOptions) + ']';
                    // Read the filter either from attribute or query string
                    var filterString = '';
                    if (scope.filterOptions)
                        filterString = scope.filterOptions;
                    else if ($location.search().filterOptions)
                        filterString = $location.search().filterOptions;
                    else
                        filterString = scope.filterToolbarOptionsOutput;

                    if (!(typeof filterString == 'string' || filterString instanceof String)) {// is not string
                        filterString = JSON.stringify(filterString);
                    }
                    //Read from the service configuration
                    dataListService.read({
                        dataType: "view",
                        viewName: scope.viewNameId,
                        pageSize: scope.pagingOptions.pageSize,
                        pageNumber: scope.pagingOptions.currentPage,
                        filter: filterString,
                        sort: sortString,
                        search: searchText
                    }, function (largeLoad) {
                        // We have received table data and add the data to the scope
                        scope.$emit('gridDataCompleted', { config: scope.configTable, data: largeLoad });

                        scope.dataFill = largeLoad.data;
                        scope.totalServerItems = largeLoad.totalRows;
                        scope.isLoad = false;

                        scope.showClearFilter = searchText || (scope.filterToolbarOptionsOutput && scope.filterToolbarOptionsOutput.length);
                            
                    });
                };


                scope.filterKeyPress = function (keyEvent) {
                    if (keyEvent.which === 13)
                        scope.activateFilter();
                };
                scope.activateFilter = function () {
                    var searchText = scope.searchText || null;
                    scope.getData(searchText);
                };
                scope.deactivateFilter = function () {
                    scope.searchText = '';
                    if (scope.filterScope)
                        scope.filterScope.reset();

                    scope.getData('');
                };

                scope.editSelected = function () {
                    if (!scope.isSingleRowSelected()) {
                        $window.alert(messages.pleaseSelectRow);
                        return;
                    }

                    if (scope.mySelections != null && scope.mySelections.length == 1) {
                        $location.search({
                            rowId: scope.mySelections[0].__metadata.id,
                            viewName: scope.viewNameId
                        });
                        $location.path('/forms');
                    }
                };

                scope.addRow = function () {

                    var defaultFieldsValues = null;

                    if (scope.filterOptions) {
                        defaultFieldsValues = [];
                        var filterOptions = JSON.parse(scope.filterOptions);

                        angular.forEach(filterOptions, function (filterOption) {
                            var defaultFieldValue = new backand.defaultFieldValue(filterOption.fieldName, filterOption.value);
                            defaultFieldsValues.push(defaultFieldValue);
                        });
                    }

                    $location.search({
                        viewName: scope.viewNameId,
                        defaultFieldsValues: angular.toJson(defaultFieldsValues)
                    });

                    $location.path('/forms');
                };

                // todo: take it out of here! (check out ngTranslate or angular get-text modulse)
                var messages = {
                    pleaseSelectRow: "Please select a row.",
                    confirm: "Are you sure that you want to delete the selected row?",
                    failure: "Failed to delete the row. Please contact your system administrator.",
                    idMissing: "id is missing.",
                    tableMissing: "table is missing."
                };

                scope.deleteSelected = function () {

                    if (!scope.isSingleRowSelected()) {
                        $window.alert(messages.pleaseSelectRow);
                        return;
                    }

                    if (!confirm(messages.confirm)) {
                        return;
                    }

                    var id = scope.getSelectedRowId();

                    if (!id) {
                        console.error(messages.idMissing)
                        $window.alert(messages.failure);
                        return;
                    }

                    var viewName = scope.viewNameId;
                    if (!viewName) {
                        console.error(messages.tableMissing)
                        $window.alert(messages.failure);
                        return;
                    }

                    var params = {
                        dataType: "view",
                        id: id,
                        viewName: viewName
                    };

                    try {
                        dataItemService.delete(params, function (data) {
                                scope.getData();
                            },
                            function (error) {
                                if (error.status == 500) {
                                    console.error(error.data, error);
                                    $window.alert(messages.failure);
                                }
                                else {
                                    console.warn(error.data, error);
                                    $window.alert(error.data);
                                }
                            });
                    }
                    catch (err) {
                        console.error(err.description)
                        $window.alert(messages.failure);
                    }
                };

                scope.isSingleRowSelected = function () {
                    return (scope.mySelections != null && scope.mySelections.length == 1);
                };

                scope.getSelectedRowId = function () {
                    if (!scope.isSingleRowSelected())
                        return null;

                    return scope.mySelections[0].__metadata.id;
                };


                // This is the call to get the data based on the table
                // and receives arguments of page size and page number
                // should look into creating a table directive that receives
                // arguments eg table name, and paging information
                scope.myHeaderCellTemplate = function (col, view) {
                    return '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
                        '<div ng-click="myCustomSort(col)"  class="ngHeaderText" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}">{{col.displayName}}</div>' +
                        '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
                        '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
                        '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
                        '</div>' +
                        '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
                }


                scope.getTextAlignment = function (col, view) {
                    if (col.grid.textAlignment == "inherit") {
                        if (col.type == "Numeric" || col.type == "DateTime")
                            return "right";
                        else return "left";
                    }
                    else return col.grid.textAlignment;
                }

                scope.myCustomSort = function (col) {
                    if (!col.sortDirection || col.sortDirection == "asc")
                        col.sortDirection = "desc";
                    else
                        col.sortDirection = "asc";
                    scope.sortOptions = {
                        fieldName: col.displayName,
                        order: col.sortDirection
                    };
                    scope.getData();
                }

                scope.getCellTemplate = function (col, view) {
                    var cellTemplate = '';
                    switch (col.type) {
                        case 'Image':
                            var height = (view.design.rowHeightInPixels != '') ? view.design.rowHeightInPixels + 'px' : 'auto';
                            var width = (height != 'auto') ? 'auto' : col.columnWidth + 'px';
                            cellTemplate = '<div class="ngCellText" ng-class=""><span ng-cell-text><img ng-src="' + col.urlPrefix + '/{{row.entity[\'' + col.name + '\']}}" width="' + width + '" height="' + height + '" lazy-src/></span></div>';
                            break;
                        case 'Html':
                            cellTemplate = '<p ng-bind-html="renderHtml(\'{{row.entity[\'' + col.name + '\']}}\')"></p>';
                            break;
                        case 'LongText':
                            cellTemplate = '<div class="ngCellText" ng-class="" style="white-space: normal;"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                            break;
                        case 'Url':
                            cellTemplate = '<div class="ngCellText" ng-class="" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}"><p ng-bind-html="renderUrl(\'{{row.entity[\'' + col.name + '\']}}\')"></p></div>';
                            break;
                        case 'MultiSelect':
                            cellTemplate = '<div class="ngCellText" ng-class="" style="white-space: normal;"><a href ng-click="renderSubGridUrl(\'' + col.name + '\',row.entity.__metadata.id)">' + col.displayName + '</a></div>';
                            break;
                        default:
                            cellTemplate = '<div class="ngCellText" ng-class="" ng-style="{\'text-align\': \'' + scope.getTextAlignment(col, view) + '\'}"><span ng-cell-text>{{row.entity["' + col.name + '"]}}</span></div>';
                            break;
                    }

                    var colAndCellTemplate = { col: col, cellTemplate: cellTemplate };
                    scope.$emit('setCellTemplate', colAndCellTemplate);

                    return colAndCellTemplate.cellTemplate;
                };

                scope.renderHtml = function (html_code) {
                    return $sce.trustAsHtml(html_code);
                };

                scope.renderUrl = function (value) {
                    var html = '';
                    if (value != '') {
                        var urls = value.split('|');
                        if (urls.length == 1) {
                            html = '<a href="' + urls[0] + '" target="_blank">' + urls[0] + '</a>';
                        }
                        else {
                            var href = (urls[2] != undefined) ? urls[2] : '#';
                            var target = (urls[1] != undefined) ? urls[1] : '_blank';
                            var value = (urls[0] != undefined) ? urls[0] : href;
                            html = '<a href="' + href + '" target="' + target + '">' + value + '</a>';
                        }
                    }
                    return $sce.trustAsHtml(html);
                }

                scope.renderSubGridUrl = function (value, id) {
                    var field = $filter('filter')(scope.configTable.fields, function (f) {
                        return f.name === value;
                    })[0];
                    if (field) {
                        var filterItem = new backand.filter.item(field.relatedParentFieldName, backand.filter.operator.relation.in, id);

                        $location.search({
                            viewName: field.relatedViewName,
                            filterOptions: angular.toJson([filterItem])
                        });
                        $location.path('/grids');
                    }
                }

                scope.$watch('pagingOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.getData();
                    }
                }, true);

                scope.$watch('filterOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.getData();
                    }
                }, true);

                scope.getTableStyle = function () {
                    var top = ($('.ngViewport').offset() != undefined) ? $('.ngViewport').offset().top : 0;
                    var bottom = 0;
                    if ($('.ngFooterPanel').height() != undefined) {
                        bottom = $('.ngFooterPanel').height();
                    }

                    var height = ($(window).height() - top - bottom);
                    if (scope.collapseFilter) {
                        height += -1;
                    }
                    height += 'px';

                    return {
                        'height': height
                    };
                };

                //scope.fixHorizontalScroll = false;
                //scope.$on('ngGridEventData', function (newColumns) {
                //    if (!scope.fixHorizontalScroll) {
                //        setTimeout(function () {
                //            if (!scope.fixHorizontalScroll) {
                //                var colCount = newColumns.targetScope.columns.length;
                //                var lastCells = $('.' + newColumns.targetScope.gridId + ' .colt' + (colCount - 1));
                //                if (lastCells.length > 1) {
                //                    scope.fixHorizontalScroll = true;
                //                    lastCells.each(function () {
                //                        var lastCell = $(this);
                //                        lastCell.width(lastCell.width() - 18);
                //                    })
                //                }
                //            }
                //        }, 1);

                //    }

                //});

            }
        }
            ;
    }])
    .
    directive('ngBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {
                scope.$apply(attrs.ngBlur);
            });
        };
    });
;'use strict';
/**
* @ngdoc overview
* @name directive.bkndFilter
*/
angular.module('backAnd.directives')
    .directive('bkndFilter', ['$sce',
        function ($sce) {
    /**
    * @ngdoc directive
    * @name directive.bkndFilter
    * @description grid filter
    * @filterOptions {object} filter, filter options array 
    * @returns {object} directive
    */
    return {
        restrict: 'A',
        replace: true,
        scope: {
            filterOptions: "=",
            showOperators: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/filter.html',
        link: function (scope) {

            scope.$watch('filterOptions', function () {
                if (scope.filterOptions) {
                    scope.filterOptionsOutput = angular.copy(scope.filterOptions);
                }
            }, true);

            
            scope.filterChanged = function () {
                scope.$emit('onfilter', scope.getFilter(), scope);

            }

            scope.getFilter = function () {
                var filter = [];
                angular.forEach(scope.filterOptionsOutput, function (option) {
                    if (option.value || option.operator == 'empty' || option.operator == 'notEmpty') {
                        filter.push({ "fieldName": option.fieldName, "operator": option.operator, "value": option.value });
                    }
                });
                return filter;
            }

            scope.reset = function () {
                scope.filterOptionsOutput = angular.copy(scope.filterOptions);
                scope.$emit('onfilter', scope.getFilter(), scope);
            }

            function htmlDecode(input) {
                var e = document.createElement('div');
                e.innerHTML = input;
                return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
            }

            scope.getOperatorSymbol = function (operator) {
                var symbol = null;
                switch (operator) {
                    case 'equals':
                        symbol = '=';
                        break;
                    case 'notEquals':
                        symbol =$sce.trustAsHtml(htmlDecode('&ne;'));
                        break;
                    case 'greaterThan':
                        symbol = $sce.trustAsHtml(htmlDecode('&gt;'));
                        break;
                    case 'greaterThanOrEqualsTo':
                        symbol = $sce.trustAsHtml(htmlDecode('&ge;'));
                        break;
                    case 'lessThan':
                        symbol = $sce.trustAsHtml(htmlDecode('&lt;'));
                        break;
                    case 'lessThanOrEqualsTo':
                        symbol = $sce.trustAsHtml(htmlDecode('&le;'));
                        break;
                    case 'empty':
                        symbol = $sce.trustAsHtml(htmlDecode('&empty;'));
                        break;
                    case 'notEmpty':
                        symbol = $sce.trustAsHtml(htmlDecode('&exist;'));
                        break;
                    case 'startsWith':
                        symbol = $sce.trustAsHtml(htmlDecode('&rarr;'));
                        break;
                    case 'endsWith':
                        symbol = $sce.trustAsHtml(htmlDecode('&larr;'));
                        break;
                    case 'contains':
                        symbol = $sce.trustAsHtml(htmlDecode('&harr;'));
                        break;
                    case 'notContains':
                        symbol = 'glyphicon glyphicon-align-justify';
                        break;

                    default:
                        break;
                }

                return symbol;
            }
         
            scope.getOperatorIcon = function (operator) {
                var icon = null;
                switch (operator) {
                    case 'equals':
                        icon = 'glyphicon glyphicon-pause';
                        break;
                    case 'notEquals':
                        icon = 'glyphicon glyphicon-stop';
                        break;
                    case 'greaterThan':
                        icon = 'glyphicon glyphicon-chevron-right';
                        break;
                    case 'greaterThanOrEqualsTo':
                        icon = 'glyphicon glyphicon-step-forward';
                        break;
                    case 'lessThan':
                        icon = 'glyphicon glyphicon-chevron-left';
                        break;
                    case 'lessThanOrEqualsTo':
                        icon = 'glyphicon glyphicon-step-backward';
                        break;
                    case 'empty':
                        icon = 'glyphicon glyphicon-remove-circle';
                        break;
                    case 'notEmpty':
                        icon = 'glyphicon glyphicon-ok-circle';
                        break;
                    case 'startsWith':
                        icon = 'glyphicon glyphicon-align-left';
                        break;
                    case 'endsWith':
                        icon = 'glyphicon glyphicon-align-right';
                        break;
                    case 'contains':
                        icon = 'glyphicon glyphicon-align-center';
                        break;
                    case 'notContains':
                        icon = 'glyphicon glyphicon-align-justify';
                        break;

                    default:
                        break;
                }

                return icon;
            }
        }
    }
}]);;/**
* @ngdoc overview
* @name directive.bkndDashboard
*/
angular.module('backAnd.directives')
    .directive('bkndDashboard',['Global','$http','configService','$location',
        function (Global, $http, configService, $location) {
    /**
   * @ngdoc directive
   * @name directive.bkndDashboard
   * @description dashboard of charts and grids
   * @param {string} dashboardId, required, id of the dashboard
   * @returns {object} directive
   */
	return {
		restrict: 'E',
		templateUrl:  'backand/js/directives/dashboard/partials/dashboard.html',
		replace: false,
		scope: {
			dashboardId : '=',
		    filterOptions : '='
	    },
	    /**
        * @name link
        * @methodOf directive.bkndDashboard
        * @description manage the scope of the bkndDashboard directive
        * @param {object} scope, required, the scope of the directive
        * @param {object} el, required, the element of the directive
        * @param {object} attrs, required, the attributes of the directive
        */
		link: function (scope) {

		    /**
            * @ngdoc function
            * @name dashboardId
            * @methodOf backand.js.directive.bkndDashboard
            * @description Get the new Backand's dashboard id and re-load the data
            */
		    scope.$watch('dashboardId', function () {
		        scope.build(scope.getDashboardId());
		    });

		    scope.$watch('filterOptions', function (newVal, oldVal) {
		        if (scope.filterOptions) {
		            scope.build(scope.getDashboardId());
		        }
		    }, true);

		    scope.getChartFilterOptions = function () {
		        if (scope.filterOptions) {
		            return scope.toQueryString(scope.filterOptions);
		        }
		        return window.location.href.slice(window.location.href.indexOf('?') + 1);

		    }

		    scope.getDashboardId = function () {
		        if (scope.dashboardId) {
		            return scope.dashboardId;
		        }
		        else if ($location.search().dashboardId) {
		            return $location.search().dashboardId;
		        }

		        return null;
		    }

		    scope.toQueryString = function (arr) {
		        var parts = [];
		        angular.forEach(arr, function (item) {
		            parts.push(item.fieldName + "=" + item.value);
		        });
		        return parts.join("&");
		    }

		    /**
            * @ngdoc function
            * @name build
            * @methodOf backand.js.directive.bkndDashboard
            * @param {string} id reference to dashboard
            * @description set the data
            */
		    scope.build = function (id) {
		        configService.read({
                    dataType: "dashboard",
		            id: id
		        }, function (data) {
		            scope.numCol = 12 / data.columns;
		            scope.chartData = [];
		            angular.forEach(data.widgets, function (value, key) {
		                this.push({ type: value.type, id: value.__metadata.id });
		            }, scope.chartData)
		        });

		    }
		}
	}
}]);
;'use strict';


/**
* @ngdoc overview
* @name directive.appVersion
*/
angular.module('backAnd.directives').
    directive('appVersion', ['version',
    /**
    * @ngdoc directive
    * @name directive.appVersion
    * @description application version
    * @param {string} version
    * @returns {object} directive
    */
    function (version) {
        return function(scope, elm) {
            elm.text(version);
        };
    }
]);



/**
* @ngdoc overview
* @name directive.customIcon
*/
angular.module('backAnd.directives')
    .directive("customIcon", [
        function() {
        /**
        * @ngdoc directive
        * @name directive.customIcon
        * @description icon for menu and breadcrumbs to grid, dashboard and content
        * @param {string} iconType
        * @returns {object} directive
        */
        return {
            restrict: "C",
            scope: {
                iconType: '='
            },
            link: function(scope, element, attrs) {
                if (scope.iconType == "table")
                    element.addClass("fa fa-table");
                if (scope.iconType == "dashboard")
                    element.addClass("fa fa-dashboard");
                if (scope.iconType == "charts")
                    element.addClass("fa fa-bar-chart-o");
                if (scope.iconType == "content")
                    element.addClass("fa fa-th");
            }
        }
    }]);;
angular.module('backAnd.directives')
/**
* @ngdoc overview
* @name directive.columnchart
*/
.directive('columnchart',[ 'dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.columnchart
    * @description display a morris bar chart which is a column chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz'; 
                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      barColors: ['#00a65a', '#f56954'],
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Bar(opt);

                  });

}
}
}])

/**
* @ngdoc overview
* @name directive.linechart
*/
.directive('linechart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.linechart
    * @description display a morris line chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz';

                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      lineColors: ['#3c8dbc'],
                      parseTime: false,
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Line(opt);
                  });

}
}
}])

/**
* @ngdoc overview
* @name directive.donutchart
*/
.directive('donutchart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.donutchart
    * @description display a morris donut chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/donutchart.html'
    },
    replace: true,
    scope: {
        chartId : '=',
        filterOptions : '='
    },
    link: function($scope, element) {
        dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                    dataType: "chart",
                    id: $scope.chartId,
                    qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    var total = 0;
                    data.Data[0].data.forEach(function (el) {
                      total = total + el[1];
                    });
                    var opt = {
                      element : element.find('.chart'),
                      data : data.Data[0].data.map(function(el) {
                        return {
                          label : el[0],
                          value : parseFloat((el[1] / total * 100).toFixed(2))
                        }
                      }),
                      colors : ["#3c8dbc", "#f56954", "#00a65a"],
                      hideHover : 'auto'
                    };

                    Morris.Donut(opt);
                  });

    }
  }
}])

/**
* @ngdoc overview
* @name directive.barchart
*/
.directive('barchart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.barchart
    * @description display a morris bar chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz'; 
                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      barColors: ['#00a65a', '#f56954'],
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      horizontal: true,
                      stacked: true,
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Bar(opt);

                  });

}
}
}])

/**
* @ngdoc overview
* @name directive.splinechart
*/
.directive('splinechart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.splinechart
    * @description display a morris spline chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz';

                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      lineColors: ['#0b62a4', '#7A92A3'],
                      parseTime: false,
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Line(opt);
                  });

}
}
}])

/**
* @ngdoc overview
* @name directive.areachart
*/
.directive('areachart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.areachart
    * @description display a morris area chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz';

                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      lineColors: ['#0b62a4', '#7A92A3'],
                      parseTime: false,
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Area(opt);
                  });

}
}
}])

/**
* @ngdoc overview
* @name directive.bubblechart
*/
.directive('bubblechart', ['dataItemService',
        function (dataItemService) {
    /**
    * @ngdoc directive
    * @name directive.bubblechart
    * @description display a morris bubble chart
    * @param {string} chartId, required, the id of the chart
    * @returns {object} directive
    */
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
        return attrs.templateUrl || 'backand/js/directives/charts/partials/chart.html'
    },
    replace: true,
    scope: {
        chartId: '=',
        filterOptions: '='
    },
    link: function($scope, element) {
      dataItemService.read({
                    // Need to change this to handle multiple tables on the same page
                      dataType: "chart",
                      id: $scope.chartId,
                      qs: $scope.filterOptions
                  }, function(data) {
                    $scope.title = data.Title;
                    $scope.subTitle = data.SubTitle;
                    $scope.xTitle = data.XTitle;
                    $scope.yTitle = data.YTitle;
                    var axises = 'bcdefghijklmnopqrstuvwxyz';

                    var opt = {
                      element: element.find('.chart'),
                      data: data.xAxis.reduce(function(acc, el, idx) {
                        var row = {a: el};

                        for (var i=0; i < data.Data.length; i++) {
                          row[axises.charAt(i)] = data.Data[i].data[idx];
                        }
                        acc.push(row);
                        return acc;
                      }, []),
                      lineColors: ['#0b62a4', '#7A92A3'],
                      pointSize : 15,
                      lineWidth: 0,
                      parseTime: false,
                      xkey: 'a',
                      ykeys: axises.substr(0, data.Data.length).split(''),
                      labels: data.Data.map(function(el){
                        return el.name
                      }),
                      hideHover: 'auto',
                      xLabelAngle: 45
                    };
                    Morris.Line(opt);
                  });

}
}
}])
;'use strict';

/**
* @ngdoc overview
* @name directive.bkndForm
*/
angular.module('backAnd.directives')
    .directive('bkndForm', ['$sce','$q','$location','$route','configService','dataItemService','dataListService','$log','Global',
        function ($sce, $q, $location, $route, configService, dataItemService, dataListService, $log, Global) {

    /**
    * @ngdoc directive
    * @name directive.bkndForm
    * @description binding a form to a database table or view
    * @param {string} viewName, required, reference to table or view name
    * @param {string} rowId, optional, the row primary key, if provided then the form is in EDIT mode otherwise it is in a CREATE mode
    *       if the primary key of the row has multiple column values then they should be comma delimited in the primary key columns' order
    * @param {string} defaultFieldsValues, optional, this is a JSON string of an array of backand.defaultOption with two properties: fieldName, value
    *       if provided it precedes the default value of a field from configuration. it is only relevant in CREATE mode
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'backand/js/directives/forms/partials/form.html',
        scope: {
            viewName: '=',
            rowId: '=',
            defaultFieldsValues: '=',
        },
         /**
         * @name link
         * @methodOf directive.bkndForm
         * @description manage the scope of the bkndForm directive
         * @param {object} scope, required, the scope of the directive
         * @param {object} el, required, the element of the directive
         * @param {object} attrs, required, the attributes of the directive
         */
        link: function (scope) {
            /**
            * @name configInfo
            * @propertyOf directive.bkndForm {object} 
            * @description configuration information of the form and its fields
            */
            scope.configInfo = {
                fields: [],
                categoriesDictionary: {},
                title: '',
                id: null
            };
            var searchParams = $location.search();

            /**
             * @name init
             * @methodOf directive.bkndForm
             * @description initiate the configuration of the form
             * @param {object} params, required, either the search parameters or directive attributes containing the scope parameters
             */
            scope.init = function (params) {

                /**
                * @name isNew
                * @propertyOf directive.bkndForm {boolean} 
                * @description if isNew then CREATE mode, otherwise EDIT mode
                */
                scope.isNew = !params.rowId;
                /**
                * @name continue
                * @propertyOf directive.bkndForm {boolean} 
                * @description relevant only in CREATE mode, if true then after submit show the in CREATE mode for new row, otherwise shows the new created row in an EDIT mode
                */
                scope.continue = false;

                //$log.debug("params", params);
                var dataForm = $q.defer();
                var dataItem = $q.defer();
                var selectOptions = $q.defer();

                configService.read({
                    dataType: "view",
                    id: params.viewName
                }, function (data) {
                    dataForm.resolve(data);
                });

                if (!scope.isNew) {
                    dataItemService.read({
                        dataType: "view",
                        viewName: params.viewName,
                        id: params.rowId
                    }, function (data) {
                        dataItem.resolve(data);
                    });
                }

                var loadSelectOptions = function () {
                    dataListService.read({
                        dataType: "view",
                        viewName: params.viewName,
                        withSelectOptions: true,
                        filter: null,
                        sort: null,
                        search: null
                    }, function (data) {
                        selectOptions.resolve(data);
                        if (!Global.selectOptions) {
                            Global.selectOptions = [];
                        }
                        if (!Global.selectOptions[params.viewName]) {
                            Global.selectOptions[params.viewName] = data.selectOptions;
                        }


                    });
                }

                if (!Global.selectOptions) {
                    Global.selectOptions = [];
                }

                if (!scope.isNew) {
                    if (!Global.selectOptions[params.viewName]) {
                        loadSelectOptions();
                        $q.all([dataForm.promise, dataItem.promise, selectOptions.promise]).then(function (data) {
                            scope.processForm(data[0], data[1], params);
                        });
                    }
                    else {
                        $q.all([dataForm.promise, dataItem.promise]).then(function (data) {
                            scope.processForm(data[0], data[1], params);
                        });
                    }
                }
                else {
                    var dataToSubmit = {};
                    if (params.defaultFieldsValues) {
                        var defaultFieldsValues = JSON.parse(params.defaultFieldsValues);
                        angular.forEach(defaultFieldsValues, function (defaultOption) {
                            dataToSubmit[defaultOption.fieldName] = defaultOption.value;
                        });
                    }

                    if (!Global.selectOptions[params.viewName]) {
                        loadSelectOptions();
                        $q.all([dataForm.promise, selectOptions.promise]).then(function (data) {
                            scope.processForm(data[0], dataToSubmit, params);
                        });
                    }
                    else {
                        $q.all([dataForm.promise]).then(function (data) {
                            scope.processForm(data[0], dataToSubmit, params);
                        });
                    }
                }

                /**
                * @name dataToSubmit
                * @propertyOf directive.bkndForm {object} 
                * @description the data to submit to the database
                */
                scope.dataToSubmit = null;
                var updateMessages = {
                    failure: "Failed to update the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };
                var createMessages = {
                    failure: "Failed to create the row. Please contact your system administrator.",
                    success: "Data submitted.",
                };

                /**
                * @name submitCaption
                * @propertyOf directive.bkndForm {string} 
                * @description the submit button caption
                */
                scope.submitCaption = scope.isNew ? 'Create' : 'Update';
                /**
                * @name submitAndContinueCaption
                * @propertyOf directive.bkndForm {string} 
                * @description the submit and continue button caption, relevant only in CREATE mode
                */
                scope.submitAndContinueCaption = scope.isNew ? 'Create and Continue' : '';


                /**
                * @name submit
                * @methodOf directive.bkndForm 
                * @description submit the form data to the database
                */
                scope.submit = function () {
                    var messages = scope.isNew ? createMessages : updateMessages;
                    scope.submitAction(messages);
                }

                /**
                * @name setFieldValue
                * @methodOf directive.bkndForm 
                * @description handles each field value
                * @param {object} field, required, the field/column of the database table or view
                */
                scope.setFieldValue = function (field) {
                    var val = field.value.val;
                    if (scope.dataToSubmit[field.name] != undefined || scope.isNew) {
                        switch (field.type) {
                            case 'singleSelect':
                                scope.dataToSubmit[field.name] = val && val.value ? val.value : '';
                                break;
                            case 'hyperlink':
                                scope.dataToSubmit[field.name] = field.value && field.value.linkText ? field.value.linkText + '|' + (field.value.target ? "_blank" : "_self") + '|' + field.value.url : '';
                                break;
                            case 'percentage':
                                scope.dataToSubmit[field.name] = field.value && field.value.val ? (val / 100).toFixed(2) : val;
                                break;

                            default:
                                scope.dataToSubmit[field.name] = val ? val : '';
                                break;
                        }
                    }
                }

                /**
                * @name submitAction
                * @methodOf directive.bkndForm 
                * @description submit the form data to the database
                * @param {object} service, required, if the mode is CREATE then the create service otherwise the edit service
                * @param {object} messages, required, success and failure messages
                */
                scope.submitAction = function (messages) {
                    angular.forEach(scope.configInfo.fields, function (field) {
                        scope.setFieldValue(field);
                    });

                    angular.forEach(scope.configInfo.categories, function (category) {
                        angular.forEach(category.fields, function (field) {
                            
                            scope.setFieldValue(field);
                        });
                    });

                    scope.waiting = true;
                    scope.alerts = [];
                    scope.closeAlert = function (index) {
                        scope.alerts.splice(index, 1);
                    };

                    var submitParams = null;
                    if (scope.isNew) {
                        submitParams = {
                            dataType: "view",
                            viewName: params.viewName
                        };
                    }
                    else {
                        submitParams = {
                            dataType: "view",
                            viewName: params.viewName,
                            id: params.rowId
                        };
                    }

                    var errorCallback = function (error) {
                        scope.waiting = false;
                        if (error.status == 500) {
                            console.error(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: messages.failure }];
                        }
                        else {
                            console.warn(error.data, error);
                            scope.alerts = [{ type: 'danger', msg: error.data }];
                        }
                    };

                    if (scope.isNew) {
                        dataItemService.create(submitParams, JSON.stringify(scope.dataToSubmit), function (data) {
                            scope.waiting = false;
                            if (scope.continue) {
                                $route.reload();
                            }
                            else {
                                $location.search({
                                    viewName: params.viewName,
                                    rowId: data.__metadata.id
                                });
                                $location.path('/forms');
                            }
                        },
                        errorCallback);
                    }
                    else {
                        dataItemService.update(submitParams, JSON.stringify(scope.dataToSubmit), function (data) {
                            scope.waiting = false;
                            
                            scope.alerts = [{ type: 'success', msg: messages.success }];
                            window.setTimeout(function () {
                                $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                    $(this).remove();
                                });
                            }, 5000);
                            
                        },
                        errorCallback);
                    }

                };

            }

            /**
            * @ngdoc function
            * @name viewName
            * @methodOf directive.bkndForm 
            * @description Get the new Backand's view name and re-load the configraion
            *              and data
            */
            scope.$watch('viewName', function () {
                if (scope.viewName) {
                    if (scope.rowId) {
                        scope.init({ viewName: scope.viewName, rowId: scope.rowId });
                    }
                    else {
                        scope.init({ viewName: scope.viewName });
                    }
                }
                else {
                    scope.init(searchParams);

                }
            });



            /**
            * @name processForm
            * @methodOf directive.bkndForm 
            * @description initiate each field configuration
            * @param {object} viewConfig, required, configuration of the view or table from the database and all its columns
            * @param {object} dataItem, required, the row from the database, if CREATE mode the an empty object
            * @param {object} params, required, either the search parameters or directive attributes containing the scope parameters
            */
            scope.processForm = function (viewConfig, dataItem, params) {
                scope.dataToSubmit = dataItem;
                scope.configInfo.title = viewConfig.captionText;
                scope.configInfo.columnsInDialog = viewConfig.dataEditing.columnsInDialog;
                scope.configInfo.editable = (scope.isNew && viewConfig.dataEditing.allowAdd) || (!scope.isNew && viewConfig.dataEditing.allowEdit);

                angular.forEach(viewConfig.fields, function (field) {
                    var type;
                    var currencySymbol;
                    switch (field.type) {
                        case 'Numeric':
                            type = 'number';
                            if (field.displayFormat == "Currency") {
                                type = 'currency';
                                currencySymbol = '$';
                            }
                            else if (field.displayFormat == "Percentage") {
                                type = 'percentage';
                            }
                            else if (field.displayFormat == "NumberWithSeparator") {
                                type = 'numberWithSeparator';
                            }
                            else {
                                type = 'numeric';
                            }

                            break;
                        case 'DateTime':
                            if (field.displayFormat == "Date_mm_dd" || field.displayFormat == "Date_dd_mm" || field.displayFormat == "None" || !field.displayFormat)
                                type = 'date';
                            else
                                type = 'datetime';
                            break;
                        case 'LongText':
                            if (field.displayFormat == "MultiLines")
                                type = 'textarea';
                            else if (field.displayFormat == "MultiLinesEditor")
                                type = 'editor';
                            else
                                type = 'text';
                            break;
                        case 'SingleSelect':
                            if (field.displayFormat == "AutoCompleteStratWith" || field.displayFormat == "AutoCompleteMatchAny")
                                type = "autocomplete"
                            else
                                type = 'singleSelect';
                            break;
                        case 'MultiSelect':
                            if (field.displayFormat == "Grid")
                                if (scope.isNew)
                                    type = 'disabledSubgrid';
                                else
                                    type = 'subgrid';
                            else if (field.displayFormat == "CheckList")
                                type = 'multiSelect';
                            else
                                type = 'text';
                            break;
                        case 'ShortText':
                            //pattern example = /[0-9]/;
                            if (field.displayFormat == "MultiLines")
                                type = 'textarea';
                            else if (field.displayFormat == "MultiLinesEditor")
                                type = 'editor';
                            else if (field.displayFormat == "Hyperlink")
                                type = 'hyperlink';
                            else if (field.displayFormat == "Email")
                                type = 'email';
                            else if (field.displayFormat == "Password")
                                type = 'password';
                            else
                                type = 'text';
                            break;
                        case 'Boolean':
                            type = 'checkbox';
                            break;
                        case 'Url':
                            type = 'hyperlink';
                            break;
                        case 'Email':
                            type = 'email';
                            break;
                        case 'Image':
                            type = 'image';
                            break;

                        default:
                            type = 'text'

                            break;
                    }
                    var val = '';
                    if (scope.isNew) {
                        val = dataItem[field.name] || field.advancedLayout.defaultValue || '';
                    }
                    else {
                        val = dataItem[field.name] || '';
                    }
                        
                    var f = {
                        name: field.name,
                        displayName: field.displayName,
                        type: type,
                        value: { val: val },
                        hr: field.formLayout.addhorizontallineabouvethefield,
                        seperatorTitle: field.formLayout.seperatorTitle,
                        columns: field.formLayout.columnSpanInDialog,
                        preLabel: field.formLayout.preLabel,
                        postLabel: field.formLayout.postLabel,
                        show: scope.isNew ? !field.form.hideInCreate : !field.form.hideInEdit,
                        disabled: scope.isNew ? field.form.disableInCreate : field.form.disableInEdit,
                        required: field.advancedLayout.required,
                        viewName: params.viewName,
                        relatedViewName: field.relatedViewName,
                        relatedParentFieldName: field.relatedParentFieldName,
                        minimumValue: field.advancedLayout.minimumValue,
                        maximumValue: field.advancedLayout.maximumValue,
                    };

                    if (field.categoryName && f.show) {
                        if (!scope.configInfo.categoriesDictionary[field.categoryName]) {
                            scope.configInfo.categoriesDictionary[field.categoryName] = {
                                catName: field.categoryName,
                                fields: []
                            };
                        }
                        scope.configInfo.categoriesDictionary[field.categoryName].fields.push(f);
                    } else {
                        scope.configInfo.fields.push(f);
                    }
                    if (f.type == "singleSelect" || f.type == "multiSelect") {
                        if (Global.selectOptions && Global.selectOptions[params.viewName] && Global.selectOptions[params.viewName][f.name]) {
                            f.options = Global.selectOptions[params.viewName][f.name];
                        }
                        if (scope.isNew) {
                            f.inlineEditing = field.form.inlineAdding;
                        }
                        else {
                            f.inlineEditing = field.form.inlineEditing;
                        }
                    }
                    else if (type == "autocomplete") {
                        if (scope.isNew) {
                            f.selected = val;
                            if (val)
                                f.value.val = val.value;
                        }
                        else {
                            f.selected = dataItem.__metadata.autocomplete[f.name];
                        }
                    }
                    else if (type == "currency") {
                        f.currencySymbol = currencySymbol;
                    }
                    else if (type == 'hyperlink') {
                        var url = '';
                        var linkText = '';
                        var target = '';
                        if (dataItem[field.name]) {
                            var segments = dataItem[field.name].split('|');
                            if (segments.length == 3) {
                                url = segments[2];
                                linkText = segments[0];
                                target = segments[1];
                            }
                            else {
                                url = dataItem[field.name];
                                linkText = dataItem[field.name];
                            }
                        }

                        f.value.url = url;
                        f.value.linkText = linkText;
                        f.value.target = target;
                    }
                    else if (type == "date") {
                        f.format = field.advancedLayout.format;
                        if (!scope.isNew)
                            f.value.val = dataItem.__metadata.dates[field.name];
                    }
                    else if (type == "datetime") {
                        f.type = 'text';
                        if (!scope.isNew)
                            f.value.val = dataItem[field.name];
                        f.disabled = true;
                    }
                    else if (type == "percentage") {
                        f.value.val = val ? val * 100 : val;
                    }
                    else if (type == "image") {
                        f.urlPrefix = field.urlPrefix;
                    }
                    f.errors = { required: "Data required", minimumValue: "Must be more than " + f.minimumValue, maximumValue: "Must be less than " + f.maximumValue, number: "Must be a number",email: "Must be a valid email" };

                    /// subgrid
                    f.filterSubgrid = function () {
                        var filterItem = new backand.filter.item(f.relatedParentFieldName, backand.filter.operator.relation.in, dataItem.__metadata.id);
                        return angular.toJson([filterItem]);
                    };
                })

                scope.configInfo.categories = [];
                var firstCategory = true;
                angular.forEach(viewConfig.categories, function (cat) {
                    if (scope.configInfo.categoriesDictionary[cat.name]) {
                        scope.configInfo.categoriesDictionary[cat.name].columnsInDialog = cat.columnsInDialog;
                        if (scope.configInfo.categoriesDictionary[cat.name].fields.length == 1 && scope.configInfo.categoriesDictionary[cat.name].fields[0].type == 'subgrid') {
                            scope.configInfo.categoriesDictionary[cat.name].fields[0].hideLabel = true;
                            scope.configInfo.categoriesDictionary[cat.name].fields[0].tempRelatedViewName = scope.configInfo.categoriesDictionary[cat.name].fields[0].relatedViewName;
                            if (!firstCategory) {
                                scope.configInfo.categoriesDictionary[cat.name].fields[0].relatedViewName = '';
                            }
                            else {
                                firstCategory = false;
                            }
                        }
                        scope.configInfo.categories.push(scope.configInfo.categoriesDictionary[cat.name]);
                    }
                });

                if (!scope.isNew) {
                    scope.configInfo.id = dataItem.__metadata.id;
                }
            };

            /**
            * @name renderHtml
            * @methodOf directive.bkndForm 
            * @description render text to html
            * @param {string} html_code, required, text to render to html
            * @returns {string} the rendred html
            */
            scope.renderHtml = function (html_code) {
                return $sce.trustAsHtml(html_code);
            };
            
            /**
            * @name tabClick
            * @methodOf directive.bkndForm 
            * @description handles subgrids, only activates them when the user select their tabs, to increase performance
            * @param {object} category, required, the category of the tab
            */
            scope.tabClick = function (category) {
                angular.forEach(category.fields, function (field) {
                    field.relatedViewName = field.tempRelatedViewName;
                });
            }
        }
    };
}])
/**
* @ngdoc filter
* @name filter.parseLabel
* @description when need to hide the input label it returns an empty string instead of hiding the entire label element that contains the input element
*/
.filter('parseLabel', function () {
    return function (label, field) {
        if (field && field.hideLabel)
            return '';
        return label;
    }
})
.directive('showtab',
    function () {
        return {
            link: function (scope, element) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });;/**
* @ngdoc overview
* @name directive.bkndContent
*/
angular.module('backAnd.directives')
    .directive('bkndContent', ['Global','$http','configService','$sce','$location',
        function (Global, $http, configService, $sce, $location) {
    /**
   * @ngdoc directive
   * @name directive.bkndContent
   * @description base content 
   * @param {string} contentId, required, id of the content
   * @returns {object} directive
   */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/content.html',
		replace: false,
		scope: {
		    contentId: '='
		},
        /**
         * @name link
         * @methodOf directive.bkndContent
         * @description manage the scope of the bkndContent directive
         * @param {object} scope, required, the scope of the directive
         * @param {object} el, required, the element of the directive
         * @param {object} attrs, required, the attributes of the directive
         */
		link: function (scope, el, attrs) {
		    /**
        * @ngdoc function
        * @name contentId
        * @methodOf backand.js.directive.bkndContent
        * @description Get the new Backand's content id and re-load the data
        */
		    scope.$watch('contentId', function () {
		        if (scope.contentId)
		            scope.setData(scope.contentId);
		        else if ($location.search().contentId) {
		            scope.setData($location.search().contentId);
		        }
		    });

		    /**
            * @ngdoc function
            * @name setData
            * @methodOf backand.js.directive.bkndContent
            * @param {string} id reference to content
            * @description set the data
            */
		    scope.setData = function (id) {
		        configService.read({
		            dataType: "content",
		            id: id
		        }, function (data) {
		            scope.content = data;

		        });

		    }

		    
		}
	}
}]);
;/**
* @ngdoc overview
* @name directive.htmlcontent
*/
angular.module('backAnd.directives')
    .directive('htmlcontent', ['configService',
        function (configService) {
    /**
   * @ngdoc directive
   * @name directive.htmlcontent
   * @description html content 
   * @param {string} contentId, required, id of the content
   * @returns {object} directive
   */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/htmlcontent.html',
		replace: false,
		scope: {
		    contentId: '='
		},
		link: function (scope, element) {
		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        var el = angular.element(data.content);
		        element.append(el);
		    });
            
		}
	}
}]);
;/**
* @ngdoc overview
* @name directive.iframecontent
*/
angular.module('backAnd.directives')
    .directive('iframecontent', ['configService',
        function (configService) {
    /**
      * @ngdoc directive
      * @name directive.iframecontent
      * @description iframe content 
      * @param {string} contentId, required, id of the content
      * @returns {object} directive
      */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/iframecontent.html',
		replace: false,
		scope: {
		    contentId: '='
		},
		link: function (scope, element) {
		    /**
            * @ngdoc function
            * @name getDefaultIFrameHeight
            * @methodOf backand.js.directive.bkndContent
            * @description get the default iframe height
            * @returns {int} height in pixels
            */
		    scope.getDefaultIFrameHeight = function () {
		        var top = $('#id' + scope.contentId).position().top;
		        var height = ($(window).height() - top - 50);
		        return height;
		    };

		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        var iframe = element.find('iframe');
		        iframe.attr('src', data.iFrameURL);
		        if (data.width) {
		            iframe.attr('width', data.width);
		        }
		        else {
		            iframe.attr('width', '100%');
		        }
		        if (data.height) {
		            iframe.attr('height', data.height);
		        }
		        else {
		            iframe.attr('height', scope.getDefaultIFrameHeight());
		        }
		        if (data.scroll) {
		            iframe.attr('scrolling', "no");
		        }
		    });
		    
		}
	}
}]);
;/**
* @ngdoc overview
* @name directive.linkcontent
*/
angular.module('backAnd.directives')
    .directive('linkcontent', ['configService',
        function (configService) {
    /**
      * @ngdoc directive
      * @name directive.linkcontent
      * @description link to content 
      * @param {string} contentId, required, id of the content
      * @returns {object} directive
      */
    return {
		restrict: 'E',
		replace: false,
		scope: {
		    contentId: '='
		},
		link: function (scope) {
		    configService.read({
		        dataType: "content",
		        id: scope.contentId
		    }, function (data) {
		        window.open(data.externalLink, '_blank');
		    });
		}
	}
}]);
;'use strict';
/**
* @ngdoc overview
* @name directive.textarea
*/
angular.module('backAnd.directives')
    .directive('textarea', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.textarea
    * @description textarea element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
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
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/textarea/partials/textarea.html',
    	link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.input
*/
angular.module('backAnd.directives')
    .directive('input', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.input
    * @description input element
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
    	templateUrl: 'backand/js/directives/input/partials/input.html',
        link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        }
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.singleSelect
*/
angular.module('backAnd.directives')
    .directive('singleSelect', ['$location',
        function ($location) {
    /**
    * @ngdoc directive
    * @name directive.singleSelect
    * @description select element
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
    	templateUrl: 'backand/js/directives/singleSelect/partials/singleSelect.html',
    	link: function(scope) {
    	    //console.log("singleSelect.js", scope);

    	    /**
            * @name options
            * @propertyOf directive.singleSelect {array} 
            * @description get the select options from configuration
            */
    	    scope.options = scope.field.options;

    	    if (scope.value.val) {
    	        angular.forEach(scope.options, function (option) {
    	            if (option.value == scope.value.val) {
    	                scope.value.val = option;
    	            }
    	        });
    	    }

    	    /**
             * @name inlineEditing
             * @methodOf directive.singleSelect
             * @description when configured adds a button that links to the related table of the select options
             */
    	    scope.inlineEditing = function () {
    	        $location.search({
    	            viewName: scope.field.relatedViewName,
    	        });
    	        $location.path('/grids');
    	    }

    	    /**
            * @name changed
            * @methodOf directive.singleSelect
            * @description change callback to set the back the selected value
            */
    	    scope.changed = function () {
    	        if (!scope.value.val.value)
    	            scope.value.val = null;
    	    }
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.autocomplete
*/
angular.module('backAnd.directives')
    .directive('autocomplete', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.autocomplete
    * @description automatic complition for parent relation
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
    	templateUrl: 'backand/js/directives/autocomplete/partials/autocomplete.html',
    	controller: ['$scope', '$http', function ($scope, $http) {
    	    $scope.options = function (query) {
    	        return $http.get(backandGlobal.url + "/1/view/data/autocomplete/" + $scope.field.viewName + '/' + $scope.field.name, {
    	            params: { term: query, limit: 20 }
    	        })
                .then(function (response) {
                    return response.data;
                });
    	    };

    	    $scope.setPcode = function (item) {
    	        $scope.field.value.val = item.value;
    	    };
    	}],
    	link: function(scope) {

    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.editor
*/

angular.module('backAnd.directives')
    .directive('editor', ['$log',
        function ($log) {
    /**
    * @ngdoc directive
    * @name directive.editor
    * @description html editor element
    * @param {object} field, required, field configuration and data
    * @param {object} value, optional, value of the field, could be null 
    * @param {object} form, required, the form that contains the field
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
            errors: "="
    	},
    	templateUrl: 'backand/js/directives/editor/partials/editor.html',
    	link: function(scope) {
            //$log.debug("editor", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
    		}

    	    /**
            * @name innerVal
            * @propertyOf directive.editor {string} 
            * @description set the value from configuration
            */
            scope.innerVal = {
                val: scope.value.val
            }

    	    /**
            * @name isInFocus
            * @propertyOf directive.editor {boolean} 
            * @description in focus flag, focus bug fix
            */
            scope.isInFocus = false;
    	    /**
             * @name inFocus
             * @methodOf directive.editor
             * @description set focus flag to true, focus bug fix
             */
            scope.inFocus = function () {
                $log.debug("inFocus");
                scope.isInFocus = true;
            };
            
    	    /**
            * @name isEmpty
            * @propertyOf directive.editor {boolean} 
            * @description empty flag 
            */
            scope.isEmpty = !scope.innerVal.val;

    	    /**
             * @name outFocus
             * @methodOf directive.editor
             * @description set focus flag to false, focus bug fix
             */
            scope.outFocus = function () {
                
                $log.debug("outFocus");

                scope.value.val = scope.innerVal.val;
                scope.isEmpty = !scope.innerVal.val;

            };
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.checkbox
*/

angular.module('backAnd.directives')
    .directive('checkbox', [
        function () {
    /**
   * @ngdoc directive
   * @name directive.checkbox
   * @description checkbox element
   * @param {object} field, required, field configuration and data
   * @param {object} value, optional, value of the field, could be null 
   * @param {object} form, required, the form that contains the field
   * @param {string} inputClass, optional, optional css class
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
    	templateUrl: 'backand/js/directives/checkbox/partials/checkbox.html',
    	link: function(scope) {
    		if (scope.value.val === undefined){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.link
*/
angular.module('backAnd.directives')
    .directive('link', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.link
    * @description link element
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
      field: '=',
      value: '=',
      form: '=',
      inputClass: "=",
      errors: '='
    },
    templateUrl: 'backand/js/directives/link/partials/link.html',
    link: function (scope) {

        /**
        * @name isTargetBlank
        * @propertyOf directive.link {boolean} 
        * @description blank target flag
        */
      scope.isTargetBlank = scope.value.target == "_blank";
        /**
        * @name targetChange
        * @methodOf directive.link
        * @description change event callback to set the blank flag
        */
      scope.targetChange = function () {
        scope.value.target = scope.isTargetBlank ? "_blank" : null;
      };

    }
  };
}]);;'use strict';
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
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.numeric
*/
angular.module('backAnd.directives')
    .directive('numeric', ['$log',
        function ($log) {
    /**
    * @ngdoc directive
    * @name directive.numeric
    * @description numeric element
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
    	templateUrl: 'backand/js/directives/numeric/partials/numeric.html',
    	link: function(scope) {
            //$log.debug("numeric scope", scope);
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.bkndDisabledGrid
*/
angular.module('backAnd.directives')
    .directive('bkndDisabledGrid', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.bkndDisabledGrid
    * @description disabled grid element, mostly used for subgrid in create mode
    * @param {string} message, usually "Save first to add rows"
    * @returns {object} directive
    */
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            message: "="
        },
        templateUrl: 'backand/js/directives/grids/partials/disabledGrid.html'
    }
}]);
;'use strict';
/**
* @ngdoc overview
* @name directive.image
*/
angular.module('backAnd.directives')
    .directive('image', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.image
    * @description image element
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
    	templateUrl: 'backand/js/directives/image/partials/image.html',
    	link: function(scope, el, attrs) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
}]);;'use strict';
/**
* @ngdoc overview
* @name directive.email
*/
angular.module('backAnd.directives')
    .directive('email', [
        function () {
    /**
    * @ngdoc directive
    * @name directive.email
    * @description email element
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
    	templateUrl: 'backand/js/directives/email/partials/email.html',
    	link: function(scope) {
    		if (!scope.value.val){
	          scope.value.val = scope.field.defaultValue;
	        };
    	}
    }
}]);;angular.module('backAnd.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('backand/js/directives/autocomplete/partials/autocomplete.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <input typeahead-on-select=\"setPcode($item)\" typeahead-editable=\"false\" type=\"text\" name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"field.selected\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\" min-length=\"2\" typeahead=\"option.label for option in options($viewValue)\">\r" +
    "\n" +
    "    <div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">Missing</div>\r" +
    "\n" +
    "    <div class=\"alert alert-danger\" role=\"alert\" ng-show=\"!innerForm.field.$valid\">Not matched</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/charts/partials/chart.html',
    "<div class=\"box\">\r" +
    "\n" +
    "   <div class=\"box-header\">\r" +
    "\n" +
    "        <h3 class=\"box-title\">{{title}}</h3>\r" +
    "\n" +
    "        <h4 class=\"sub-title\">{{subTitle}}</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"box-body chart-responsive\">\r" +
    "\n" +
    "        <div class=\"chart\"></div>\r" +
    "\n" +
    "        <div class=\"xtitle\">{{xTitle}}</div>\r" +
    "\n" +
    "        <div class=\"ytitle\">{{yTitle}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('backand/js/directives/charts/partials/donutchart.html',
    "<div class=\"box\">\r" +
    "\n" +
    "    <div class=\"box-header\">\r" +
    "\n" +
    "        <h3 class=\"box-title\">{{title}}</h3>\r" +
    "\n" +
    "        <h4 class=\"sub-title\">{{subTitle}}</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"box-body chart-responsive\">\r" +
    "\n" +
    "        <div class=\"chart\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('backand/js/directives/checkbox/partials/checkbox.html',
    "<input type=\"checkbox\" name=\"field\" class=\"\" ng-model=\"value.val\" ng-checked=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\"  ng-class=\"inputClass\" />\r" +
    "\n" +
    "\t\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/content/partials/content.html',
    " <div>\r" +
    "\n" +
    "    <div ng-switch on=\"content.pageType\">\r" +
    "\n" +
    "        <htmlcontent content-id=\"content.__metadata.id\" ng-switch-when=\"Content\">\t</htmlcontent>\r" +
    "\n" +
    "        <iframecontent content-id=\"content.__metadata.id\" ng-switch-when=\"IFrame\">\t</iframecontent>\r" +
    "\n" +
    "        <linkcontent content-id=\"content.__metadata.id\" ng-switch-when=\"External\">\t</linkcontent>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/content/partials/htmlcontent.html',
    " <div>\r" +
    "\n" +
    "     <div ></div>\r" +
    "\n" +
    " </div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/content/partials/iframecontent.html',
    " <div>\r" +
    "\n" +
    "     <iframe ></iframe>\r" +
    "\n" +
    " </div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/dashboard/partials/dashboard.html',
    " <div>\r" +
    "\n" +
    " \t<div class=\"container-fluid\">\t\r" +
    "\n" +
    " \t\t<div data-ng-repeat=\"chart in chartData\">\r" +
    "\n" +
    " \t\t\t<div class=\"col-xs-{{numCol}}\" ng-switch on=\"chart.type\">\r" +
    "\n" +
    "                 <barchart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"Bar\" filter-options=\"getChartFilterOptions()\">\t</barchart>\t\r" +
    "\n" +
    "                 <linechart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"Line\" filter-options=\"getChartFilterOptions()\">  </linechart>\r" +
    "\n" +
    "                 <donutchart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"Pie\" filter-options=\"getChartFilterOptions()\"> </donutchart>\r" +
    "\n" +
    "                 <columnchart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"Column\" filter-options=\"getChartFilterOptions()\"> </columnchart>\r" +
    "\n" +
    "                 <splinechart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"spline\" filter-options=\"getChartFilterOptions()\">  </splinechart>\r" +
    "\n" +
    "                 <areachart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"Area\" filter-options=\"getChartFilterOptions()\">  </areachart>\r" +
    "\n" +
    "                 <bubblechart chart-id=\"chart.id\" chart-type=\"{{chart.type}}\" ng-switch-when=\"bubble\" filter-options=\"getChartFilterOptions()\">  </bubblechart>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t</div>\r" +
    "\n" +
    " \t</div>\r" +
    "\n" +
    " </div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/date/partials/date.html',
    "<div> \r" +
    "\n" +
    "  <ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <div class=\"input-group\" ng-class=\"inputClass\">\r" +
    "\n" +
    "      <input type=\"text\" name=\"field\" class=\"form-control\" datepicker-popup=\"{{field.format}}\" ng-model=\"mydate\" is-open=\"opened\" date-disabled=\"field.disabled\" ng-disabled=\"field.disabled\" ng-required=\"field.required\" close-text=\"Close\" />\r" +
    "\n" +
    "      <span class=\"input-group-btn\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\" ng-disabled=\"field.disabled\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "    <div ng-if=\"field.minimumValue\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"tooEarly()\">{{errors.minimumValue}}</div>\r" +
    "\n" +
    "    <div ng-if=\"field.maximumValue\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"tooLate()\">{{errors.maximumValue}}</div>\r" +
    "\n" +
    "  </ng-form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('backand/js/directives/editor/partials/editor.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "\t<text-angular ng-if=\"!field.disabled\" ng-required=\"field.required\" ng-model=\"innerVal.val\" ng-show=\"field.show\" ng-class=\"inputClass\" ng-focus=\"inFocus()\" ng-blur=\"outFocus()\"></text-angular>\r" +
    "\n" +
    "\t<div ta-bind ng-if=\"field.disabled\"  ng-model=\"innerVal.val\" ng-show=\"field.show\" ng-class=\"inputClass\"></div>\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"isEmpty\">{{errors.required}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/email/partials/email.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <div class=\"input-group\">\r" +
    "\n" +
    "        <input type=\"{{field.type}}\" name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\" />\r" +
    "\n" +
    "        <div class=\"input-group-addon\">\r" +
    "\n" +
    "            <i class=\"fa fa-envelope\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "\t<div ng-if=\"field.type == 'email'\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.email\">{{errors.email}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/forms/partials/field.html',
    "\r" +
    "\n" +
    "<label ng-hide=\"field.type == 'checkbox'\">{{field.displayName | parseLabel:field}}</label>\r" +
    "\n" +
    "<div ng-switch on=\"field.type\">\r" +
    "\n" +
    "    <bknd-ng-grid ng-switch-when=\"subgrid\" view-name=\"field.relatedViewName\" filter-options=\"field.filterSubgrid()\" input-style=\"{'height': 500}\"></bknd-ng-grid>\r" +
    "\n" +
    "    <div ng-switch-when=\"disabledSubgrid\" bknd-disabled-grid message=\"'Save first to add rows'\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"singleSelect\" single-select field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"autocomplete\" autocomplete field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"editor\" editor field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"textarea\" textarea field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <label ng-switch-when=\"checkbox\" class=\"checkbox-inline\">\r" +
    "\n" +
    "        <div checkbox field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        {{field.displayName | parseLabel:field}}\r" +
    "\n" +
    "    </label>\r" +
    "\n" +
    "    <div ng-switch-when=\"date\" date field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"image\" image field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"number\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"currency\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"percentage\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"numberWithSeparator\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"numeric\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"email\" email field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    <div ng-switch-when=\"hyperlink\">\r" +
    "\n" +
    "        <div link field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-switch-default input field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/forms/partials/form.html',
    "<div class=\"show\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "    <form role=\"form\" name=\"form\" novalidate ng-submit=\"submit()\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\"><h6 class=\"panel-title\">{{configInfo.title}}</h6></div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div ng-include=\"'backand/js/directives/forms/partials/field.html'\" class=\"col-md-{{12 / configInfo.columnsInDialog * field.columns | parseInt}} form-group\" ng-repeat=\"field in configInfo.fields\" ng-if=\"field.show\">\r" +
    "\n" +
    "                        <!-- field -->\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"tabbable form-group\">\r" +
    "\n" +
    "                    <ul class=\"nav nav-tabs\" role=\"tablist\">\r" +
    "\n" +
    "                        <li ng-repeat=\"category in configInfo.categories\" ng-class=\"{active : $first}\" ng-click=\"tabClick(category)\">\r" +
    "\n" +
    "                            <a href=\"#{{category.catName | removeSpaces}}\" showtab role=\"tab\" data-toggle=\"tab\">{{category.catName}}</a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                    <div class=\"tab-content panel-body\">\r" +
    "\n" +
    "                        <div class=\"tab-pane fade in\" ng-class=\"{active : $first}\" ng-repeat=\"category in configInfo.categories\" id=\"{{category.catName | removeSpaces}}\" ng-form=\"subForm\">\r" +
    "\n" +
    "                            <div ng-include=\"'backand/js/directives/forms/partials/field.html'\" class=\"col-md-{{12 / category.columnsInDialog * field.columns | parseInt}} form-group\" ng-repeat=\"field in category.fields\" ng-if=\"field.show\">\r" +
    "\n" +
    "                                <!-- field -->\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"form-actions panel-footer\">\r" +
    "\n" +
    "                <div class=\"=col-md-10 text-left\">\r" +
    "\n" +
    "                    <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\"><span>{{alert.msg}}</span></alert>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"=col-md-2 text-right\">\r" +
    "\n" +
    "                    <button type=\"submit\" class=\"btn btn-primary\" ng-show=\"configInfo.editable && isNew\" ng-hide=\"waiting || !isNew\" ng-disabled=\"form.$invalid\" ng-click=\"continue = true\">{{submitAndContinueCaption}}</button>\r" +
    "\n" +
    "                    <button type=\"submit\" class=\"btn btn-primary\" ng-show=\"configInfo.editable\" ng-hide=\"waiting\" ng-disabled=\"form.$invalid\" ng-click=\"continue = false\">{{submitCaption}}</button>\r" +
    "\n" +
    "                    <img class=\"img-responsive\" ng-show=\"waiting\" src=\"backand/img/ajax-loader.gif\" ng-style=\"{'display':'inline-block'}\" />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"backand/js/directives/forms/partials/field.html\">\r" +
    "\n" +
    "    <label ng-hide=\"field.type == 'checkbox'\">{{field.displayName | parseLabel:field}}</label>\r" +
    "\n" +
    "    <div ng-switch on=\"field.type\">\r" +
    "\n" +
    "        <bknd-ng-grid ng-switch-when=\"subgrid\" view-name=\"field.relatedViewName\" filter-options=\"field.filterSubgrid()\" input-style=\"{'height': 500}\"></bknd-ng-grid>\r" +
    "\n" +
    "        <div ng-switch-when=\"disabledSubgrid\" bknd-disabled-grid message=\"\\'Save first to add rows\\'\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"singleSelect\" single-select field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"autocomplete\" autocomplete field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"editor\" editor field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"textarea\" textarea field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <label ng-switch-when=\"checkbox\" class=\"checkbox-inline\">\r" +
    "\n" +
    "            <div checkbox field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "            {{field.displayName | parseLabel:field}}\r" +
    "\n" +
    "        </label>\r" +
    "\n" +
    "        <div ng-switch-when=\"date\" date field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"image\" image field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"number\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"currency\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"percentage\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"numberWithSeparator\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"numeric\" numeric field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"email\" email field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        <div ng-switch-when=\"hyperlink\">\r" +
    "\n" +
    "            <div link field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-switch-default input field=\"field\" value=\"field.value\" form=\"\" input-class=\"\" errors=\"field.errors\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/grids/partials/buttonGroup.html',
    "<div ng-repeat=\"button in buttons\">\r" +
    "\n" +
    "    <button type=\"button\" ng-click=\"button.callback()\" ng-class=\"button.class\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon\" ng-class=\"button.iconClass\"><span class=\"ng-back-grid-toolbar-text\">{{button.text}}</span></span></button>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('backand/js/directives/grids/partials/disabledGrid.html',
    "<div>\r" +
    "\n" +
    "    {{message}}\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('backand/js/directives/grids/partials/filter.html',
    "<form name=\"filterForm\" novalidate>\r" +
    "\n" +
    "    <div class=\"panel panel-default\">\r" +
    "\n" +
    "        <div class=\"panel-body\">\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div ng-repeat=\"item in filterOptionsOutput\">\r" +
    "\n" +
    "                    <div ng-switch on=\"item.fieldType\" class=\"col-md-2 form-group\">\r" +
    "\n" +
    "                        <label>\r" +
    "\n" +
    "                            {{item.label}}\r" +
    "\n" +
    "                        </label>\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div style=\"display: inline-block; width: -moz-calc(100% - 50px); width: -webkit-calc(100% - 50px); width: calc(100% - 50px);\">\r" +
    "\n" +
    "                                <input ng-switch-when=\"text\" type=\"text\" name=\"item.fieldName\" value=\"item.value\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\" />\r" +
    "\n" +
    "                                <input ng-switch-when=\"date\" type=\"date\" name=\"item.fieldName\" value=\"item.value\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\" />\r" +
    "\n" +
    "                                <input ng-switch-when=\"numeric\" type=\"number\" name=\"item.fieldName\" value=\"item.value\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\" />\r" +
    "\n" +
    "                                <select ng-switch-when=\"boolean\" name=\"item.fieldName\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\">\r" +
    "\n" +
    "                                    <option value=\"\">All</option>\r" +
    "\n" +
    "                                    <option value=\"true\">Yes</option>\r" +
    "\n" +
    "                                    <option value=\"false\">No</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <select ng-switch-when=\"relation\" name=\"item.fieldName\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\">\r" +
    "\n" +
    "                                    <option ng-repeat=\"option in item.selectOptions\" value=\"{{option.value}}\">\r" +
    "\n" +
    "                                        {{option.name}}\r" +
    "\n" +
    "                                    </option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input ng-switch-default=\"text\" type=\"text\" name=\"item.fieldName\" value=\"item.value\" ng-model=\"item.value\" ng-change=\"filterChanged()\" class=\"form-control filter-item\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"btn-group\" dropdown ng-show=\"showOperators && item.fieldType != 'relation' && item.fieldType != 'boolean'\">\r" +
    "\n" +
    "                                <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-class=\"(item.value != undefined && item.value != '' && item.value != null) || item.operator == 'empty' || item.operator == 'notEmpty' ? 'selected' : ''\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                                    <span>\r" +
    "\n" +
    "                                        {{\r" +
    "\n" +
    "                                        getOperatorSymbol(item.operator)\r" +
    "\n" +
    "                                        }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                </button>\r" +
    "\n" +
    "                                <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'equals'; filterChanged();\" ng-class=\"item.operator == 'equals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('equals')}}</span><span>Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'notEquals'; filterChanged();\" ng-class=\"item.operator == 'notEquals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEquals')}}</span><span>Not Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'greaterThan'; filterChanged();\" ng-class=\"item.operator == 'greaterThan' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('greaterThan')}}</span><span>Greater than</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'greaterThanOrEqualsTo'; filterChanged();\" ng-class=\"item.operator == 'greaterThanOrEqualsTo' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('greaterThanOrEqualsTo')}}</span><span>Greater than or Equals to</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'lessThan'; filterChanged();\" ng-class=\"item.operator == 'lessThan' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('lessThan')}}</span><span>Less than</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'lessThanOrEqualsTo'; filterChanged();\" ng-class=\"item.operator == 'lessThanOrEqualsTo' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol(item.operator)}}</span><span>Less than or Equals to</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'empty'; filterChanged();\" ng-class=\"item.operator == 'empty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('empty')}}</span><span>Empty</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'numeric'\" ng-click=\"item.operator = 'notEmpty'; filterChanged();\" ng-class=\"item.operator == 'notEmpty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEmpty')}}</span><span>Not Empty</span></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'equals'; filterChanged();\" ng-class=\"item.operator == 'equals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('equals')}}</span><span>Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'notEquals'; filterChanged();\" ng-class=\"item.operator == 'notEquals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEquals')}}</span><span>Not Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'greaterThan'; filterChanged();\" ng-class=\"item.operator == 'greaterThan' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('greaterThan')}}</span><span>Greater than</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'greaterThanOrEqualsTo'; filterChanged();\" ng-class=\"item.operator == 'greaterThanOrEqualsTo' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('greaterThanOrEqualsTo')}}</span><span>Greater than or Equals to</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'lessThan'; filterChanged();\" ng-class=\"item.operator == 'lessThan' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('lessThan')}}</span><span>Less than</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'lessThanOrEqualsTo'; filterChanged();\" ng-class=\"item.operator == 'lessThanOrEqualsTo' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol(item.operator)}}</span><span>Less than or Equals to</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'empty'; filterChanged();\" ng-class=\"item.operator == 'empty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('empty')}}</span><span>Empty</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'date'\" ng-click=\"item.operator = 'notEmpty'; filterChanged();\" ng-class=\"item.operator == 'notEmpty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEmpty')}}</span><span>Not Empty</span></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'equals'; filterChanged();\" ng-class=\"item.operator == 'equals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('equals')}}</span><span>Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'notEquals'; filterChanged();\" ng-class=\"item.operator == 'notEquals' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEquals')}}</span><span>Not Equals</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'startsWith'; filterChanged();\" ng-class=\"item.operator == 'startsWith' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('startsWith')}}</span><span>Starts With</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'endsWith'; filterChanged();\" ng-class=\"item.operator == 'endsWith' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('endsWith')}}</span><span>Ends With</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'contains'; filterChanged();\" ng-class=\"item.operator == 'contains' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('contains')}}</span><span>Contains</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'empty'; filterChanged();\" ng-class=\"item.operator == 'empty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('empty')}}</span><span>Empty</span></li>\r" +
    "\n" +
    "                                    <li ng-show=\"item.fieldType == 'text'\" ng-click=\"item.operator = 'notEmpty'; filterChanged();\" ng-class=\"item.operator == 'notEmpty' ? 'selected' : ''\"><span class=\"filter-operator-symbol\">{{getOperatorSymbol('notEmpty')}}</span><span>Not Empty</span></li>\r" +
    "\n" +
    "                                   \r" +
    "\n" +
    "                                    \r" +
    "\n" +
    "                                </ul>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"btn-group\" dropdown ng-show=\"showOperators && (item.fieldType == 'relation' || item.fieldType == 'boolean')\" >\r" +
    "\n" +
    "                                <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\" ng-class=\"item.value != undefined && item.value != '' && item.value != null ? 'selected' : ''\">\r" +
    "\n" +
    "                                    <span>\r" +
    "\n" +
    "                                        {{\r" +
    "\n" +
    "                                        getOperatorSymbol('equals')\r" +
    "\n" +
    "                                        }}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                </button>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</form>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/grids/partials/grid-mobile.html',
    "<div class=\"ng-back-grid box\" id=\"bknd-grid_{{viewNameId}}\">\r" +
    "\n" +
    "    <div class=\"box-body table-responsive\">\r" +
    "\n" +
    "        <div class=\"btn-group btn-group-sm\" ng-show=\"showToolbar\">\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"addRow()\" ng-show=\"showAdd\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-plus\"></span></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"editSelected()\" ng-show=\"showEdit\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"deleteSelected()\" ng-show=\"showDelete\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-trash\"></span></button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"btn-group btn-group-sm\">\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"activateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-refresh\"></span></button>\r" +
    "\n" +
    "            <img ng-show=\"isLoad\" src=\"backand/img/ajax-loader.gif\" style=\"height:30px;margin-top:8px;\" />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"btn-group-sm pull-right\">\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"collapseFilter=!collapseFilter\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon \" ng-class=\"collapseFilter ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up'\"><span class=\"grid-toolbar-text\">{{collapseFilter ? \"Filter\" : \"Filter\"}}</span></span></button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"showFilter && !collapseFilter\" class=\"grid-filter\">\r" +
    "\n" +
    "        <div bknd-filter filter-options=\"filterToolbarOptions\" show-operators=\"true\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/grids/partials/grid.html',
    "<div class=\"ng-back-grid box\" id=\"bknd-grid_{{viewNameId}}\">\r" +
    "\n" +
    "    <div class=\"box-body table-responsive\">\r" +
    "\n" +
    "        <div class=\"btn-toolbar ng-back-grid-toolbar\" role=\"toolbar\">\r" +
    "\n" +
    "            <div ng-repeat=\"buttonGroup in btnGroups\" class=\"btn-group\" ng-class=\"buttonGroup.class\">\r" +
    "\n" +
    "                <button ng-repeat=\"button in buttonGroup.buttons\" type=\"button\" ng-click=\"button.callback()\" ng-class=\"button.class\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon\" ng-class=\"button.iconClass\"><span class=\"grid-toolbar-text\">{{button.text}}</span></span></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"btn-group\">\r" +
    "\n" +
    "                <button type=\"button\" ng-click=\"activateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-refresh\"></span></button>\r" +
    "\n" +
    "                <img ng-show=\"isLoad\" src=\"backand/img/ajax-loader.gif\" />\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"btn-group pull-right ng-back-grid-toolbar-Search\" ng-show=\"showSearch && showToolbar\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"btn btn-default navbar-btn\" ng-model=\"searchText\" placeholder=\"Search\" ng-keypress=\"filterKeyPress($event)\" />\r" +
    "\n" +
    "                <button type=\"button\" ng-click=\"activateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-search\"></span></button>\r" +
    "\n" +
    "                <button type=\"button\" ng-click=\"deactivateFilter()\" class=\"btn btn-default navbar-btn\" ng-style=\"showClearFilter ? {'visibility':'visible'} :{'visibility':'hidden'}\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"btn-group pull-right\">\r" +
    "\n" +
    "                <button type=\"button\" ng-click=\"collapseFilter=!collapseFilter\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon \" ng-class=\"collapseFilter ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up'\"><span class=\"grid-toolbar-text\">{{collapseFilter ? \"Filter\" : \"Filter\"}}</span></span></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"showFilter && !collapseFilter\" class=\"grid-filter\">\r" +
    "\n" +
    "        <div bknd-filter filter-options=\"filterToolbarOptions\" show-operators=\"true\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/grids/partials/toolbar.html',
    "<div ng-model=\"buttonGroups\" class=\"box-body table-responsive\">\r" +
    "\n" +
    "    <div class=\"btn-toolbar ng-back-grid-toolbar\" role=\"toolbar\">\r" +
    "\n" +
    "        <div ng-repeat=\"buttonGroup in buttonGroups\" class=\"btn-group\" ng-class=\"buttonGroup.class\">\r" +
    "\n" +
    "            <div button-group buttons=\"buttonGroup.buttons\" selected-rows=\"selectedRows\" new-row-defaults=\"newRowDefaults\" grid-scope=\"gridScope\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"btn-group\">\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"activateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-refresh\"></span></button>\r" +
    "\n" +
    "            <img ng-show=\"isLoad\" src=\"backand/img/ajax-loader.gif\" />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"btn-group pull-right ng-back-grid-toolbar-Search\" ng-show=\"showSearch && showToolbar\">\r" +
    "\n" +
    "            <input type=\"text\" class=\"btn btn-default navbar-btn\" ng-model=\"searchText\" placeholder=\"Search\" ng-keypress=\"filterKeyPress($event)\" />\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"activateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-search\"></span></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-click=\"deactivateFilter()\" class=\"btn btn-default navbar-btn\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>'"
  );


  $templateCache.put('backand/js/directives/html/partials/html.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "\t<textarea name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\"></textarea>\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/image/partials/image.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <div class=\"input-group\" ng-class=\"inputClass\">\r" +
    "\n" +
    "        <input type=\"text\" name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\"></input>\r" +
    "\n" +
    "        <span class=\"input-group-btn\" ng-show=\"!field.largeImage\">\r" +
    "\n" +
    "            <img ng-src=\"{{field.urlPrefix}}/{{value.val}}\" class=\"btn btn-default\" style=\"padding: 0; margin-right: 34px; width: 34px;\" />\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <img ng-src=\"{{field.urlPrefix}}/{{value.val}}\" style=\"width: 300px;\" ng-show=\"field.largeImage\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "    <div ng-if=\"field.format\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.pattern\">{{errors.format}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/input/partials/input.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "\t<input ng-if=\"field.format\" type=\"{{field.type}}\" name=\"field\" class=\"form-control\"  ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\"  ng-class=\"inputClass\" ng-pattern=\"field.format\" />\r" +
    "\n" +
    "\t<input ng-if=\"!field.format\" type=\"{{field.type}}\" name=\"field\" class=\"form-control\"  ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\"  ng-class=\"inputClass\" />\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "\t<div ng-if=\"field.format\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.pattern\">{{errors.format}}</div>\r" +
    "\n" +
    "    <div ng-if=\"field.type == 'email'\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.email\">{{errors.email}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/link/partials/link.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <div class=\"input-group\" ng-class=\"inputClass\">\r" +
    "\n" +
    "        <a ng-show=\"value.url\" href=\"{{value.url}}\" target=\"{{value.target}}\" class=\"form-control\">{{value.linkText}}</a>\r" +
    "\n" +
    "        <span ng-hide=\"value.url\" class=\"form-control\"></span>\r" +
    "\n" +
    "        <span class=\"input-group-btn\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"{{ '#myModal-' + field.name }}\"><i class=\"fa fa-link\"></i></button>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal fade\" data-backdrop=\"static\" id=\"{{ 'myModal-' + field.name }}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <div class=\"form-group\">\r" +
    "\n" +
    "                        <label for=\"linkText\">Label</label>\r" +
    "\n" +
    "                        <input type=\"text\" ng-model=\"value.linkText\" class=\"form-control\" id=\"linkText\" placeholder=\"Link Text\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"form-group\">\r" +
    "\n" +
    "                        <label for=\"linkUrl\">Url</label>\r" +
    "\n" +
    "                        <input type=\"url\" ng-model=\"value.url\" name=\"editUrl\" class=\"form-control\" id=\"linkUrl\" placeholder=\"http://\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"form-group\">\r" +
    "\n" +
    "                        <label for=\"checkboxOpen\">\r" +
    "\n" +
    "                            <input type=\"checkbox\" id=\"checkboxOpen\" class=\"\" ng-model=\"value.target\" ng-true-value=\"null\" ng-false-value=\"_blank\">\r" +
    "\n" +
    "                            Open in same tab\r" +
    "\n" +
    "                        </label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.editUrl.$error.url\">{{errors.url}}</div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</ng-form>\r" +
    "\n"
  );


  $templateCache.put('backand/js/directives/numeric/partials/numeric.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "\t<div class=\"input-group\">\r" +
    "\n" +
    "      <input type=\"number\" name=\"field\" ng-model=\"value.val\" class=\"form-control\" \r" +
    "\n" +
    "\t\tng-disabled=\"field.disabled\" ng-required=\"field.required\" ng-class=\"inputClass\" ng-show=\"field.show\"\r" +
    "\n" +
    "        min=\"{{field.minimumValue}}\" max=\"{{field.maximumValue}}\">\r" +
    "\n" +
    "      <div class=\"input-group-addon\">{{ field.type == 'percentage' ? '%' : field.type == 'currency' ? field.currencySymbol : field.type == 'numberWithSeparator' ? '.00' : '#' }}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "\t<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.number\">{{errors.number}}</div>\r" +
    "\n" +
    "\t<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.min\">{{errors.minimumValue}}</div>\r" +
    "\n" +
    "\t<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.max\">{{errors.maximumValue}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/singleSelect/partials/singleSelect.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "    <select ng-change=\"changed()\" ng-show=\"!field.inlineEditing && field.show\" name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\" ng-options=\"o.name for o in options\"></select>\r" +
    "\n" +
    "    <div class=\"input-group\" ng-class=\"inputClass\" ng-show=\"field.inlineEditing\">\r" +
    "\n" +
    "        <select ng-change=\"changed()\" name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\" ng-options=\"o.name for o in options\"></select>\r" +
    "\n" +
    "        <span class=\"input-group-btn\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" ng-click=\"inlineEditing()\">\r" +
    "\n" +
    "                <i class=\"fa custom-icon ng-isolate-scope fa-table\" icon-type=\"grid\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "</ng-form>"
  );


  $templateCache.put('backand/js/directives/textarea/partials/textarea.html',
    "<ng-form name=\"innerForm\">\r" +
    "\n" +
    "\t<textarea name=\"field\" class=\"form-control\" ng-required=\"field.required\" ng-model=\"value.val\" ng-show=\"field.show\" ng-disabled=\"field.disabled\" ng-class=\"inputClass\"></textarea>\r" +
    "\n" +
    "\t<div ng-if=\"field.required\" class=\"alert alert-danger\" role=\"alert\" ng-show=\"innerForm.field.$error.required\">{{errors.required}}</div>\r" +
    "\n" +
    "</ng-form>"
  );

}]);
