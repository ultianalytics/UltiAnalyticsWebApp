'use strict'

angular.module('newBetaApp')
  .factory 'lineStats', ['$q', 'filter', 'teamStats',($q, filter, teamStats) ->

    deferred = $q.defer()

    # wait for player names and games data.
    teamStats.then (response)->
      teamStats = response
      deferred.resolve api

    getConsideredPoints = (games, players)->
      consideredPoints = []
      _.each games, (game)->
        _.each game.points, (point)->
          if _.intersection(point.line, players).length is players.length
            #if the line contains all of the passed players
            consideredPoints.push point
      consideredPoints

    getConnectionStats = (points, players)->
      combinations = {}
      _.each points, (point)->
        _.each point.events, (event)->
          if _(players).contains(event.passer) and _(players).contains event.receiver
            connectionRef = combinations["Outcomes of #{event.passer} throwing to #{event.receiver}"] ?=
              total: 0
            connectionRef[event.action] ?= 0
            connectionRef[event.action]++
            connectionRef.total++
      combinations

    getPointSpread = (points)->
      _.countBy points, (point)->
        if point.events[point.events.length - 1].type is 'Offense' then return 'ours' else return 'theirs'

    getTotalPoints = (games)->
      _.reduce games, (total, game)->
        total + game.points.length
      , 0
    api =
      getStats: (players)->
        consideredPoints = getConsideredPoints filter.included, players
        oPoints = _.filter consideredPoints, (point)-> point.summary.lineType is 'O'
        dPoints = _.filter consideredPoints, (point)-> point.summary.lineType is 'D'
        pointSpread = getPointSpread consideredPoints

        results = {
          numberOfPointsConsidered: consideredPoints.length
          pointsPossible: getTotalPoints filter.included
          teamStats:
            conversionRate: "#{teamStats.getConversionRate consideredPoints, pointSpread.ours}%"
            pointSpread: "#{pointSpread.ours or 0} - #{pointSpread.theirs or 0}"
            offensiveProduction: "#{teamStats.getOffensiveProductivity(consideredPoints) or 'NA'}%"
            breaksPerPoint: "@todo"
            favoriteTarget: "@todo"
          connectionStats: getConnectionStats consideredPoints, players


        }
        results

    deferred.promise
]