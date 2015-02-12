// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('newBetaApp').controller('GamesCtrl', [
    '$scope', '$q', '$location', 'allGames', 'playerStats', 'gameStats', 'filter', 'relocate', function($scope, $q, $location, allGames, playerStats, gameStats, filter, relocate) {
      var openPoints, scope;
      scope = $scope;
      scope.relocate = relocate;
      scope.loading = true;
      $q.all([allGames, playerStats, gameStats, filter]).then(function(responses) {
        var id;
        allGames = responses[0];
        gameStats = responses[2];
        filter = responses[3];
        $location.replace();
        try {
          id = _.keys($location.search())[0];
          if (allGames[id]) {
            scope.select(allGames[id]);
          } else {
            scope.select(_.max(allGames, function(game) {
              return game.msSinceEpoch;
            }));
          }
        } catch (_error) {
          scope.select(_.max(allGames, function(game) {
            return game.msSinceEpoch;
          }));
        }
        scope.loading = false;
        return scope.sortedGames = _.toArray(allGames);
      });
      scope.isSelectedGame = function(game) {
        return game === scope.selectedGame;
      };
      scope.select = function(game) {
        scope.gameLoading = true;
        filter.onlyInclude([game]);
        $location.search(game.gameId);
        scope.selectedGame = game;
        scope.gameStats = gameStats.getFor(game);
        return scope.gameLoading = false;
      };
      openPoints = {};
      scope.togglePoints = function(points, only) {
        if (only) {
          openPoints = {};
        }
        return _(points).pluck('$$hashKey').each(function(id) {
          return openPoints[id] = !openPoints[id];
        });
      };
      return scope.isOpen = function(point) {
        return openPoints[point['$$hashKey']];
      };
    }
  ]);

}).call(this);
