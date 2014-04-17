'use strict';

angular.module('newBetaApp')
  .factory('next', function() {
    var next = '';
    return {
      get: function() {
        var temp = next;
        next = '';
        return temp;
      },
      set: function(val) {
        next = val;
      }
    };
  });