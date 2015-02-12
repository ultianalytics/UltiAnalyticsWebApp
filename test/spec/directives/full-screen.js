// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  describe('Directive: fullScreen', function() {
    var scope;
    beforeEach(module('newBetaApp'));
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      return scope = $rootScope.$new();
    }));
    return it('should make hidden element visible', inject(function($compile) {
      var element;
      element = angular.element('<full-screen></full-screen>');
      element = $compile(element)(scope);
      return expect(element.text()).toBe('this is the fullScreen directive');
    }));
  });

}).call(this);
