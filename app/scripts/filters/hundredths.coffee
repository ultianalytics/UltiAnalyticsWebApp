'use strict'

angular.module('newBetaApp')
  .filter 'hundredths', () ->
    (input) ->
      if _(input).isNaN()
        '*'
      else if _(input).isNumber()
        parseFloat(input.toFixed(2)).toLocaleString()
      else 'NA'
