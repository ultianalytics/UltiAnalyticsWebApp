'use strict'

describe 'Service: utils', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  utils = {}
  beforeEach inject (_utils_) ->
    utils = _utils_

  it 'should do something', () ->
    expect(!!utils).toBe true
