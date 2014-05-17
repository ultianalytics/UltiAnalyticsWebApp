'use strict'

angular.module('newBetaApp')
  .directive 'bubblePie', () ->
    restrict: 'E'
    replace: true
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

        element.empty()

        size = $(element).parent().width()

        d3Svg = d3.select(element[0]).append('svg')
          .attr('width' , size)
          .attr('height' , size)
          .attr('class', 'bubble-pie')

        bubble = d3.layout.pack()
          .sort(null)
          .size([size, size])
          .padding(1.5)

        node = d3Svg.selectAll('.node')
          .data( bubble.nodes(data).filter( (d)-> !d.children ) )
          .enter().append('g')
          .attr('class', 'node')
          .attr 'transform', (d)->
            "translate(#{d.x},#{d.y})"

        node.append('title')
          .text (d)->
            d.playerName + ': ' + format(d.value)

        node.append('circle')
          .attr('r', (d)-> return d.r )
          .style 'fill',
            (d)-> return color(d.isPlayer)

        node.append('text')
          .attr('dy', '.3em')
          .style('text-anchor', 'middle')
          .text (d)->
            d.playerName.substring 0, d.r / 3
