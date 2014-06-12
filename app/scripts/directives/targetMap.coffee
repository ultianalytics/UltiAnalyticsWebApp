'use strict'

angular.module('newBetaApp')
  .directive 'targetMap', ['$parse', '$rootScope',($parse, $rootScope) ->
    templateUrl: 'includes/partials/targetMap.html'
    restrict: 'E'
    scope:
      data: '='
    link: (scope, element, attrs) ->
      scope.keyEvents = ['Drop', 'Catch', 'Throwaway', 'Goal']
      scope.getColor = (action)->
        color = switch
          when action is 'Drop' then '#c5007c'
          when action is 'Catch' then '#949A27'
          when action is 'Throwaway' then '#ff9400'
          when action is 'Goal' then '#298020'
          else '#c75aba'

      getText = (data)->
        at = data.actionType
        dv = $rootScope.getName(data.value, 'shortened')
        dr = $rootScope.getName(data.receiver, 'shortened')
        plural = dv > 1
        text = switch
          when at is 'Throwaway' then dv + (if plural then ' throwaways' else ' throwaway')
          when at is 'Catch' then dv + (if plural then ' passes to ' else ' pass to ') + dr
          when at is 'Goal' then dv + (if plural then ' Goals to ' else ' Goal to ') + dr
          when at is 'Drop' then dv + (if plural then ' dropped passes to ' else ' dropped pass to ') + dr
          else at + ', ' + dr


      height = parseInt($(element.parent()).css 'width') + 150
      diameter = height - 150
      $(element.parent()).css 'height', height

      scope.$watch 'data', ->
        render()
      window.onresize = ->
        render()

      render = ->
        if scope.data
          d3.select('#target-map').select('svg').remove()

          format = d3.format ',d'
          color = d3.scale.category20c()

          tooltip = d3.select('#target-map')
          .append('div')
          .attr('class', 'target-mouseover-tooltip')
          .text('a simple tooltip')

          bubble = d3.layout.pack()
          .sort(null)
          .size( [diameter, height + 100])
          .padding( 1.5)

          svg = d3.select('#target-map')
          .append( 'svg')
          .attr( 'width', diameter)
          .attr( 'height', height + 100)
          .attr( 'class', 'bubble')

          node = svg.selectAll('.node')
          .data( bubble.nodes(scope.data).filter (d)-> not d.children)
          .enter()
          .append( 'g')
          .attr( 'class', 'target-node')
          .attr( 'transform', (d)-> 'translate(' + d.x + ',' + d.y + ')')
          .on 'mouseover', (d)->
            tooltip.style( 'visibility', 'visible')
            .text getText(d)
          .on 'mousemove', ->
            tooltip.style( 'top', d3.event.y - 10 + 'px')
            .style( 'left', d3.event.x + 10 + 'px')
          .on 'mouseout', ->
            tooltip.style( 'visibility', 'hidden')

          node.append( 'circle')
          .attr( "r", (d)-> d.r)
          .style( "fill", (d)-> scope.getColor d.actionType, true)

          node.append( 'text')
          .attr( 'dy', '.5em')
          .style( 'text-anchor', 'middle')
          .text (d)->
            if _.contains d.receiver.toLowerCase(), 'anonymous' then return 'The other team'
            $rootScope.getName(d.receiver, 'shortened').substring 0, d.r / 3

          d3.select( self.frameElement)
          .style 'height', diameter + 'px'
]
