'use strict'

angular.module('newBetaApp')
  .directive 'explanation', (calculationExplanations, $sce) ->
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

      scope.explanation = $sce.trustAsHtml( calculationExplanations[scope.key]?.explanations[0].description or 'Please ask us personally about this one.' )

      scope.showTooltip = ->
        setTimeout ->
          scope.$apply ->
            scope.shouldShowToolTip = true
            scope.shouldShow = true
            scope.showPrompt = false

      scope.hideTooltip = ->
        scope.shouldShowToolTip = false

      $(window).on 'click', (event)->
        unless scope.shouldShowToolTip is false or event.currentTarget is $(element).find('span.explanation-description')[0]
          scope.$apply ->
            scope.hideTooltip()
