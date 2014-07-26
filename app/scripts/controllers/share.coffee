'use strict'

angular.module('newBetaApp')
  .controller 'ShareCtrl', ($scope, $routeParams, api) ->
    api.retrieveState $routeParams.teamId, $routeParams.stateId, $routeParams.stateType, (reponse)->
      debugger