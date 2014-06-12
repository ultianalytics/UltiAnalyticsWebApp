'use strict'

describe 'Service: nameLookups', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  nameLookups = {}
  beforeEach inject (_nameLookups_) ->
    nameLookups = _nameLookups_

  it 'should do something', () ->
    expect(!!nameLookups).toBe true
