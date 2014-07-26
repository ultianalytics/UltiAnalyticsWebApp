'use strict'

describe 'Controller: StateCtrl', () ->

  # load the controller's module
  beforeEach module 'newBetaApp'

  StateCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    StateCtrl = $controller 'StateCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
