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

      element.parent().on 'mouseenter', (event)->
          scope.$apply ->
            scope.showPrompt = not scope.shouldShowToolTip

      element.parent().on 'mouseleave', ->
        scope.$apply ->
          scope.showPrompt = false

      description = calculationExplanations[scope.key]?.explanations[0].description
      scope.hasDescription = !!description
      scope.explanation = $sce.trustAsHtml( description or 'Ask us personally about this one if you\'d like.' )

      scope.showTooltip = ->
        setTimeout -> # avoids the click event.
          scope.$apply ->
            elementRightOffset = $(element).offset().left + 200
            documentWidth = $(document).width()
            $explanationTooltip = $(element).find('.explanation-tooltip')
            if documentWidth < elementRightOffset then $explanationTooltip.css 'left', -1 * ( elementRightOffset - documentWidth )
            scope.shouldShowToolTip = true
            scope.showPrompt = false

      scope.hideTooltip = ->
        scope.shouldShowToolTip = false

      $(window).on 'click', (event)->
        unless scope.shouldShowToolTip is false or event.currentTarget is $(element).find('span.explanation-description')[0]
          scope.$apply ->
            scope.hideTooltip()
