'use strict';

describe('Filter: selectedBuilding', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var selectedBuilding;
  beforeEach(inject(function ($filter) {
    selectedBuilding = $filter('selectedBuilding');
  }));

  it('should return the input prefixed with "selectedBuilding filter:"', function () {
    var text = 'angularjs';
    expect(selectedBuilding(text)).toBe('selectedBuilding filter: ' + text);
  });

});
