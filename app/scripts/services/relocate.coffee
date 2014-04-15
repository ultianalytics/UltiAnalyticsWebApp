'use strict'

angular.module('newBetaApp')
  .factory 'relocate', ['$location', '$routeParams',($location, $routeParams) ->
    base = $routeParams.teamId + '/'
    goTo: (route, query) ->
      $location.path base + route + '/' + decodeURIComponent(query)
]