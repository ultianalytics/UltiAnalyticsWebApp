'use strict'

describe 'Controller: ShareCtrl', () ->

  # load the controller's module
  beforeEach module 'newBetaApp'

  ShareCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ShareCtrl = $controller 'ShareCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
