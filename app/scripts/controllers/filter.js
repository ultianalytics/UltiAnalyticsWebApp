/* global _ */

'use strict';

angular.module('newBetaApp')
  .controller('FilterCtrl', ['$scope', 'filter', 'allGames', function($scope, filter, allGames) {
    $scope.dDOpen = false;
    $scope.filter = filter;
    $scope.buttonMessage = 'All Games';
    allGames.then(function(games) {
      $scope.allGames = games;
      $scope.numberOfGames = Object.keys(games).length;
      $scope.mostRecentGame = _.max(games, function(item) {
        return item.msSinceEpoch;
      });
      $scope.tournaments = _.groupBy(games, 'tournamentName');
      $scope.mostRecentTournamentName = $scope.mostRecentGame.tournamentName;
      $scope.mostRecentTournament = $scope.mostRecentTournamentName ? $scope.tournaments[$scope.mostRecentGame.tournamentName] : null;
      if ($scope.tournaments && $scope.tournaments['undefined']) {
        $scope.tournaments['-'] = $scope.tournaments['undefined'];
        delete $scope.tournaments['undefined'];
      }
    });

    function orderLayout() {
      $scope.orderedTournaments = _.map($scope.tournaments,function(games) {
        return _.toArray(games).sort(function(a, b) {
          return b.msSinceEpoch - a.msSinceEpoch;
        });
      }).sort(function(a, b) {
        return b[0].msSinceEpoch - a[0].msSinceEpoch;
      });
    }
    $scope.collect = function() {
      orderLayout();
      $scope.dDOpen = true;
    };
    $scope.close = function() {$scope.dDOpen = false;};
    $scope.isIncluded = filter.contains;
    $scope.allIncluded = function(games){
      return _.reduce(games, function(memo, game){
        return memo && $scope.isIncluded(game);
      }, true);
    };
    $scope.toggleAll = function(games, choice){
      _.each(games, function(game){
        $scope.toggleSelect(game, choice);
      });
    };
    $scope.toggleSelect = function(game, choice){
      (!filter.contains(game) || choice) ? filter.include(game) : filter.exclude(game);
    };
    var $dedicatedScope = $scope.$new();
    $dedicatedScope.included = filter.included;
    $dedicatedScope.$watchCollection('included', function(currentGames){

      // this is the logic for the filter button's message. It's a nest, I know, but it's O(n).
      // if tournaments have been established, run the following logic:
        // Say all games (n games) if all are selected.
        // else Say a tournament name (+n games other than that tournament)
        // else Say the most recent game selected, and (+n games other than selected)
      // if there are any games selected and no tournaments, it means this is the first load, ergo append the number of games to the message so it's All Games (n games), instead of just all games.
      // Otherwise they don't have any stats recorded, so tell them. 
      //TODO: unit test this piece of shit...


      if ($scope.tournaments){
        var possibilities = {
          total: true,
          tournaments: _.clone($scope.tournaments),
          games: _.clone($scope.allGames, 'gameId')
        };
        delete possibilities.tournaments['-'];
        var current = _(currentGames).indexBy('gameId').valueOf();
        _.each($scope.allGames, function(game){
          if (!_(current).has(game.gameId)){
            delete possibilities.total;
            delete possibilities.tournaments[game.tournamentName];
            delete possibilities.games[game.gameId];
          }
        });
        if (possibilities.total){
          $scope.buttonMessage = 'All Games ' + '(' + currentGames.length + ' games)';
        } else if (_.keys(possibilities.tournaments).length){
          var tourney = _(possibilities.tournaments).sample();
          var extraGames = currentGames.length - tourney.length ? ' (+' + (currentGames.length - tourney.length) + ' games)' : '';
          $scope.buttonMessage = tourney[0].tournamentName + extraGames;
        } else if (currentGames.length){
          var extraGames = currentGames.length > 1 ? ' (+' + (currentGames.length - 1) + ' games)' : '';
          $scope.buttonMessage = _.min(currentGames, 'msSinceEpoch').opponentName + extraGames;
        } else {
          $scope.buttonMessage = 'Zero Games Selected!';
        }
      } else if (currentGames.length) {
        $scope.buttonMessage += ' (' + currentGames.length + ' games)';
      } else {
        $scope.buttonMessage = 'You don\'t have any stats!';
      }
    });
  }]);