// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  describe('Filter: linePlayers', function() {
    var linePlayers;
    beforeEach(module('newBetaApp'));
    linePlayers = {};
    beforeEach(inject(function($filter) {
      return linePlayers = $filter('linePlayers');
    }));
    return it('should return the input prefixed with "linePlayers filter:"', function() {
      var text;
      text = 'angularjs';
      return expect(linePlayers(text)).toBe('linePlayers filter: ' + text);
    });
  });

}).call(this);
