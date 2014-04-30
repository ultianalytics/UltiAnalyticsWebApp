'use strict';

angular.module('newBetaApp')
  .factory('viewer', function () {
    return {
      isMobile: function () {
        return $(window).outerWidth() <= 768;
      }
    };
  });
