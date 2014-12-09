
angular.module('backAnd.directives')
/**
* @ngdoc overview
* @name directive.columnchart
*/
.directive('columnchart', ['dataItemService',
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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                barColors: $scope.colorsOptions ? $scope.colorsOptions : ['#00a65a', '#f56954'],
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };
                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Bar(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);
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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {

                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                lineColors: $scope.colorsOptions ? $scope.colorsOptions : ['#3c8dbc'],
                                parseTime: false,
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };

                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Line(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }

                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);


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
                    chartId: '=',
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
                            $scope.title = data.Title;
                            $scope.subTitle = data.SubTitle;
                            var total = 0;
                            data.Data[0].data.forEach(function (el) {
                                total = total + el[1];
                            });
                            var opt = {
                                element: element.find('.chart'),
                                data: data.Data[0].data.map(function (el) {
                                    return {
                                        label: el[0],
                                        value: parseFloat((el[1] / total * 100).toFixed(2))
                                    }
                                }),
                                colors: $scope.colorsOptions ? $scope.colorsOptions : ["#3c8dbc", "#f56954", "#00a65a"],
                                hideHover: 'auto'
                            };

                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Donut(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });


                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);
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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                barColors: $scope.colorsOptions ? $scope.colorsOptions : ['#00a65a', '#f56954'],
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                horizontal: true,
                                stacked: true,
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };
                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Bar(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);

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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                lineColors: $scope.colorsOptions ? $scope.colorsOptions : ['#0b62a4', '#7A92A3'],
                                parseTime: false,
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };
                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Line(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);

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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                lineColors: $scope.colorsOptions ? $scope.colorsOptions : ['#0b62a4', '#7A92A3'],
                                parseTime: false,
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };
                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Area(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);

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
                    filterOptions: '=',
                    colorsOptions: '=',
                    dashboardScope: '='

                },
                link: function ($scope, element) {
                    $scope.load = function ($scope, element) {
                        dataItemService.read({
                            // Need to change this to handle multiple tables on the same page
                            dataType: "chart",
                            id: $scope.chartId,
                            qs: $scope.filterOptions
                        }, function (data) {
                            // fire an event before loading chart after data was loaded
                            $scope.$emit('onStartChartLoad', $scope, data);
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
                                lineColors: $scope.colorsOptions ? $scope.colorsOptions : ['#0b62a4', '#7A92A3'],
                                pointSize: 15,
                                lineWidth: 0,
                                parseTime: false,
                                xkey: 'a',
                                ykeys: axises.substr(0, data.Data.length).split(''),
                                labels: data.Data.map(function (el) {
                                    return el.name
                                }),
                                hideHover: 'auto',
                                xLabelAngle: 45
                            };
                            // fire an event after loading chart
                            $scope.$emit('onBeforeChartLoad', $scope, data, opt);
                            if (!$scope.chart)
                                $scope.chart = Morris.Line(opt);
                            else {
                                $scope.chart.setData(opt.data);
                            }
                            // fire an event after loading chart
                            $scope.$emit('onAfterChartLoad', $scope, data, opt);

                        });
                    }
                    $scope.$watch('filterOptions', function (newVal, oldVal) {
                        if ($scope.filterOptions && newVal != oldVal) {
                            $scope.load($scope, element);

                        }
                    }, true);

                    $scope.load($scope, element);

                }
            }
        }])
