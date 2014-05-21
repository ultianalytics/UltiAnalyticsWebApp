'use strict'

angular.module('newBetaApp')
  .factory 'calculationExplanations', () ->
    console.log UltiAnalytics.explanations
    _.indexBy UltiAnalytics.explanations, "name"

