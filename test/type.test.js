'use strict';

const { Type } = require('../');

module.exports = test => {
  test('Built-in types constraints', assert => {
    /**
     * Bigint
     */
    assert(Type.Bigint.is(10n));
    assert(Type.Bigint.is(10) === false);

    /**
     * Number
     */
    assert(Type.Number.is(10));
    assert(Type.Number.is('10') === false);

    /**
     * String
     */
    assert(Type.String.is('123'));
    assert(Type.String.is(123) === false);

    /**
     * Boolean
     */
    assert(Type.Boolean.is(false));
    assert(Type.Boolean.is('false') === false);

    /**
     * Object
     */
    assert(Type.Object.is({}));
    assert(Type.Object.is(123) === false);

    /**
     * Symbol
     */
    assert(Type.Symbol.is(Symbol.for('123')));
    assert(Type.Symbol.is({}) === false);

    /**
     * Function
     */
    assert(Type.Function.is(() => {}));
    assert(Type.Function.is(123) === false);

    /**
     * Undefined
     */
    assert(Type.Undefined.is(undefined));
    assert(Type.Undefined.is(null) === false);

    /**
     * Set
     */
    assert(Type.Set.is(new Set()));
    assert(Type.Set.is(new Map()) === false);

    /**
     * Map
     */
    assert(Type.Map.is(new Map()));
    assert(Type.Map.is(new Set()) === false);

    /**
     * Array
     */
    assert(Type.Array.is([]));
    assert(Type.Array.is({}) === false);

    /**
     * Date
     */
    assert(Type.Date.is(new Date()));
    assert(Type.Date.is(Date.now()) === false);

    /**
     * AsyncFunction
     */
    assert(Type.AsyncFunction.is(async () => {}));
    assert(Type.AsyncFunction.is(() => {}) === false);

    /**
     * Promise
     */
    assert(Type.Promise.is(Promise.resolve()));
    assert(Type.Promise.is(async () => {}) === false);

    /**
     * Buffer
     */
    assert(Type.Buffer.is(Buffer.alloc(0)));
    assert(Type.Buffer.is([]) === false);

    /**
     * Null
     */
    assert(Type.Null.is(null));
    assert(Type.Null.is() === false);
  });

  test('Create type from a constraint', assert => {
    const type = new Type(value => value === 'some value');

    assert(type.is('some value'));
    assert(type.is(123) === false);
  });

  test('Create type from a class', assert => {
    const date = Type.from(Date);

    assert(date.is(new Date()));
    assert(date.is({}) === false);
  });

  test('Extend existing type', assert => {
    const integer = Type.extend(Type.Number, value => value % 1 === 0);

    assert(integer.is(10));
    assert(integer.is(10.1) === false);
    assert(integer.is('10') === false);
  });
};
