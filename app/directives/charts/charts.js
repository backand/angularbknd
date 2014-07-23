angular.module('backAnd.directives')
// barchart
.directive('barchart', function(chartService) {
  // var metadata = {
  //   "__metadata" : {
  //     "id" : "2"
  //   },
  //   "title" : "Activity",
  //   "subtitle" : "Example",
  //   "type" : "Bar",
  //   "height(Pixels)" : 340,
  //   "query" : "SELECT top(10) substring(Controller,1,10) as Controller, COUNT(*) as [Count]  FROM [Durados_Log]  where logtype<=3 group by Controller Order By [Count] desc",
  //   "showData" : false,
  //   "xField" : "Controller",
  //   "xTitle" : "Durados Views",
  //   "yField" : "Count",
  //   "yTitle" : "Count Activity",
  //   "gaugeMinValue" : 0,
  //   "greenBands(eg:0,80)" : "",
  //   "gaugeMaxValue" : 0,
  //   "yellowBands(eg:80,120)" : "",
  //   "refreshInterval(min3sec)" : 0,
  //   "redBands(eg:120,200)" : "",
  //   "securityWorkspace" : 0,
  //   "overrideinheritable" : false,
  //   "allowRead" : "Developer,Admin,View Owner,User,ReadOnly"
  // }, data = {
  //   "xAxis" : ["view", "app", "Account", "appConfig", "Home", "Admin", "Home - tes", "Home - dur", "chartConfi", "Default"],
  //   "yPieAxis" : null,
  //   "series" : [{
  //     "name" : "Count",
  //     "data" : [4218, 3028, 463, 418, 273, 82, 69, 53, 48, 43]
  //   }],
  //   "__metadata" : {
  //     "id" : "2"
  //   },
  //   "data" : [{
  //     "name" : "Count",
  //     "data" : [4218, 3028, 463, 418, 273, 82, 69, 53, 48, 43]
  //   }],
  //   "title" : "Activity",
  //   "subTitle" : "Example",
  //   "type" : "bar",
  //   "xTitle" : "Durados Views",
  //   "yTitle" : "Count Activity",
  //   "height" : "340",
  //   "showTable" : false,
  //   "neg" : false
  // };
  return {
    restrict: 'E',
    template: '\
      <div class="box">\
          <div class="box-header">\
              <h3 class="box-title">{{title}}</h3>\
          </div>\
          <div class="box-body chart-responsive">\
              <div class="chart"></div>\
              <div class="xtitle">{{xTitle}}</div>\
              <div class="ytitle">{{yTitle}}</div>\
          </div>\
      </div>',
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
  // var metadata = {
  //   "__metadata":{"id":"1"},
  //   "title":"Activity",
  //   "subtitle":"Example",
  //   "type":"Line",
  //   "height(Pixels)":340,
  //   "query":"SELECT top(10) substring(Controller,1,10) as Controller, COUNT(*) as [Count]  FROM [Durados_Log]  where logtype<=3 group by Controller Order By [Count] desc",
  //   "showData":false,
  //   "xField":"Controller",
  //   "xTitle":"Durados Views",
  //   "yField":"Count",
  //   "yTitle":"Count Activity",
  //   "gaugeMinValue":0,
  //   "greenBands(eg:0,80)":"",
  //   "gaugeMaxValue":0,
  //   "yellowBands(eg:80,120)":"",
  //   "refreshInterval(min3sec)":0,
  //   "redBands(eg:120,200)":"",
  //   "securityWorkspace":0,
  //   "overrideinheritable":false,
  //   "allowRead":"Developer,Admin,View Owner,User,ReadOnly"
  // }
  // , data = {
  //   "xAxis" : ["view", "app", "appConfig", "Account", "Home", "Admin", "Home - tes", "chartConfi", "Home - dur", "Default"],
  //   "yPieAxis" : null,
  //   "series" : [{
  //     "name" : "Count",
  //     "data" : [4227, 3028, 1030, 736, 290, 85, 69, 62, 55, 52]
  //   }],
  //   "__metadata" : {
  //     "id" : "1"
  //   },
  //   "data" : [{
  //     "name" : "Count",
  //     "data" : [4227, 3028, 1030, 736, 290, 85, 69, 62, 55, 52]
  //   }],
  //   "title" : "Activity",
  //   "subTitle" : "Example",
  //   "type" : "line",
  //   "xTitle" : "Durados Views",
  //   "yTitle" : "Count Activity",
  //   "height" : "340",
  //   "showTable" : false,
  //   "neg" : false
  // };
  return {
    restrict: 'E',
    template: '\
      <div class="box">\
          <div class="box-header">\
              <h3 class="box-title">{{title}}</h3>\
          </div>\
          <div class="box-body chart-responsive">\
              <div class="chart"></div>\
              <div class="xtitle">{{xTitle}}</div>\
              <div class="ytitle">{{yTitle}}</div>\
          </div>\
      </div>',
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

  // var metadata = {
  //   "__metadata" : {
  //     "id" : "0"
  //   },
  //   "title" : "Activity",
  //   "subtitle" : "Example",
  //   "type" : "Pie",
  //   "height(Pixels)" : 340,
  //   "query" : "SELECT top(10) substring(Controller,1,10) as Controller, COUNT(*) as [Count]  FROM [Durados_Log]  where logtype<=3 group by Controller Order By [Count] desc",
  //   "showData" : false,
  //   "xField" : "Controller",
  //   "xTitle" : "Durados Views",
  //   "yField" : "Count",
  //   "yTitle" : "Count Activity",
  //   "gaugeMinValue" : 0,
  //   "greenBands(eg:0,80)" : "",
  //   "gaugeMaxValue" : 0,
  //   "yellowBands(eg:80,120)" : "",
  //   "refreshInterval(min3sec)" : 0,
  //   "redBands(eg:120,200)" : "",
  //   "securityWorkspace" : 0,
  //   "overrideinheritable" : false,
  //   "allowRead" : "Developer,Admin,View Owner,User,ReadOnly"
  // }, data = {
  //   "xAxis" : ["view", "app", "appConfig", "Account", "Home", "Admin", "Home - tes", "chartConfi", "Home - dur", "Default"],
  //   "yPieAxis" : null,
  //   "series" : [{
  //     "name" : "Count",
  //     "data" : [4227, 3028, 1034, 742, 290, 85, 69, 66, 55, 53]
  //   }],
  //   "__metadata" : {
  //     "id" : "0"
  //   },
  //   "matrix" : [{
  //     "data" : [["view", 4227], ["app", 3028], ["appConfig", 1034], ["Account", 742], ["Home", 290], ["Admin", 85], ["Home - tes", 69], ["chartConfi", 66], ["Home - dur", 55], ["Default", 53]],
  //     "type" : "pie"
  //   }],
  //   "data" : [{
  //     "data" : [["view", 4227], ["app", 3028], ["appConfig", 1034], ["Account", 742], ["Home", 290], ["Admin", 85], ["Home - tes", 69], ["chartConfi", 66], ["Home - dur", 55], ["Default", 53]],
  //     "type" : "pie"
  //   }],
  //   "title" : "Activity",
  //   "subTitle" : "Example",
  //   "type" : "pie",
  //   "xTitle" : "Durados Views",
  //   "yTitle" : "Count Activity",
  //   "height" : "340",
  //   "showTable" : false,
  //   "neg" : false
  // }; 
  return {
    restrict: 'E',
    template: '\
      <div class="box">\
          <div class="box-header">\
              <h3 class="box-title">{{title}}</h3>\
          </div>\
          <div class="box-body chart-responsive">\
              <div class="chart"></div>\
          </div>\
      </div>',
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
