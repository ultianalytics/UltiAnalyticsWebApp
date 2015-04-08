/* global _ */

'use strict';

angular.module('newBetaApp')
  .controller('StattablesCtrl', ['$scope', '$location','$routeParams', 'playerStats', 'filter', 'relocate', function($scope, $location,$routeParams, playerStats, filter, relocate) {
    $scope.relocate = relocate;
    $scope.statsArray = []
    $scope.changeFocus = function(type) {
      $scope.focus = type;
    };
    playerStats.then(function(statsApi) {
      playerStats = statsApi;
      init();
    });
    $scope.categories = [
      {
        name: 'Summary',
        statTypes: ['plusMinus', 'oEfficiency', 'dEfficiency', 'passingPercentage', 'pointsPlayed']
      }, {
        name: 'Passing',
        statTypes: ['assists', 'completions', 'throwaways','stalls', 'passingPercentage']
      }, {
        name: 'Receiving',
        statTypes: ['goals','catches','touches','drops','catchingPercentage']
      }, {
        name: 'Playing Time',
        statTypes: ['gamesPlayed','pointsPlayed','minutesPlayed', 'oPoints', 'dPoints']
      }, {
        name: 'Defense',
        statTypes: ['ds','pulls','callahans','averagePullHangtime','oBPulls',]
      }, {
        name: 'Per Point',
        statTypes: ['ppGoals' ,'ppAssists', 'ppDs' , 'ppThrowaways' , 'ppDrops']
      }
    ];
    $scope.focus = $scope.categories[0];
    $scope.games = filter.included; // updated by the filter controller.
    $scope.sorter = 'name';
    $scope.inclineSort = false;
    function init(){
      $scope.stats = playerStats.getAll();
      if (_.isEmpty($scope.stats)) return;
      $scope.players = _.keys($scope.stats);
      $scope.statTypes = _.keys($scope.stats[$scope.players[0]].stats);
      startWatching();
    }
    function startWatching(){
      $scope.$watchCollection('games', function(nv, ov) {
        playerStats.setGames(filter.included);
        $scope.stats = playerStats.getAll();
        $scope.statsArray = _.toArray($scope.stats);
        $scope.players = _.keys($scope.stats);
        $scope.statTypes = _.keys($scope.stats[$scope.players[0]].stats);
        $scope.totals = playerStats.getTotals();
        $scope.averages = playerStats.getAverages();
      });
    }
    $scope.sort = function(property){
      $scope.inclineSort = $scope.sorter === property && !$scope.inclineSort
      $scope.sorter = property
    };
  }]);
