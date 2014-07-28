'use strict'

angular.module('newBetaApp')
  .factory 'Line', ['lineStats', (lineStats) ->
    lineStats.then (response)->
      lineStats = response
    lineNum = 0
    class Line
      getPlayers: ->
        @players
      constructor: ->
        @stats = {}
        @id = ++lineNum
        @players = []
      addPlayers: (players)=>
        if @players.length < 7
          unless _(players).isArray() then players = [players]
          @players = _.union @players, players
          @updateStats()
      removePlayer: (player)->
        @players = _.without @players, player
        @updateStats()
      updateStats: ()->
        @stats = lineStats.getStats @players
]