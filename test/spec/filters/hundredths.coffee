'use strict'

describe 'Filter: hundredths', () ->

  # load the filter's module
  beforeEach module 'newBetaApp'

  # initialize a new instance of the filter before each test
  hundredths = {}
  beforeEach inject ($filter) ->
    hundredths = $filter 'hundredths'

  it 'should return the input prefixed with "hundredths filter:"', () ->
    text = 'angularjs'
    expect(hundredths text).toBe ('hundredths filter: ' + text)
