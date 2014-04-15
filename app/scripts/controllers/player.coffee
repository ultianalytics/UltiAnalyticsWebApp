'use strict'

angular.module('newBetaApp')
  .controller 'PlayerCtrl', ['$scope', '$routeParams', '$q', 'allGames', 'playerExtensionStats', 'filter', ($scope, $routeParams, $q, allGames, playerExtensionStats, filter) ->
    scope = $scope
    scope.loading = true
    scope.console = console
    players = null
    scope.playerName = decodeURI $routeParams.playerNameUri
    $q.all([allGames, playerExtensionStats]).then (responses)->
      allGames = responses[0]
      playerExtensionStats = responses[1]
      init()
      scope.loading = false

    init = ->
      filter.includeAll()
      scope.included = filter.included
      playerExtensionStats.setPlayer scope.playerName
      scope.$watchCollection 'included', ->
        playerExtensionStats.setGames scope.included
        scope.targetStats = playerExtensionStats.getTargetMap()
]