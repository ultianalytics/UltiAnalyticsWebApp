'use strict'

angular.module('newBetaApp')
  .directive 'share', ($routeParams, $location, api, filter, allGames, teamName) ->
    templateUrl: 'includes/partials/share.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
      scope.escapeUrl = window.escape
      teamName.then (response)->
        scope.teamName = response
      scope.startSharing = ->
        scope.sharingModalIsOpen = true

        stateType = $location.path().match(/\/[^\/]+\/\w+/)[0].replace(/\/[^\/]+\//, '')

        api.saveState $routeParams.teamId, stateType,
          gameIds: _.pluck filter.included, 'gameId'
        , (response)->
          scope.$apply ->
            scope.shareUrl = "#{window.location.host}/#/#{$routeParams.teamId}/share/#{response.type}/#{response.stateId}"

        FB.init
          appId: 1442600126018189
          version: 'v2.0'
          status: true
          xfbml: true

      scope.fbShare = ->
        FB.ui
          method: 'share'
          href: scope.shareUrl
