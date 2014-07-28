'use strict'

angular.module('newBetaApp')
  .factory 'savedState', () ->
    data = {}
    getOnce: ->
      temp = data
      data = {}
      temp
    set: (newData)->
      _.extend data, newData