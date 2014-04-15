'use strict'

angular.module('newBetaApp')
  .directive 'droppable', ['$parse',($parse) ->
    restrict: 'A'
    scope: true
    link: (scope, element, attrs)->
      onEnter = $parse(attrs.onEnter)(scope) 
      onLeave = $parse(attrs.onLeave)(scope)
      onDrop = $parse(attrs.onDrop)(scope)
      element.on 'dragenter', (event)->
        onEnter?(scope.dragging)
      element.on 'dragleave', (event)->
        onLeave?(scope.dragging)
      element.on 'drop', (event)->
        onDrop?(scope.dragging)
        scope.$digest()
      element.on 'dragover', (event)->
        onOver?(scope.dragging)
        event.preventDefault()
]