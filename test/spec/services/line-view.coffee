'use strict'

describe 'Service: lineView', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  lineView = {}
  beforeEach inject (_lineView_) ->
    lineView = _lineView_

  it 'should do something', () ->
    expect(!!lineView).toBe true
