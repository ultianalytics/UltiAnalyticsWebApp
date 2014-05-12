'use strict'

angular.module('newBetaApp')
  .filter 'statSort', () ->
    (input, type, reverse) ->
      unless input then return Math.random()
      copy = _.clone input
      factor = if reverse then 1 else -1
      copy.sort (playerA, playerB)->
        if type isnt 'name'
          diff = playerA.stats[type] - playerB.stats[type]
          diff * factor
        else
          if playerA.name < playerB.name then return factor
          else if playerA.name > playerB.name then return factor * -1

