'use strict'

angular.module('newBetaApp')
  .controller 'MainCtrl', ($rootScope, filter) ->
    $rootScope.getSharedData = ->
      data = {}
      data.gameIds = _.pluck filter.included, 'gameId'
      data


