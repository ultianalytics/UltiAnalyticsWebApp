'use strict'

describe 'Filter: statSort', () ->

  # load the filter's module
  beforeEach module 'newBetaApp'

  # initialize a new instance of the filter before each test
  statSort = {}
  beforeEach inject ($filter) ->
    statSort = $filter 'statSort'

  it 'should return the input prefixed with "statSort filter:"', () ->
    text = 'angularjs'
    expect(statSort text).toBe ('statSort filter: ' + text)
