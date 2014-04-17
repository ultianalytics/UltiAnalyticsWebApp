/* global _ */

'use strict';

angular.module('newBetaApp')
  .directive('statFilter', function () {
    return {
      templateUrl: 'includes/partials/filter.html',
      restrict: 'EA',
      controller: 'FilterCtrl'
    };
  });
