'use strict'

describe 'Filter: linePlayers', () ->

  # load the filter's module
  beforeEach module 'newBetaApp'

  # initialize a new instance of the filter before each test
  linePlayers = {}
  beforeEach inject ($filter) ->
    linePlayers = $filter 'linePlayers'

  it 'should return the input prefixed with "linePlayers filter:"', () ->
    text = 'angularjs'
    expect(linePlayers text).toBe ('linePlayers filter: ' + text)
