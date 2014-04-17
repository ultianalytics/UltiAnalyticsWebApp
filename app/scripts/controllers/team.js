'use strict';

angular.module('newBetaApp')
  .controller('TeamCtrl', ['$scope', 'teamStats', '$location','filter',function($scope, teamStats, $location, filter) {
    $scope.loading = true;
    teamStats.then(function(api) {
      filter.includeAll()
      $scope.teamStats = api.getFromIncluded();
      $scope.loading = false;
    });
  }]);