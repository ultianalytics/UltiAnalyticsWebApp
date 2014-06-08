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

    getDatafulPlayers = (points, players)->
      _.reduce points, (map, point)->
        _.each point.line, (player)->
          map[player] = true
        map
      , {}

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

    makeChild = (name, countedEvents)->
      box =
        playerName: name
        isPlayer: true
        value: 0
        stats: {}
      _.each countedEvents, (name)->
        box.stats[name] = 0
      box

    countEvent = (player, eventType)->
      player.stats[eventType]++
      player.value++

    getBubbleMapStats = (points, players)->
      countedEvents = ['Throwaway', 'Catch', 'Goal', 'D', 'Assist']
      children = _.reduce players, (boxes, player)->
        boxes[player] = makeChild player, countedEvents
        boxes
      , {}
      children.team = makeChild 'Average', countedEvents
      children.team.isPlayer = false

      _.each points, (point)-> #TODO use the playerstats one for this.
        _.each point.events, (event)->
          if _(countedEvents).contains(event.action)
            if event.action is 'Throwaway'
              if _(players).contains(event.passer) then countEvent(children[event.passer], 'Throwaway') else  countEvent(children.team, 'Throwaway')
            else if event.action is 'Goal'
              if _(players).contains(event.passer) then  countEvent(children[event.passer], 'Assist') else  countEvent(children.team, 'Assist')
              if _(players).contains(event.receiver) then  countEvent(children[event.receiver], 'Goal') else  countEvent(children.team, 'Goal')
            else if event.action is 'D'
              if _(players).contains(event.defender) then  countEvent(children[event.defender], 'D') else  countEvent(children.team, 'D')
            else if event.action is 'Catch'
              if _(players).contains(event.receiver) then  children[event.receiver].value++ else  children.team.value++

      numberOfFillers = 6 - _.keys(children).length
      children.team.value = children.team.value / 7

      _.each children, (child)->
        child.stats = _.reduce child.stats, (arr, val, name)->
          arr.push
            label: name
            value: val
          arr
        , []

      bubbleStats =
        children: utils.objToArr children

      for num in [0..numberOfFillers]
        bubbleStats.children.push _.clone(children.team)

      _.each bubbleStats.children, (child)->
        child.id = Math.random().toString().slice(2)
        child.value = Math.pow child.value, 3

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
            offensiveProduction: "#{teamStats.getProductivity(consideredPoints, 'Offense') or 'NA'}%"
            defensiveProduction: "#{teamStats.getProductivity(consideredPoints, 'Defense') or 'NA'}%"
          connectionStats: getConnectionStats consideredPoints, players
          bubbleStats: getBubbleMapStats consideredPoints, players
          datafulPlayers: getDatafulPlayers consideredPoints, players

        results
      getForTeam: ()->
        consideredPoints = getAllPoints filter.included
        pointSpread = getPointSpread consideredPoints

        conversionRate: "#{teamStats.getConversionRate consideredPoints, pointSpread.ours}%"
        pointSpread: "#{pointSpread.ours or 0} - #{pointSpread.theirs or 0}"
        offensiveProduction: "#{teamStats.getProductivity(consideredPoints, 'Offense') or 'NA'}%"
        defensiveProduction: "#{teamStats.getProductivity(consideredPoints, 'Defense') or 'NA'}%"

    deferred.promise
]