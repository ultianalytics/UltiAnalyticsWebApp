/* global _ */

'use strict';

angular.module('newBetaApp')
  .controller('PlayersCtrl', ['$scope', '$q', 'playerStats', 'allGames', 'filter', 'relocate', function ($scope, $q, playerStats, allGames, filter, relocate) {
    $scope.relocate = relocate;
    $scope.loading = true;
    $scope.sortBy = 'name';
    $q.all([playerStats, allGames]).then(function(responses){
      filter.includeAll();
      playerStats = responses[0];
      allGames = responses[1];
      playerStats.setGames(allGames);
      $scope.playerStats = playerStats.getAll();
      $scope.statTypes = playerStats.statTypes;
      $scope.numberOfGames = Object.keys(allGames).length;
      $scope.included = filter.included;
      $scope.$watchCollection('included', function(){
        playerStats.setGames(filter.included);
        $scope.playerStats = playerStats.getAll();
        render(); // fucking digest loop.
      });
      $scope.loading = false;
      render();
    });
    $scope.console = console;
    $scope.leaderMap = {
      goals: {
        category: 'Offense',
        stats: ['goals', 'assists','touches']
      },
      ds : {
        category: 'Defense',
        stats: ['ds','dPoints', 'pulls']
      },
      plusMinus: {
        category: 'Plus / Minus',
        stats: ['plusMinus', 'oPlusMinus','dPlusMinus']
      },
      pointsPlayed: {
        category: 'Playing Time',
        stats: ['oPoints','dPoints','minutesPlayed']
      }
    };
    function render() {
      $scope.leaders = playerStats.getLeaders(['goals','ds','pointsPlayed', 'plusMinus']);
    }
  }]);
