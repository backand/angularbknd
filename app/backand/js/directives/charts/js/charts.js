angular.module('backAnd.directives')
// barchart
.directive('columnchart', function(chartService) {
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

//line chart

.directive('linechart', function(chartService) {
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

// Donut chart
.directive('donutchart', function(chartService) {
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

.directive('barchart', function(chartService) {
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

//spline chart

.directive('splinechart', function(chartService) {
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

//Area chart

.directive('areachart', function(chartService) {
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

//Bubble chart
.directive('bubblechart', function(chartService) {
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