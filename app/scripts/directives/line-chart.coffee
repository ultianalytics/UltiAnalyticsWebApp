'use strict'

angular.module('newBetaApp')
  .directive 'lineChart', () ->
    restrict: 'E'
    template: '<chart-key color-scheme="colorMap"></chart-key>'
    scope:
      lines: '='
    link: (scope, element, attrs) ->

      format = d3.format(",d")
      color = d3.scale.category20c()

      $(window).resize ->
        if scope.lines then render scope.lines
      scope.$watch 'lines', (newData)->
        if newData then render newData

      render = (data)->
        scope.colorMap = {}
        element.find('svg').remove()

        size = $(element).parent().width()
        fontSize = 10
        margin = {top: 0, right: 80, bottom: 20, left: 40}
        width = size - margin.left - margin.right - fontSize
        height = size / 2 - margin.top - margin.bottom - fontSize * 2

        d3Svg = d3.select(element[0]).append('svg')
          .attr("width", width + margin.left + margin.right + fontSize)
          .attr("height", height + margin.top + margin.bottom + fontSize * 2)
          .attr('class', 'line-chart')
        .append("g")
          .attr("transform", "translate(#{margin.left},#{fontSize})")


        x = d3.scale.linear().range([0, width])
        y = d3.scale.linear().range([height, 0])
        xAxis = d3.svg.axis().scale(x).orient 'bottom'
        yAxis = d3.svg.axis().scale(y).orient 'left'

        line = d3.svg.line()
          .interpolate("basis")
          .x((d)-> x(d.x))
          .y((d)-> y(d.y))

        color.domain d3.keys(data)
        lines = color.domain().map (name)->
          name: name
          values: data[name]
        maxXValue = 0;
        _.each lines, (line)->
          _.each line.values, (value)->
            maxXValue = _.max [maxXValue, value.x * 1]
        x.domain [
          0
          maxXValue
        ]
        y.domain [0, 100]

        d3Svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate( 0, #{height} )")
          .call(xAxis)
          .append("text")
            .attr("dy", ".71em")
            .attr("transform", "translate( 0, #{margin.bottom} )")
            .text("Wind Speed (mph)")


        d3Svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", -1 * height / 2)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Scored (percent)")

        graphLines = d3Svg.selectAll(".line")
          .data(lines)
        .enter().append("g")
          .attr("class", "line");

        graphLines.append("path")
          .attr("class", "line")
          .attr("d", (d)-> line(d.values) )
          .style("stroke", (d)-> color(d.name) )

        graphLines.append("text")
          .datum( (d)-> {name: d.name, value: d.values[d.values.length - 1]} )
          .attr("transform", (d)-> "translate(#{ x(d.value.x) }, #{ y(d.value.y)} )")
          .attr("x", 3)
          .attr("dy", ".35em")
          .text((d)-> d.name )






# var svg = d3.select("body").append("svg")
#     .attr("width", width + margin.left + margin.right)
#     .attr("height", height + margin.top + margin.bottom)
  # .append("g")
  #   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

#   color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

#   data.forEach(function(d) {
#     d.date = parseDate(d.date);
#   });

#   var cities = color.domain().map(function(name) {
#     return {
#       name: name,
#       values: data.map(function(d) {
#         return {date: d.date, temperature: +d[name]};
#       })
#     };
#   });

#   x.domain(d3.extent(data, function(d) { return d.date; }));

#   y.domain([
#     d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
#     d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
#   ]);




#   var city = svg.selectAll(".city")
#       .data(cities)
#     .enter().append("g")
#       .attr("class", "city");

#   city.append("path")
#       .attr("class", "line")
#       .attr("d", function(d) { return line(d.values); })
#       .style("stroke", function(d) { return color(d.name); });

#   city.append("text")
#       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
#       .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
#       .attr("x", 3)
#       .attr("dy", ".35em")
#       .text(function(d) { return d.name; });
# });

# </script>