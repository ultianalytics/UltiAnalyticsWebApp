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

      hoverTimeout = null

      element.parent().on 'mouseenter', (event)->
        hoverTimeout = setTimeout ->
          scope.$apply ->
            scope.showPrompt = not scope.shouldShowToolTip
        , 1000

      element.parent().on 'mouseleave', ->
        clearTimeout hoverTimeout
        scope.$apply ->
          scope.showPrompt = false

      scope.explanation = $sce.trustAsHtml( calculationExplanations[scope.key]?.explanations[0].description or 'Please ask us personally about this one.' )

      scope.showTooltip = ->
        setTimeout ->
          scope.$apply ->
            scope.shouldShowToolTip = true
            scope.showPrompt = false

      scope.hideTooltip = ->
        scope.shouldShowToolTip = false

      $(window).on 'click', (event)->
        unless scope.shouldShowToolTip is false or event.currentTarget is $(element).find('span.explanation-description')[0]
          scope.$apply ->
            scope.hideTooltip()
