'use strict';

angular.module('newBetaApp')
  .service('Authorization', ['$q', '$location', 'api',function($q, $location, api) {
    return {
      ping: function(teamId){
        var deferred = $q.defer();
        api.retrieveTeam(teamId, false,
          function() {
            deferred.resolve();
          },
          function(error) {
            $location.replace()
            if (error.status === 401){
              $location.url(teamId + '/login');
            } else {
              $location.url('/404');
            }
            deferred.reject(error);
          }
        );
        return deferred.promise;
      }
    };
  }]);