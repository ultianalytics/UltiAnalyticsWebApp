/* global _ */

'use strict';

angular.module('newBetaApp')
  .factory('filter', ['allGames',function (allGames) {
    var includedGames = [];
    function exclude(game){
      var index = _.indexOf(includedGames, game);
      index > -1 && includedGames.splice(index, 1);
    }
    function include(game){
      if (!_.contains(includedGames, game))
        includedGames.push(game);
    }
    function onlyInclude(games){
      includedGames.splice(0, includedGames.length);
      _.each(games, include);
    }
    allGames.then(function(response){
      allGames = response;
      onlyInclude(response);
    });
    return {
      includeAll: function(){onlyInclude(allGames)},
      included: includedGames,
      include: function(games){
        (_.isArray(games) || !games.gameId) ? _.each(games, include) : include(games);
      },
      onlyInclude: onlyInclude,
      exclude: function(games){
        if (_.isArray(games) || !games.gameId) {_.each(games, exclude);}
        else {exclude(games);}
      },
      contains: function(game){
        return _(includedGames).contains(game);
      }
    };
  }]);
