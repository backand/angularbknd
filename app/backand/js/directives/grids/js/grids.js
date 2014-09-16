/**
* @ngdoc overview
* @name directive.ngbackNgGrid
*/
var backAndDirectives = angular.module('backAnd.directives', []);
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/grids/partials/grid.html", '<div class="ng-back-grid box" id="ngback-grid_{{viewNameId}}">\n' +
    '    <div class="box-body table-responsive">\n' +
    '        <div class="btn-toolbar ng-back-grid-toolbar" role="toolbar">\n' +
    '            <div class="btn-group" ng-show="showToolbar">\n' +
    '                <button type="button" ng-click="addRow()" ng-show="showAdd" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-plus"><span class="ng-back-grid-toolbar-text"> {{newButton}}</span></span></button>\n' +
    '                <button type="button" ng-click="editSelected()" ng-show="showEdit" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-pencil"><span class="ng-back-grid-toolbar-text"> {{editButton}}</span></span></button>\n' +
    '                <button type="button" ng-click="deleteSelected()" ng-show="showDelete" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-trash"><span class="ng-back-grid-toolbar-text"> {{deleteButton}}</span></span></button>\n' +
    '            </div>\n' +
    '            <div class="btn-group">\n' +
    '                <button type="button" ng-click="activateFilter()" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-refresh"></span></button>\n' +
    '                <img ng-show="isLoad" src="backand/img/ajax-loader.gif" />\n' +
    '            </div>\n' +
    '            <div class="btn-group pull-right ng-back-grid-toolbar-Search" ng-show="showSearch && showToolbar">\n' +
    '                <input type="text" class="btn btn-default navbar-btn" ng-model="searchText" placeholder="Search" ng-keypress="filterKeyPress($event)" />\n' +
    '                <button type="button" ng-click="activateFilter()" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-search"></span></button>\n' +
    '                <button type="button" ng-click="deactivateFilter()" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-remove"></span></button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')
})
.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/grids/partials/grid-mobile.html", '<div class="ng-back-grid box" id="ngback-grid_{{viewNameId}}">\n' +
    '    <div class="btn-group btn-group-sm" ng-show="showToolbar">\n' +
    '        <button type="button" ng-click="addRow()" ng-show="showAdd" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-plus"></span></button>\n' +
    '        <button type="button" ng-click="editSelected()" ng-show="showEdit" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-pencil"></span></button>\n' +
    '        <button type="button" ng-click="deleteSelected()" ng-show="showDelete" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-trash"></span></button>\n' +
    '    </div>\n' +
    '    <div class="btn-group btn-group-sm">\n' +
    '        <button type="button" ng-click="activateFilter()" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-refresh"></span></button>\n' +
    '        <img ng-show="isLoad" src="backand/img/ajax-loader.gif" style="height:30px;margin-top:8px;" />\n' +
    '    </div>\n' +
    '</div>')
})
.directive('ngbackNgGrid', function ($templateCache) {
        /**
        * @ngdoc directive
        * @name directive.ngbackNgGrid
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
            },
            controller: 'gridController',
            replace: false,
            templateUrl: ($(window).width() > 768) ? 'backand/js/directives/grids/partials/grid.html' : 'backand/js/directives/grids/partials/grid-mobile.html',
        };
    });
