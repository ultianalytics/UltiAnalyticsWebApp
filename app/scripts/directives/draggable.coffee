'use strict'

angular.module('newBetaApp')
  .directive 'draggable', ['$parse', ($parse) ->
    restrict: 'A'
    link: (scope, element, attrs) ->
      item = $parse(attrs.item)(scope)
      onDrag = $parse(attrs.onDrag)(scope)
      element.on 'dragstart', ->
        onDrag item
]