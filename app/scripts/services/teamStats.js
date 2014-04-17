/* global _*/

'use strict';

angular.module('newBetaApp')
  .factory('teamStats', ['$q', '$routeParams', '$rootScope', 'filter', 'api', 'allGames',function($q, $routeParams, $rootScope, filter, api, allGames) {
    var deferred = $q.defer();
    var statsMap = {};
    var collection = 0;
    var goal;
    allGames.then(function(games) {
      goal = _.keys(games).length;
      _.each(games, function(game, id) {
        api.retrieveTeamStatsForGames($routeParams.teamId, [id],
          function success(result) {
            statsMap[id] = result;
            if (++collection === goal) {
              deferred.resolve(tsApi);
            }
          },
          function failure(e) {
            deferred.reject(e);
          }
        );
      });
    });
    var tsApi = {
      getFromIncluded: function() {
        var that = this;
        var result = {};
        var temp = $rootScope.$new();
        temp.included = filter.included;
        temp.$watchCollection('included', function() {
          _.extend(result,that.getFrom(filter.included));
        });
        return result;
      },
      getFrom: function(games) {
        var result = {};

        // Record
        var record = {
          wins: 0,
          losses: 0
        };
        _(games).each(function(game) {
          var gs = statsMap[game.gameId].goalSummary;
          gs.ourOlineGoals + gs.ourDlineGoals > gs.theirOlineGoals + gs.theirDlineGoals ? record.wins++ : record.losses++;
        });
        result.record = record;

        // Point Spread
        var ps = {
          ours: 0,
          theirs: 0
        };
        _(games).each(function(game) {
          var gs = statsMap[game.gameId].goalSummary;
          ps.ours += gs.ourDlineGoals + gs.ourOlineGoals;
          ps.theirs += gs.theirDlineGoals + gs.theirOlineGoals;
        });
        result.pointSpread = ps;

        // Offensive Conversion
        var offensiveOpps = 0;
        var offensiveConversions = 0;
        _(games).each(function(game) {
          _(game.points).each(function(point) {
            if (point.summary.lineType === 'O') {
              offensiveOpps++;
              if (point.events[point.events.length - 1].type === 'Offense') {
                offensiveConversions++;
              }
            }
          });
        });
        result.offensiveProductivity = offensiveOpps ? Math.round(offensiveConversions / offensiveOpps * 100) : 0;

        // Conversion Rate

        var scoringOpps = 0;
        _(games).each(function(game) {
          _(game.points).each(function(point) {
            if (point.summary.lineType === 'O') {
              scoringOpps++;
            }
            _(point.events).each(function(event) {
              if ((event.action === 'D' && event.type === 'Defense') || (event.action === 'Throwaway' && event.type === 'Defense')) {
                scoringOpps++;
              }
            });
          });
        });
        result.conversionRate = scoringOpps ? Math.round(result.pointSpread.ours / scoringOpps * 100) : 0;

        // Throws per possession
        var scored = [];
        var failed = [];
        var passes = 0;
        _(games).each(function(game) {
          _(game.points).each(function(point) {
            passes = 0;
            _(point.events).each(function(event) {
              if (event.type === 'Offense') {
                if (event.action === 'Catch') {
                  passes++;
                } else if (event.action === 'Goal') {
                  scored.push(++passes);
                  passes = 0;
                } else if (event.action === 'Throwaway' || event.action === 'Drop' || event.action === 'Turnover' || event.action === 'Stall') {
                  failed.push(++passes);
                  passes = 0;
                }
              } else {
                if (passes > 0) {
                  scored.push(passes);
                  passes = 0;
                }
              }
            });
          });
        });
        var tpp = {};
        var groupingFunc = function(num) {
          if (num === 1) {
            return '1';
          }
          if (num < 4) {
            return '4';
          }
          if (num < 8) {
            return '8';
          }
          if (num < 12) {
            return '12';
          }
          return '12+';
        };
        tpp.scored = _.countBy(scored, groupingFunc);
        tpp.failed = _.countBy(failed,groupingFunc);
        result.throwsPerPossession = tpp;

        // points scored by line
        var ps = {
          us: {
            offense: 0,
            defense: 0
          },
          them: {
            offense: 0,
            defense: 0
          }
        };

        _(games).each(function(game) {
          _(game.points).each(function(point) {
            if (point.events[point.events.length - 1].type === 'Offense') {
              point.summary.lineType === 'D' ? ps.us.defense++ : ps.us.offense++;
            } else {
              point.summary.lineType === 'D' ? ps.them.offense++ : ps.them.defense++;
            }
          });
        });

        result.pointSummary = ps;

        // goal flow

        var goalCount = result.pointSpread.ours;
        var assistMap = {nodes: {}, links: {}};
        _.each(games, function(game) {
          _.each(game.points, function(point) {
            var endEvent = point.events[point.events.length - 1];
            var penultimateEvent = point.events[point.events.length - 2];
            if (endEvent.type === 'Offense') { // if the goal was scored by the offense.
              var passer = endEvent.passer + 'P';
              var receiver = endEvent.receiver + 'R';
              if (penultimateEvent && penultimateEvent.type === 'Offense') {
                var penUPasser = penultimateEvent.passer + 'H';
                assistMap.nodes[penUPasser] = true;
                addLink(penUPasser, passer, assistMap);
              }
              assistMap.nodes[passer] = true;
              assistMap.nodes[receiver] = true;
              addLink(passer, receiver, assistMap);
            }
          });
        });
        var nodes = [];
        var i = 0;
        var map = {};
        _.each(assistMap.nodes, function(value, key) {
          map[key] = i;
          nodes[i] = {
            name: key
          };
          i++;
        });
        assistMap.nodes = nodes;
        var links = [];
        _.each(assistMap.links, function(receivers, thrower) {
          _.each(receivers, function(quantity, receiver) {
            links.push({
              source: map[thrower],
              target: map[receiver],
              value: quantity
            });
          });
        });
        assistMap.links = links;
        function addLink(passer, receiver, map) {
          if (map.links[passer]) {
            if (map.links[passer][receiver]) {
              map.links[passer][receiver] += 1;
            } else {
              map.links[passer][receiver] = 1;
            }
          } else {
            map.links[passer] = {};
            map.links[passer][receiver] = 1;
          }
        };

        result.assistMap = assistMap;
        return result;
      }
    };
    return deferred.promise;
  }]);