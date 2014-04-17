'use strict'

describe 'Directive: footer', () ->

  # load the directive's module
  beforeEach module 'newBetaApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<footer></footer>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the footer directive'
