'use strict'

angular.module('newBetaApp')
  .factory 'LineView', (Line) ->
    class LineView
      constructor: ->
        @selectedLine = null
        @lines = {}
      addLine: ->
        line = new Line
        @lines[line.id] = @selectedLine = line
      removeLine: (line)->
        delete @lines[line.id]
      selectLine: (line)->
        @selectedLine = line
      selectedAddPlayer: (player)=>
        @selectedLine.addPlayer player
      numberOfLines: ->
        _.keys(@lines).length
    LineView
