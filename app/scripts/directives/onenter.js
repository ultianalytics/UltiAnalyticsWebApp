'use strict';

angular.module('newBetaApp')
  .directive('onEnter', ['$parse', '$document', function ($parse, $document) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var toDo = $parse(attrs.onEnter);
        $document.on('keyup', function(e){
          if (e.keyCode === 13){
            toDo(scope);
          }
        });
      }
    };
  }]);
