'use strict';

angular.module('newBetaApp')
  .controller('LoginCtrl', ['$scope', '$routeParams', '$location', 'api', 'next', function($scope, $routeParams, $location, api, next) {
    $scope.attempt = function(password) {
      if (password){
        $scope.inAttempt = true;
        api.signon($routeParams.teamId, password,
          function() {
            var goTo = next.get();
            goTo ? $location.path(goTo) : $location.path($routeParams.teamId + '/players');
            $scope.$apply();
          }, function() {
            $scope.inAttempt = false;
            $scope.failedAttempt = true;
            $scope.$digest();
          });
      }
    };
  }]);