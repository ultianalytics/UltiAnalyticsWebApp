'use strict'

angular.module('newBetaApp')
  .factory 'Line', ['lineStats',(lineStats) ->
    lineStats.then (response)->
      lineStats = response
    lineNum = 0
    class Line
      constructor: ->
        @stats = {}
        @id = ++lineNum
        @players = []
      addPlayer: (player)=>
        if @players.length < 7
          @players = _.union @players, [player]
          @updateStats()
      removePlayer: (player)->
        @players = _.without @players, player
        @updateStats()
      updateStats: ()->
        @stats = lineStats.getStats @players
]