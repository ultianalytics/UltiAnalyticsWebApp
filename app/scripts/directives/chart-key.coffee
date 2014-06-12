'use strict'

angular.module('newBetaApp')
  .directive 'chartKey', () ->
    templateUrl: 'includes/partials/chart-key.html'
    restrict: 'E'
    scope:
      colorScheme: '='
