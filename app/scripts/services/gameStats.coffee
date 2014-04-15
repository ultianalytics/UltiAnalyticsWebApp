'use strict'

angular.module('newBetaApp')
  .factory 'gameStats', ['$q', 'allGames', 'playerStats',($q, allGames, playerStats) ->
    deferred = $q.defer()

    $q.all([allGames, playerStats]).then (response)->
      allGames = response[0]
      playerStats = response[1]
      deferred.resolve api

    api = {}

    api.getFor = (game)->
      results = {}
      playerStats.setGames [game]
      players = playerStats.getAll()

      # record
      relevant = _.where allGames, {opponentName: game.opponentName}
      unless _(relevant).isArray()
        relevant = [relevant]
      results.record = _.countBy relevant, (game)->
        if game.ours > game.theirs then 'wins' else 'losses'
      _(results.record).defaults
        wins: 0
        losses: 0

      # leaders
      leaders = {}
      _(['goals', 'assists', 'ds', 'throwaways', 'plusMinus']).each (type)->
        leaders[type] = _.max players, (player)->
          player.stats[type]

      results.leaders = leaders
      results

    deferred.promise
]