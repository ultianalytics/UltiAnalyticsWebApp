'use strict';

angular.module('newBetaApp')
  .factory('viewer', function ($rootScope) {
    $(window).resize(function(){
      $rootScope.$digest()
    });
    return {
      isMobile: function () {
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      },
      isMobileSized: function () {
        return $(window).outerWidth() <= 768;
      }
    };
  });
