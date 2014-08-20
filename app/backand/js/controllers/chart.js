'use strict';


angular.module('backAnd.controllers')
.controller('chartController', ['$scope', 'Global', '$http',  
    function ($scope, Global, $http) {
        $scope.global = Global;
        
        $scope.setChartData = function (data, element) {
            $scope.title = data.Title;
            $scope.subTitle = data.SubTitle;
            $scope.xTitle = data.XTitle;
            $scope.yTitle = data.YTitle;
            var axises = 'bcdefghijklmnopqrstuvwxyz';
            var opt = {
                element: element.find('.chart'),
                data: data.xAxis.reduce(function (acc, el, idx) {
                    var row = { a: el };

                    for (var i = 0; i < data.Data.length; i++) {
                        row[axises.charAt(i)] = data.Data[i].data[idx];
                    }
                    acc.push(row);
                    return acc;
                }, []),
                barColors: ['#00a65a', '#f56954'],
                xkey: 'a',
                ykeys: axises.substr(0, data.Data.length).split(''),
                labels: data.Data.map(function (el) {
                    return el.name
                }),
                hideHover: 'auto',
                xLabelAngle: 45
            };
            Morris.Bar(opt);
        }
    }
    ])
