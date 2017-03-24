'use strict';

var testService;

describe('Test Service', function() {

  beforeEach(function() {
    module('financeApp');

    inject(function($injector) {
      testService = $injector.get('testService');
    });

  });

  describe('The test service', function() {
    it('should have a function that returns a value', function() {
      expect(testService.testServiceFunction(123)).toBe(123);
    });
  })
});
