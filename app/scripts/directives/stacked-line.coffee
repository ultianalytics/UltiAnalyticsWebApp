'use strict'

angular.module('newBetaApp')
  .directive 'stackedLine', () ->
    template: '<div></div>'
    restrict: 'E'
    scope:
      data: '='
    link: (scope, element, attrs) ->

      color = d3.scale.category20c()

      $(window).resize ->
        if scope.lines then render scope.lines

      scope.$watch 'data', (newData)->
        if newData then render newData

      render = (data)->

        element.find('svg').remove()

        size = $(element).parent().width()
        margin = {top: 20, right: 20, bottom: 30, left: 50}
        width = size - margin.left - margin.right
        height = size / 2 - margin.top - margin.bottom

        d3Svg = d3.select(element[0]).append('svg')
          .attr("width", width + margin.left + margin.right + fontSize)
          .attr("height", height + margin.top + margin.bottom + fontSize * 2)
          .attr('class', 'stacked-line-chart')
        .append("g")
          .attr("transform", "translate(#{margin.left},#{fontSize})")


        x = d3.scale.linear().range([0, width])
        y = d3.scale.linear().range([height, 0])
        xAxis = d3.svg.axis().scale(x).orient 'bottom'
        yAxis = d3.svg.axis().scale(y).orient 'left'

        # line = d3.svg.line()
        #   .interpolate("basis")
        #   .x((d)-> x(d.x))
        #   .y((d)-> y(d.y))

        # color.domain d3.keys(data)
        # lines = color.domain().map (name)->
        #   name: name
        #   values: data[name]
        # maxXValue = 0;
        # _.each lines, (line)->
        #   _.each line.values, (value)->
        #     maxXValue = _.max [maxXValue, value.x * 1]
        # x.domain [
        #   0
        #   maxXValue
        # ]
        # y.domain [0, 100]

        # d3Svg.append("g")
        #   .attr("class", "x axis")
        #   .attr("transform", "translate( 0, #{height} )")
        #   .call(xAxis)
        #   .append("text")
        #     .attr("dy", ".71em")
        #     .attr("transform", "translate( 0, #{margin.bottom} )")
        #     .text("Wind Speed (mph)")


        # d3Svg.append("g")
        #   .attr("class", "y axis")
        #   .call(yAxis)
        #   .append("text")
        #     .attr("transform", "rotate(-90)")
        #     .attr("y", -margin.left)
        #     .attr("x", -1 * height / 2)
        #     .attr("dy", ".71em")
        #     .style("text-anchor", "end")
        #     .text("Scored (percent)")

# .axis path,
# .axis line {
#   fill: none;
#   stroke: #000;
#   shape-rendering: crispEdges;
# }

# .browser text {
#   text-anchor: end;
# }

# </style>
# <body>
# <script src="http://d3js.org/d3.v3.js"></script>
# <script>

# var margin = {top: 20, right: 20, bottom: 30, left: 50},
#     width = 960 - margin.left - margin.right,
#     height = 500 - margin.top - margin.bottom;

# var parseDate = d3.time.format("%y-%b-%d").parse,
#     formatPercent = d3.format(".0%");

# var x = d3.time.scale()
#     .range([0, width]);

# var y = d3.scale.linear()
#     .range([height, 0]);

# var color = d3.scale.category20();

# var xAxis = d3.svg.axis()
#     .scale(x)
#     .orient("bottom");

# var yAxis = d3.svg.axis()
#     .scale(y)
#     .orient("left")
#     .tickFormat(formatPercent);

# var area = d3.svg.area()
#     .x(function(d) { return x(d.date); })
#     .y0(function(d) { return y(d.y0); })
#     .y1(function(d) { return y(d.y0 + d.y); });

# var stack = d3.layout.stack()
#     .values(function(d) { return d.values; });

# var svg = d3.select("body").append("svg")
#     .attr("width", width + margin.left + margin.right)
#     .attr("height", height + margin.top + margin.bottom)
#   .append("g")
#     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

# d3.tsv("data.tsv", function(error, data) {
#   color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

#   data.forEach(function(d) {
#     d.date = parseDate(d.date);
#   });

#   var browsers = stack(color.domain().map(function(name) {
#     return {
#       name: name,
#       values: data.map(function(d) {
#         return {date: d.date, y: d[name] / 100};
#       })
#     };
#   }));

#   x.domain(d3.extent(data, function(d) { return d.date; }));

#   var browser = svg.selectAll(".browser")
#       .data(browsers)
#     .enter().append("g")
#       .attr("class", "browser");

#   browser.append("path")
#       .attr("class", "area")
#       .attr("d", function(d) { return area(d.values); })
#       .style("fill", function(d) { return color(d.name); });

#   browser.append("text")
#       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
#       .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
#       .attr("x", -6)
#       .attr("dy", ".35em")
#       .text(function(d) { return d.name; });

#   svg.append("g")
#       .attr("class", "x axis")
#       .attr("transform", "translate(0," + height + ")")
#       .call(xAxis);

#   svg.append("g")
#       .attr("class", "y axis")
#       .call(yAxis);
# });
