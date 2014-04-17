'use strict';

angular.module('newBetaApp')
  .directive('checkbox', ['$parse',function ($parse) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.watch, function(newVal){
          newVal ? element[0].checked = true: element[0].checked = false;
        });
      }
    };
  }]);
