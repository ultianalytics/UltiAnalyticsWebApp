'use strict'

angular.module('newBetaApp')
  .controller 'LineCtrl', ['$scope', '$q', 'team','lineStats','LineView', 'filter', 'viewer','savedState', ($scope, $q, team, lineStats, LineView, filter, viewer, savedState) ->
    scope = $scope
    scope.dragging
    scope.includedGames = filter.included
    $scope.loading = true
    scope.lineViews = []
    $scope._bind = _.bind

    scope.lineViews.push new LineView
    if viewer.isLargeScreen() then scope.lineViews.push new LineView
    scope.selectedLineView = _.first scope.lineViews

    $q.all([lineStats, team]).then (response)->
      team = response[1]
      lineStats = response[0]
      savedState = savedState.getOnce()
      $scope.players = _.pluck team.players, 'name'
      $scope.teamStats = lineStats.getForTeam()
      if savedState.lines
        setFromSaved savedState.lines
      else
        _.each scope.lineViews, (lineView)->
          lineView.addLine()
      $scope.loading = false

    # update the lines on filter change
    scope.$watchCollection 'includedGames', (update, old)->
      if update and lineStats.getStats # promises resolved.
        _(scope.lineViews).each (lineView)->
          lineView.updateStats()
        $scope.teamStats = lineStats.getForTeam()

    scope.setDragging = (player)->
      scope.dragging = player

    scope.addPlayerToSelected = (player)->
      scope.selectedLineView.selectedLine.addPlayers player

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

    scope.getSharedData = ->
      data = scope.$parent.getSharedData()
      data.lines = []
      _.each scope.lineViews, (view, lvIndex)->
        _.each view.lines, (line)->
          console.log line.getPlayers()
          data.lines.push
            players: line.getPlayers()
            index: lvIndex
            isSelected: view.isSelectedLine (line)
      data


    setFromSaved = (lineObjects)->
      _.each lineObjects, (lineObj)->
        appropriateLineView = $scope.lineViews[lineObj.index % $scope.lineViews.length]
        line = appropriateLineView.addLine true
        line.addPlayers lineObj.players
        if lineObj.isSelected then appropriateLineView.selectLine line

]