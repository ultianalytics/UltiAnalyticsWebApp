'use strict'

angular.module('newBetaApp')
  .filter 'upperCase', () ->
    (input) ->
      if _(input).isString()
        input.slice(0,1).toUpperCase() + input.slice 1
