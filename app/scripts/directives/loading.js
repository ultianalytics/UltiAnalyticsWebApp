/* global _ */

'use strict';

angular.module('newBetaApp')
  .directive('loading', function () {
    return {
      restrict: 'A',
      scope: {
        loading: '=',
        loadingType: '='
      },
      link: function preLink(scope, element){
        var message = '';
        if (!scope.loadingType || scope.loadingType.indexOf('icon') === -1){
          var i = -1;
          var myInt = setInterval(function(){
            if (++i === 4) {
              clearInterval(myInt);
            }
            element.children()[0].children[0].innerHTML = messages[i];
          },3000);
          var messages = [
            'Calculating Team Statistics...',
            'Determining content network...',
            'Uploading personal information...',
            'Lying about what this loading gif represents...'
          ];
          message = messages[0];
        }
        element.prepend('<span class="9827345987"><b id="87654">'+message+'</b><br><img width="30" src="images/ajax-loader.gif"></span>');
                scope.$watch('loading', function(newVal){
          _.each(element.children(), function(node){
            node.hidden = (node.classList.contains('9827345987') && !newVal) || (!node.classList.contains('9827345987') && newVal);
          });
        });
      }
    };
  });
