// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  describe('Directive: explanation', function() {
    var scope;
    beforeEach(module('newBetaApp'));
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      return scope = $rootScope.$new();
    }));
    return it('should make hidden element visible', inject(function($compile) {
      var element;
      element = angular.element('<explanation></explanation>');
      element = $compile(element)(scope);
      return expect(element.text()).toBe('this is the explanation directive');
    }));
  });

}).call(this);
