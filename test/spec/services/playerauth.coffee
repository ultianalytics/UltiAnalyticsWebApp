'use strict'

describe 'Service: Playerauth', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  Playerauth = {}
  beforeEach inject (_Playerauth_) ->
    Playerauth = _Playerauth_

  it 'should do something', () ->
    expect(!!Playerauth).toBe true
