'use strict';

angular.module('newBetaApp')
  .directive('statTables', function () {
    return {
      templateUrl: 'includes/partials/statTables.html',
      restrict: 'E',
      controller: 'StattablesCtrl'
    };
  });
