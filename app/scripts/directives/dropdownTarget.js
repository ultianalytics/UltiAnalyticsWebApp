'use strict';

angular.module('newBetaApp')
  .directive('dropdownTarget', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.dDRegister(element);
      }
    };
  });
