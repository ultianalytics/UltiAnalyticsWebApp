'use strict'

angular.module('newBetaApp')
  .factory 'LineView', (Line) ->
    class LineView
      constructor: ->
        @selectedLine = null
        @lines = {}
      addLine: (silent)->
        line = new Line
        @lines[line.id] = line
        unless silent then @selectedLine = line
        line
      removeLine: (line)->
        delete @lines[line.id]
      selectLine: (line)->
        @selectedLine = line
      isSelectedLine: (line)->
        @selectedLine is line
      selectedAddPlayer: (player)=>
        @selectedLine.addPlayers player
      numberOfLines: ->
        _.keys(@lines).length
    LineView
