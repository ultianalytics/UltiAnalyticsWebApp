'use strict'

angular.module('newBetaApp')
  .directive 'feedback', [ () ->
    templateUrl: 'includes/partials/feedback.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
      scope.gotMobileWarning = _(document.cookie).contains 'mobile'
      scope.firstTime = not _(document.cookie).contains('visited')
      scope.submitted = false

      scope.closeFirstTimeModal = ->
        scope.firstTime = false
        document.cookie = 'visited=true;max-age=100000000000'

      scope.closeMobileWarning = ->
        scope.gotMobileWarning = true
        document.cookie = 'mobile-visited=true;max-age=100000000000'

]