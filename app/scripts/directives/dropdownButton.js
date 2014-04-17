
'use strict';

angular.module('newBetaApp')
  .directive('dropdownButton', ['$document',function ($document) {
    return {
      restrict: 'A',
      link: function postLink(scope, iElement) {
        var theElement;
        var display;
        var isOpen = false;
        var targeted = false;
        scope.dDRegister = function(element){
          theElement = element;
          hideElement();
          delete scope.dDRegister;
          theElement.on('click', function(e){
            targeted = true;
          });
        };
        iElement.on('click', function(){
          isOpen = !isOpen;
          if (isOpen){
            theElement.css('display', display);
          } else {
            hideElement();
          }
        });
        $document.on('click', function(e){
          if (e.target !== iElement[0] && !_.contains(iElement.children(), e.target)) {
            isOpen = false;
            theElement.css('display', 'none');
          }
        });
        function hideElement(){
          isOpen = false;
          display = theElement.css('display');
          theElement.css('display', 'none');
        }
      }
    };
  }]);
