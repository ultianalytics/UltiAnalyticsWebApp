'use strict'

angular.module('newBetaApp')
  .directive('fullScreen', () ->
    template: '<i class="icon-fullscreen">'
    restrict: 'E'
    scope:
      key: '='
    link: (scope, element, attrs) ->
      element.on 'click', ()->
        requestFullscreen = element[0].requestFullscreen or element[0].webkitRequestFullScreen or element[0].mozRequestFullScreen or element[0].msRequestFullScreen
        targetElement = $("[fs-target=#{scope.key}]")[0]
        requestFullscreen.call targetElement
  )
