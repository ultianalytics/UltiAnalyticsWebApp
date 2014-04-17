'use strict';

angular.module('newBetaApp')
  .directive('navBar', ['viewer', '$routeParams', '$location', '$rootScope', function (viewer, $routeParams, $location, $rootScope) {
    return {
      templateUrl: 'includes/partials/nav-bar.html',
      restrict: 'EA',
      scope: {
        page: '=',
      },
      link: function postLink(scope) {
        scope.playerName = decodeURI($routeParams.playerNameUri);
        $rootScope.isMobile = viewer.isMobile();
        scope.isMobile = viewer.isMobile();
        scope.isActive = function(option){
          return option === scope.page ? 'active' : '';
        };
        scope.navTo = function(page){
          var path = '/' + $routeParams.teamId + '/' + page;
          if (page !== scope.page){ $location.path(path); }
        };
        scope.toggleNav = function(){
          scope.navOpen = !scope.navOpen;
        };
      }
    };
  }]);
