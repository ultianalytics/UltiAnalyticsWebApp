'use strict';

angular.module('newBetaApp')
  .factory('teamName', ['$q', 'team',function ($q, team) {
    var deferred = $q.defer();
    team.then(function(result){
      deferred.resolve(result.name);
    });
    return deferred.promise;
  }]);
