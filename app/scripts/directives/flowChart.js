/*global d3, angular */
angular.module('newBetaApp')
  .directive('flowChart', function() {
    return {
      restrict: 'AE',
      template: '<svg></svg>',
      scope: {
        dataset: '='
      },
      compile: function() {
        return {
          pre: function(scope, element) {
            scope.svg = d3.select(element.children()[0]);
          },
          post: function (scope, element) {
            scope.$watch('dataset', function(newVal, oldVal) {
              if (scope.dataset){
                if (newVal && oldVal){
                  element.contents().empty();
                }
                var margin = {
                  top: 1,
                  right: 1,
                  bottom: 6,
                  left: 1
                };
                var width = element[0].offsetWidth * .95;
                var height = width;

                var formatNumber = d3.format(',.0f');
                var format = function(d) {
                  return formatNumber(d) + ' Times';
                };
                var color = d3.scale.category20();

                scope.svg
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                var sankey = d3.sankey()
                  .nodeWidth(15)
                  .nodePadding(10)
                  .size([width, height]);

                var path = sankey.link();

                sankey
                  .nodes(scope.dataset.nodes)
                  .links(scope.dataset.links)
                  .layout(32);

                var link = scope.svg.append('g').selectAll('.link')
                  .data(scope.dataset.links)
                  .enter().append('path')
                  .attr('class', 'link')
                  .attr('d', path)
                  .style('stroke-width', function(d) {
                    return Math.max(1, d.dy);
                  })
                  .sort(function(a, b) {
                    return b.dy - a.dy;
                  });

                link.append('title')
                  .text(function(d) {
                    return d.source.name.slice(0, d.source.name.length - 1) + ' → ' + d.target.name.slice(0, d.target.name.length - 1) + '\n' + format(d.value);
                  });
                var node = scope.svg.append('g').selectAll('.node')
                  .data(scope.dataset.nodes)
                  .enter().append('g')
                  .attr('class', 'node')
                  .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                  })
                  .call(d3.behavior.drag()
                    .origin(function(d) {
                      return d;
                    })
                    .on('dragstart', function() {
                      this.parentNode.appendChild(this);
                    })
                    .on('drag', dragmove));

                node.append('rect')
                  .attr('height', function(d) {
                    return d.dy;
                  })
                  .attr('width', sankey.nodeWidth())
                  .style('fill', function(d) {
                    return d.color = color(d.name.replace(/ .*/, ""));
                  })
                  .style('stroke', function(d) {
                    return d3.rgb(d.color).darker(2);
                  })
                  .append('title')
                  .text(function(d) {
                    return d.name + '\n' + format(d.value);
                  });

                node.append('text')
                  .attr('x', -6)
                  .attr('y', function(d) {
                    return d.dy / 2;
                  })
                  .attr('dy', '.35em')
                  .attr('text-anchor', 'end')
                  .attr('transform', null)
                  .text(function(d) {
                    return d.name.substring(0, d.name.length - 1);
                  })
                  .filter(function(d) {
                    return d.x < width / 2;
                  })
                  .attr('x', 6 + sankey.nodeWidth())
                  .attr('text-anchor', 'start');

                var dragmove = function(d) {
                  d3.select(this).attr('transform', 'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ')');
                  sankey.relayout();
                  link.attr('d', path);
                }
              }
            });
          }
        };
      }
    };
  });