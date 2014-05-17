'use strict'

angular.module('newBetaApp')
  .factory 'utils', () ->
    objToArr: (obj)->
      _.reduce obj, (arr, chunk)->
        arr.push chunk
        arr
      , []