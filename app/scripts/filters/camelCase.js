'use strict';

angular.module('newBetaApp')
  .filter('camelCase', function () {
    return function (name) {
      switch (name){
      case '':
        return '';
      default:
        var words = name.split(/(?=[A-Z])/g);
        words[0] = words[0][0].toUpperCase() + words[0].slice(1);
        return words.join(' ');
      }
    };
  });
