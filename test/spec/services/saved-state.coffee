'use strict'

describe 'Service: savedState', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  savedState = {}
  beforeEach inject (_savedState_) ->
    savedState = _savedState_

  it 'should do something', () ->
    expect(!!savedState).toBe true
