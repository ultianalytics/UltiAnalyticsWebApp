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

    function getGoalSummary(game){
      return statsMap[game.gameId].goalSummary;
    }
    function throwGroupingFunc(num) {
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
    }

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
    }

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
        var results = {};
        var considerablePoints = _.reduce(games, function(points, game){
          return points.concat(game.points);
        }, []);

        results.record = this.getRecord(games);
        results.pointSpread = this.getPointSpread(games);
        results.offensiveProductivity = this.getOffensiveProductivity(considerablePoints);
        results.conversionRate = this.getConversionRate(considerablePoints, results.pointSpread.ours);
        results.throwsPerPossession = this.getThrowsPerPossession(considerablePoints);
        results.pointSummary = this.getPointSummary(considerablePoints);
        results.assistMap = this.getAssistMap(considerablePoints);

        return results;
      },
      getOffensiveProductivity: function(points){
        var offensiveOpps = 0;
        var offensiveConversions = 0;
        _(points).each(function(point) {
          if (point.summary.lineType === 'O') {
            offensiveOpps++;
            if (point.events[point.events.length - 1].type === 'Offense') {
              offensiveConversions++;
            }
          }
        });
        return offensiveOpps ? Math.round(offensiveConversions / offensiveOpps * 100) : 0;
      },
      getConversionRate: function(points, ourPointSpread){
        var scoringOpps = 0;
        _(points).each(function(point) {
          if (point.summary.lineType === 'O') {
            scoringOpps++;
          }
          _(point.events).each(function(event) {
            if ((event.action === 'D' && event.type === 'Defense') || (event.action === 'Throwaway' && event.type === 'Defense')) {
              scoringOpps++;
            }
          });
        });
        return scoringOpps ? Math.round(ourPointSpread / scoringOpps * 100) : 0;
      },
      getPointSummary: function(points){
        var pointSummary = {
          us: {
            offense: 0,
            defense: 0
          },
          them: {
            offense: 0,
            defense: 0
          }
        };
        _(points).each(function(point) {
          if (point.events[point.events.length - 1].type === 'Offense') {
            point.summary.lineType === 'D' ? pointSummary.us.defense++ : pointSummary.us.offense++;
          } else {
            point.summary.lineType === 'D' ? pointSummary.them.offense++ : pointSummary.them.defense++;
          }
        });
        return pointSummary;
      },
      getPointSpread: function(games){
        var pointSpread = {
          ours: 0,
          theirs: 0
        };
        _(games).each(function(game) {
          var goalSummary = getGoalSummary(game);
          pointSpread.ours += goalSummary.ourDlineGoals + goalSummary.ourOlineGoals;
          pointSpread.theirs += goalSummary.theirDlineGoals + goalSummary.theirOlineGoals;
        });
        return pointSpread;
      },
      getRecord: function(games){
        var record = {
          wins: 0,
          losses: 0
        };
        _(games).each(function(game) {
          var goalSummary = getGoalSummary(game);
          goalSummary.ourOlineGoals + goalSummary.ourDlineGoals > goalSummary.theirOlineGoals + goalSummary.theirDlineGoals ? record.wins++ : record.losses++;
        });
        return record;
      },
      getThrowsPerPossession: function(points){
        var scored = [];
        var failed = [];
        var passes = 0;
        _(points).each(function(point) {
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
        var throwsPerPossession = {};
        throwsPerPossession.scored = _.countBy(scored, throwGroupingFunc);
        throwsPerPossession.failed = _.countBy(failed, throwGroupingFunc);
        return throwsPerPossession;
      },
      getAssistMap: function(points){
        var assistMap = {nodes: {}, links: {}};
        _(points).each(function(point) {
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
        return assistMap;
      }
    };
    return deferred.promise;
  }]);




