'use strict'

angular.module('newBetaApp')
  .filter 'linePlayers', () ->
    (input) ->
      if input.length <= 1 then "#{input.join()} played"
      else
        "#{input.slice(0, -1).join(', ')} and #{_.last input} played together"
