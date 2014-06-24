'use strict';

angular.module('newBetaApp')
  .directive('titleBar', ['$routeParams','teamName', function ($routeParams, teamName) {
    return {
      templateUrl: 'includes/partials/title-bar.html',
      restrict: 'EA',
      link: function postLink(scope, element) {
        var positionLogo = _.debounce(function(){
          var $uaLogo = $(element).find('.ua-logo');
          var $teamName = $(element).find('.navbar-brand');
          if ($($teamName.offsetParent()).width() - $teamName.offset().left - $teamName.outerWidth() - 22 < $uaLogo.outerWidth() ) { // I'm sorry father for I ahve sinned.
            $uaLogo.addClass('small-screen')
          } else {
            $uaLogo.removeClass('small-screen')
          }
        }, 75);
        if ( !_($routeParams).isEmpty() ){
          teamName.then(function(name){
            scope.teamName = name;
            window.document.title = name || 'ultiAnalytics';
            $(window).on('resize',function(){
              positionLogo();
            });
            positionLogo()
          });
        }
      }
    };
  }]);
