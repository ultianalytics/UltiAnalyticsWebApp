'use strict';

angular.module('newBetaApp')
  .factory('viewer', function () {
    return {
      isMobile: function () {
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    };
  });
