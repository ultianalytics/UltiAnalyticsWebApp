'use strict'

angular.module('newBetaApp')
  .controller 'LineCtrl', ['$scope', '$q', 'team','lineStats','LineView', 'filter', 'viewer', ($scope, $q, team, lineStats, LineView, filter, viewer) ->
    scope = $scope
    scope.dragging
    scope.includedGames = filter.included
    $scope.loading = true
    scope.lineViews = []
    $scope._bind = _.bind

    scope.lineViews.push new LineView
    if viewer.isLargeScreen() then scope.lineViews.push new LineView
    _.each scope.lineViews, (lineView)->
      lineView.addLine()
    scope.selectedLineView = _.first scope.lineViews

    $q.all([lineStats, team]).then (response)->
      team = response[1]
      lineStats = response[0]
      $scope.players = _.pluck team.players, 'name'
      $scope.loading = false
      $scope.teamStats = lineStats.getForTeam()
      scope.selectedLineView.selectedLine.updateStats()
    # update the lines on filter change
    scope.$watchCollection 'includedGames', (update, old)->
      if update and lineStats.getStats
        _(scope.lines).each (line)->
          line.updateStats()
        $scope.teamStats = lineStats.getForTeam()

    scope.setDragging = (player)->
      scope.dragging = player

    scope.addPlayerToSelected = (player)->
      scope.selectedLineView.selectedLine.addPlayer(player)

    scope.isSelectedLineView = (lineView)->
      scope.selectedLineView is lineView
    scope.selectLineView = (lineView)->
      scope.selectedLineView = lineView
      lineView.selectedLine.updateStats()

    scope._keys = _.keys
    scope._contains = _.contains
    scope.isNumber = (item)->
      typeof(item) is 'number'
    scope.floor = Math.floor
]