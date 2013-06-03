'use strict';

describe('Filter: freeRoom', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var freeRoom;
  beforeEach(inject(function ($filter) {
    freeRoom = $filter('freeRoom');
  }));

  it('should return the input prefixed with "freeRoom filter:"', function () {
    var text = 'angularjs';
    expect(freeRoom(text)).toBe('freeRoom filter: ' + text);
  });

});
