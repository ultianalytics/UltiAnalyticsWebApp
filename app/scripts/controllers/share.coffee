'use strict'

angular.module('newBetaApp')
  .controller 'ShareCtrl', ($scope, $routeParams, $location, api, allGames, filter, savedState) ->
    api.retrieveState $routeParams.teamId, $routeParams.stateId, $routeParams.stateType, (response)->
      allGames.then (games)->
        data = JSON.parse response.json
        savedState.set data
        filter.onlyInclude _.reduce( data.gameIds, (memo, gameId)->
          memo.push games[gameId]
          memo
        , [])
        $location.replace()
        $location.url "#{$routeParams.teamId}/#{response.type}"