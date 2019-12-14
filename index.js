'use strict';

const Type = require('./lib/type');
const Schema = require('./lib/schema');
const AsyncFunction = (async () => {}).constructor;

const types = {
  Bigint: new Type(value => typeof value === 'bigint'),
  Number: new Type(value => typeof value === 'number'),
  String: new Type(value => typeof value === 'string'),
  Boolean: new Type(value => typeof value === 'boolean'),
  Object: new Type(value => typeof value === 'object'),
  Symbol: new Type(value => typeof value === 'symbol'),
  Function: new Type(value => typeof value === 'function'),
  Undefined: new Type(value => typeof value === 'undefined'),

  Set: Type.from(Set),
  Map: Type.from(Map),
  Array: Type.from(Array),
  Date: Type.from(Date),
  AsyncFunction: Type.from(AsyncFunction),
  Promise: Type.from(Promise),
  Buffer: Type.from(Buffer),

  Null: new Type(value => value === null),
};


module.exports = {
  Type: Object.assign(Type, types),
  Schema,
};
