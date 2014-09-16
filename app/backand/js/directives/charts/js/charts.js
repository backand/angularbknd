
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/charts/partials/chart.html", '<div class="box">\n' +
       '<div class="box-header">\n' +
            '<h3 class="box-title">{{title}}</h3>\n' +
            '<h4 class="sub-title">{{subTitle}}</h4>\n' +
        '</div>\n' +
        '<div class="box-body chart-responsive">\n' +
            '<div class="chart"></div>\n' +
            '<div class="xtitle">{{xTitle}}</div>\n' +
            '<div class="ytitle">{{yTitle}}</div>\n' +
        '</div>\n' +
    '</div>')
})
.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/charts/partials/donutchart.html", '<div class="box">\n' +
    '<div class="box-header">\n' +
        '<h3 class="box-title">{{title}}</h3>\n' +
        '<h4 class="sub-title">{{subTitle}}</h4>\n' +
    '</div>\n' +
    '<div class="box-body chart-responsive">\n' +
        '<div class="chart"></div>\n' +
    '</div>\n' +
'</div>')
})

/**
* @ngdoc overview
* @name directive.columnchart
*/
.directive('columnchart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.linechart
*/
.directive('linechart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.donutchart
*/
.directive('donutchart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.barchart
*/
.directive('barchart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.splinechart
*/
.directive('splinechart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.areachart
*/
.directive('areachart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})

/**
* @ngdoc overview
* @name directive.bubblechart
*/
.directive('bubblechart', function (chartService, $templateCache) {
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
      chartId : '='
    },
    link: function($scope, element, attrs) {
      chartService.queryjsonp({
                    // Need to change this to handle multiple tables on the same page
                    chart: $scope.chartId
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
})