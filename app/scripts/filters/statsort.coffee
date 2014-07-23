'use strict'

angular.module('newBetaApp')
  .filter 'statSort', ($rootScope) ->
    (input, type, reverse) ->
      unless input then return Math.random()
      copy = _.clone input
      factor = if reverse then 1 else -1
      copy.sort (playerA, playerB)->
        if type isnt 'name'
          statA = if _.isNaN(playerA.stats[type]) then -9999999 else playerA.stats[type]
          statB = if _.isNaN(playerB.stats[type]) then -9999999 else playerB.stats[type]
          diff = statA - statB
          diff * factor
        else
          nameToSortA = $rootScope.getName(playerA.name, 'last') or $rootScope.getName(playerA.name, 'first')
          nameToSortB = $rootScope.getName(playerB.name, 'last') or $rootScope.getName(playerB.name, 'first')
          if nameToSortA < nameToSortB then return factor
          else if nameToSortA > nameToSortB then return factor * -1

