'use strict'

describe 'Service: calculationExplanations', () ->

  # load the service's module
  beforeEach module 'newBetaApp'

  # instantiate service
  calculationExplanations = {}
  beforeEach inject (_calculationExplanations_) ->
    calculationExplanations = _calculationExplanations_

  it 'should do something', () ->
    expect(!!calculationExplanations).toBe true
