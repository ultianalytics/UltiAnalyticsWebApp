'use strict'

angular.module('newBetaApp')
  .directive 'bubblePie', () ->
    restrict: 'E'
    template: '<chart-key color-scheme="colorMap"></chart-key>'
    scope:
      data: '='
    link: (scope, element, attrs) ->

      format = d3.format(",d")
      color = d3.scale.category20c()

      $(window).resize ->
        if scope.data then render scope.data
      scope.$watch 'data', (newData)->
        if newData then render(newData)

      render = (data)->
        scope.colorMap = {}
        element.find('svg').remove()

        size = $(element).parent().width()

        d3Svg = d3.select(element[0]).append('svg')
          .attr('width' , size)
          .attr('height' , size)
          .attr('class', 'bubble-pie')

        pie = d3.layout.pie()
          .value (d)-> d.value

        bubble = d3.layout.pack()
          .sort(null)
          .size([size, size])
          .padding(5)

        bubbles = d3Svg.selectAll('.bubble')
          .data( bubble.nodes(data).filter( (d)-> !d.children ) )
          .enter().append('g')
          .attr('class', 'bubble')
          .attr 'transform', (d)->
            "translate(#{d.x},#{d.y})"

        bubbles.append('text')
          .attr('dy', '.3em')
          .style('text-anchor', 'middle')
          .text (d)->
            d.playerName.substring 0, d.r / 3

        persister = {}

        _.each bubbles[0], (bubble)->
          data = bubble.__data__

          persister["arc#{ data.id }"] = d3.svg.arc().outerRadius(data.r)

          persister["arcs#{ data.id }"] = d3Svg.selectAll("g.slice#{ data.id }")    # //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie(data.stats))
            .enter()
            .insert("svg:g", ":first-child")
            .attr("class", "slice#{ data.id }")
            .attr "transform", "translate( #{data.x}, #{data.y})"

          arc = persister["arc#{ data.id }"]
          arcs = persister["arcs#{ data.id }"]

          arcs.append("svg:path")
            .attr "fill", (d, i)->
              tempColor = color(i)
              unless d.data.label is 'Catch' then scope.colorMap[d.data.label] = tempColor
              tempColor
            .attr( "d", arc )

          arcs.append("title")
            .text (d, i)->
              "#{ d.value } #{data.stats[i].label}s"

