// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').directive('footer', function() {
    return {
      templateUrl: './includes/partials/footer.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        $('.main-view').css('min-height', window.innerHeight - $('.extra').outerHeight() - $('.footer').outerHeight());
        return $(window).resize(function() {
          return $('.main-view').css('min-height', window.innerHeight - $('.extra').outerHeight() - $('.footer').outerHeight());
        });
      }
    };
  });

}).call(this);
