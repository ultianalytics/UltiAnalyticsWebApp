/* global d3, _ */

'use strict';

angular.module('newBetaApp')
  .directive('pieChart', ['$parse',function ($parse) {
    return {
      template: '<svg></svg>',
      restrict: 'AE',
      scope: {
        dataset: '='
      },
      compile: function () {
        return {
            pre: function(scope, element, attrs){
              scope.svg = d3.select(element.children()[0]);
            },
            post: function(scope, element, attrs){
              scope.$watch('dataset', function(newVal){
                if (newVal && _.keys(newVal).length) initialized ? change(newVal) : init(newVal);
              });
              var g;
              var initialized = false;
              var width = $parse(attrs.width)(scope);
              var height = $parse(attrs.height)(scope);
              var radius = Math.min(width, height) / 2;

              var enterClockwise = {startAngle: 0, endAngle: 0};
              var enterAntiClockwise = {startAngle: Math.PI * 2, endAngle: Math.PI * 2 };

              var color = d3.scale.category20();
              var pie = d3.layout.pie()
                .sort(null)
                .value(function(d){ return d.iterations });

              var arc = d3.svg.arc().innerRadius(0).outerRadius(radius - 10);

              scope.svg
                  .attr('width', width)
                  .attr('height', height)
                .append('g')
                  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

              function formatData(data){
                return _.reduce(data,function(memo, item, key){
                  memo.push({range: key, iterations: item});
                  return memo;
                },[]);
              }
              function change(newData){
                scope.svg.selectAll('g').remove()

                init(newData);
              }
              function init(data){
                initialized = true;
                g = scope.svg.selectAll('.arc')
                  .data(pie(formatData(data)))
                  .enter().append('g')
                  .attr('class', 'arc');

                g.append('path')
                  .attr('d', arc)
                  .style('fill', function(d, i) { return color(i); })
                  .each(function(d) { this.oldD = d; });

                g.append('text')
                  .attr('transform', function(d) {return 'translate(' + arc.centroid(d) + ')'; })
                  .attr('dy', '.35em')
                  .style('text-anchor', 'middle')
                  .style('fill','white')
                  .text(function(d) { return d.data.range; });

                g.attr('transform', 'translate('+ width / 2 +','+ width / 2 +')');

              }
            }
        };
      }
    };
  }]);
