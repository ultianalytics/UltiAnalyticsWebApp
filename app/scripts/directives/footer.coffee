'use strict'

angular.module('newBetaApp')
  .directive('footer', () ->
    templateUrl: './includes/partials/footer.html'
    restrict: 'EA'
    link: (scope, element, attrs) ->
      alert 'foo'
      $('.main-view').css 'min-height', window.innerHeight - $('.extra').outerHeight() - $('.footer').outerHeight()
      $(window).resize ->
        $('.main-view').css 'min-height', window.innerHeight - $('.extra').outerHeight() - $('.footer').outerHeight()

  )
