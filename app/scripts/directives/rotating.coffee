'use strict'

angular.module('newBetaApp')
  .directive 'rotating', () ->
    restrict: 'A'
    scope:
      rotating: '='
    compile: ->
      pre: (scope,element,attrs)->
        element.addClass('rotating')
        scope.$watch 'rotating', (newVal, oldVal)->
          element.css '-webkit-transform', 'rotate(' + newVal + 'deg)'
          element.css '-moz-transform', 'rotate(' + newVal + 'deg)'
          element.css 'transform', 'rotate(' + newVal + 'deg)'

