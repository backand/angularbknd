function ngGridLayoutPlugin () {

    var self = this;
    this.grid = null;
    this.scope = null;
    this.init = function(scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;
        var gridId = self.grid.gridId;
        var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
        var heightLayoutGrid = function () {
            self.grid.$viewport.css('height', ($(window).height() - self.grid.$root.position().top - 52 - $(footerPanelSel).height()) + 'px');
        };
        self.scope.$watch(self.grid.config.data, heightLayoutGrid);   
    };

    

    this.updateGridLayout = function () {
        if (!self.scope.$$phase) {
            self.scope.$apply(function(){
                self.domUtilityService.RebuildGrid(self.scope, self.grid);
            });
        }
        else {
            // $digest or $apply already in progress
            self.domUtilityService.RebuildGrid(self.scope, self.grid);
        }
    };
}

