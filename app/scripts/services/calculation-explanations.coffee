'use strict'

angular.module('newBetaApp')
  .factory 'calculationExplanations', () ->
    _.indexBy UltiAnalytics.explanations, "name"

