'use strict'

describe 'Directive: explanation', () ->

  # load the directive's module
  beforeEach module 'newBetaApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<explanation></explanation>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the explanation directive'
