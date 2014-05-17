'use strict'

angular.module('newBetaApp')
  .factory 'lineStats', ['$q', 'filter', 'teamStats','utils',($q, filter, teamStats, utils) ->

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
      spread = _.countBy points, (point)->
        if point.events[point.events.length - 1].type is 'Offense' then return 'ours' else return 'theirs'
      spread.ours ?= 0
      spread.theirs ?= 0
      spread

    getAllPoints = (games)->
      _.reduce games, (total, game)->
        total.concat game.points
      , []

    makeBox = (name, countedEvents)->
      box =
        playerName: name
        isPlayer: true
        value: 0
        stats: {}
      _.each countedEvents, (name)->
        box.stats[name] = 0
      box

    flatten = (containers)->
      _.reduce containers,

    getBubbleMapStats = (points, players)->
      countedEvents = ['Drop', 'Catch', 'Goal', 'D']
      statBoxes = _.reduce players, (boxes, player)->
        boxes[player] = makeBox player, countedEvents
        boxes
      , {}
      statBoxes.team = makeBox 'team', countedEvents
      statBoxes.team.isPlayer = false

      _.each points, (point)->
        _.each point.events, (event)->
          if _(countedEvents).contains(event.action)
            hero = event.receiver or event.defender
            if _(players).contains(hero)
              statBoxes[hero].stats[event.action]++
              statBoxes[hero].value++
            else
              statBoxes.team.stats[event.action]++
              statBoxes.team.value++

      numberOfFillers = 7 - _.keys(statBoxes).length
      statBoxes.team.value = statBoxes.team.value / 7
      bubbleStats =
        children: utils.objToArr statBoxes

      for num in [0..numberOfFillers]
        bubbleStats.children.push _.clone(statBoxes.team)

      bubbleStats

    api =
      getStats: (players)->
        consideredPoints = getConsideredPoints filter.included, players
        oPoints = _.filter consideredPoints, (point)-> point.summary.lineType is 'O'
        dPoints = _.filter consideredPoints, (point)-> point.summary.lineType is 'D'
        pointSpread = getPointSpread consideredPoints

        results =
          numberOfPointsConsidered: consideredPoints.length
          pointsPossible: getAllPoints(filter.included).length
          teamStats:
            conversionRate: "#{teamStats.getConversionRate consideredPoints, pointSpread.ours}%"
            pointSpread: "#{pointSpread.ours or 0} - #{pointSpread.theirs or 0}"
            offensiveProduction: "#{teamStats.getOffensiveProductivity(consideredPoints) or 'NA'}%"
            breaksPerPoint: "@todo"
            favoriteTarget: "@todo"
          connectionStats: getConnectionStats consideredPoints, players
          bubbleStats: getBubbleMapStats consideredPoints, players
        results
      getForTeam: ()->
        consideredPoints = getAllPoints filter.included
        pointSpread = getPointSpread consideredPoints

        conversionRate: "#{teamStats.getConversionRate consideredPoints, pointSpread.ours}%"
        pointSpread: "#{pointSpread.ours or 0} - #{pointSpread.theirs or 0}"
        offensiveProduction: "#{teamStats.getOffensiveProductivity(consideredPoints) or 'NA'}%"
        breaksPerPoint: "@todo"
        favoriteTarget: "@todo"

    deferred.promise
]