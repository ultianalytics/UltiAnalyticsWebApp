// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').directive('stackedLine', function() {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        var color, render;
        color = d3.scale.category20c();
        $(window).resize(function() {
          if (scope.lines) {
            return render(scope.lines);
          }
        });
        scope.$watch('data', function(newData) {
          if (newData) {
            return render(newData);
          }
        });
        return render = function(data) {
          var d3Svg, height, margin, size, width, x, xAxis, y, yAxis;
          element.find('svg').remove();
          size = $(element).parent().width();
          margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
          };
          width = size - margin.left - margin.right;
          height = size / 2 - margin.top - margin.bottom;
          d3Svg = d3.select(element[0]).append('svg').attr("width", width + margin.left + margin.right + fontSize).attr("height", height + margin.top + margin.bottom + fontSize * 2).attr('class', 'stacked-line-chart').append("g").attr("transform", "translate(" + margin.left + "," + fontSize + ")");
          x = d3.scale.linear().range([0, width]);
          y = d3.scale.linear().range([height, 0]);
          xAxis = d3.svg.axis().scale(x).orient('bottom');
          return yAxis = d3.svg.axis().scale(y).orient('left');
        };
      }
    };
  });

}).call(this);
