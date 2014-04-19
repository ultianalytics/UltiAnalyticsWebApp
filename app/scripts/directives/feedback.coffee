'use strict'

angular.module('newBetaApp')
  .directive 'feedback', ['$cookies', ($cookies) ->
    templateUrl: 'includes/partials/feedback.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
      scope.gotMobileWarning = $cookies.iUltimateVisited is 'mobile'
      scope.firstTime =  !$cookies.iUltimateVisited
      scope.submitted = false

      scope.closeFirstTimeModal = ->
        scope.firstTime = false
        $cookies.iUltimateVisited = 'true'

      scope.closeMobileWarning = ->
        scope.gotMobileWarning = true
        $cookies.iUltimateVisited = 'mobile'

]