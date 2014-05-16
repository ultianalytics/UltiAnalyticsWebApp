'use strict'

angular.module('newBetaApp')
  .directive 'explanation', (calculationExplanations) ->
    templateUrl: 'includes/partials/explanation.html'
    restrict: 'E'
    replace: true
    scope:
      key: '='
      trigger: '='
    link: (scope, element, attrs) ->
      timer = null
      scope.$watch 'trigger', (value) ->
        if value
          timer = setTimeout ->
            scope.$apply ->
              scope.showPrompt = not scope.shouldShowToolTip
              scope.shouldShow = true
          , 1000
        else
          clearTimeout timer
          scope.showPrompt = false
          scope.shouldShow = scope.shouldShowToolTip
      scope.explanation = calculationExplanations[scope.key]
      scope.showTooltip = ->
        scope.shouldShowToolTip = true
        scope.shouldShow = true
        scope.showPrompt = false
      scope.hideTooltip = ->
        scope.shouldShowToolTip = false