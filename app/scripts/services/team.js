'use strict';

angular.module('newBetaApp')
  .factory('team', ['$q', '$routeParams', 'api',
    function($q, params, api) {
      var deferred = $q.defer();
      api.retrieveTeam(params.teamId, true,
        function success(result) {
          deferred.resolve(result);
        },
        function failure(e) {
          deferred.reject(e);
        }
      );
      return deferred.promise;
    }
  ]);