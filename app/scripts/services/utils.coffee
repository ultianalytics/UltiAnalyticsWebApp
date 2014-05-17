'use strict'

angular.module('newBetaApp')
  .factory 'utils', () ->
    objToArr: (obj, keyName)->
      _.reduce obj, (arr, chunk, key)->
        if keyName then chunk[keyName] = key
        arr.push chunk
        arr
      , []