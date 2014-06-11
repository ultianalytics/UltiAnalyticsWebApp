'use strict';

angular.module('newBetaApp')
  .factory('team', ['$q', '$routeParams', '$rootScope','api',
    function($q, params,$rootScope, api) {
      var players = {};
      function getName(nickname, type){
        if (!players[nickname])
          return nickname;
        if ((type === 'full' || !type ) && (players[nickname].firstName && players[nickname].lastName))
          return players[nickname].firstName + ' ' + players[nickname].lastName;
        if (type === 'shortened' && players[nickname].firstName && players[nickname].lastName)
          return players[nickname].firstName.slice(0,1).toUpperCase() + '. ' + players[nickname].lastName;
        return players[nickname][type] || nickname;
      }
      $rootScope.getName = getName;
      var deferred = $q.defer();
      api.retrieveTeam(params.teamId, true,
        function success(result) {
          players = _.indexBy(result.players, 'name')
          $rootScope.$digest();
          deferred.resolve(result);
        },
        function failure(e) {
          deferred.reject(e);
        }
      );
      return deferred.promise;
    }
  ]);