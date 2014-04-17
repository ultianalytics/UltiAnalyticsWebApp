'use strict';

angular.module('newBetaApp')
  .directive('titleBar', ['$routeParams','teamName', function ($routeParams, teamName) {
    return {
      templateUrl: 'includes/partials/title-bar.html',
      restrict: 'EA',
      link: function postLink(scope) {
        if ( !_($routeParams).isEmpty() ){
          teamName.then(function(name){
            scope.teamName = name;
            window.document.title = name || 'iUltimate';
          });
        }
      }
    };
  }]);
