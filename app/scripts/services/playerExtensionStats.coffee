'use strict'

angular.module('newBetaApp')
  .factory 'playerExtensionStats', ['$q', 'allGames',($q, allGames) ->
    playerName = ''
    consideredGames = []
    api = 
      setGames: (games)->
        consideredGames = games
      setPlayer: (name)->
        playerName = name
      getTargetMap: ()->
        children = []
        playersThrows = []
        _.each consideredGames, (game)->
          _.each game.points, (point)->
            _.each point.events, (event)->
              if event.passer is playerName then playersThrows.push event
        actions = _.groupBy playersThrows, 'action'
        _.each actions, (events, action)->
          receivers = _.countBy events, (event)-> event.receiver || 'The Other Team'
          _.each receivers, (count, player)->
            children.push
              actionType: action
              receiver: player
              value: count            


        children: children


    allGames.then (response) ->
      allGames = response
      deferred.resolve api
      
    deferred = $q.defer()
    deferred.promise
]
        # _.each(consideredEvents, function(event){
        #   targetMap[event.action] = targetMap[event.action] || {};
        #   targetMap[event.action][encodeURI(event.receiver)] = ++targetMap[event.action][encodeURI(event.receiver)] || 1;
        # });
        # _.each(targetMap, function(receivers, action){
        #   _.each(receivers, function(count, receiver){
        #     if (receiver === 'undefined') receiver = 'The Other Team';
        #     targetData.push({actionType: action, receiver: decodeURI(receiver), value: count});
        #   })
        # });
        # $scope.targetData = {children: targetData};