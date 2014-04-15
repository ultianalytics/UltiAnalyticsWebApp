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
        scope.firstTime = true
        $cookies.iUltimateVisited = 'true'
        try
          $('.modal-backdrop').remove()
          $('.modal').remove()

      scope.closeMobileWarning = ->
        scope.gotMobileWarning = true
        $cookies.iUltimateVisited = 'mobile'
        try
          $('.modal-backdrop').remove()
          $('.modal').remove()

]