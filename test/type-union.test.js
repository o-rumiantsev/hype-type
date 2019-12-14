'use strict';

const { Type } = require('../');

module.exports = test => {
  test('Create union of number and string', assert => {
    const union = Type.union(Type.Number, Type.String);

    assert(union.is(123));
    assert(union.is('123'));
    assert(union.is({}) === false);
  });

  test('Get union type of a value', assert => {
    const union = Type.union(Type.String, Type.Date);

    assert.equal(union.of('2019-12-14'), Type.String);
    assert.equal(union.of(new Date()), Type.Date);
    assert.equal(union.of(Date.now()), undefined);
  });
};
