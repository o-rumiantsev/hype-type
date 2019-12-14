# hype-type

[![npm version](https://badge.fury.io/js/hype-type.svg)](https://badge.fury.io/js/hype-type)

### Install
```sh
npm i hype-type
```

### Usage

Using `hype-type` you can check the type of value 
using built-in library types or your own ones

```javascript
'use strict'

const { Type } = require('hype-type');

Type.Date.is(new Date()); // true

const integer = new Type(value => 
  Type.Number.is(value) &&
  value % 1 === 0
);

integer.is(123); // true
integer.is(12.3); // false

```

### API

Library exports `Type` class with assigned built-in types.

#### Type class

`Type` instances are created by defining type's its constraint, 
extending an existing type or wrapping a class:
```javascript

/**
 * Simple number type
 */
const number = new Type(value => typeof value === 'number');
number.is(10); // true
number.is('10'); // false

/**
 * Extending an existing type
 */
const integer = Type.extend(number, value => value % 1 === 0);
integer.is(10); // true
integer.is(10.1); // false

/**
 * Create a type from a class
 */
const map = Type.from(Map);
map.is(new Map()); // true
map.is({}); // false

```

`Type` methods: 
  * `is(value)` - check whether the value accepts type's constraint
  
`Type` static methods:
  * `extend(type, constraint)` - create a new type, inheriting all parent's constraints
  * `from(class)` - create a new type, which values are instances of `class`
  * `union(...types)` - create a `TypeUnion` instance from given `types` 

#### TypeUnion class

`TypeUnion` extends `Type` class, so it also has an `is` method.

`TypeUnion` methods:
  * `of(value)` - return the type of `value`, if value accepts some from `TypeUnion` types.

```javascript

const unionType = Type.union(Type.Number, Type.String);
unionType.is(123); // true
unionType.is('123'); // true
unionType.is({}); // false

unionType.of(123); // Type.Number
unionType.of('123'); // Type.String
unionType.of({}); // undefined

``` 

#### Schema class 

`Schema` class is useful for defining object property types

```javascript

const { Type, Schema } = require('hype-type');

const person = new Schema({
  id: Type.Number,
  name: Type.Stirng,
  born: Type.Date,
});

person.is({
  id: 1,
  name: 'Alexander',
  born: new Date(),
}); // true

```

`Schema` extends `Type` class, so it has the same methods.

You can also define optional properties using `[]` syntax:
```javascript

const person = new Schema({
  id: Type.Number,
  name: Type.String,
  born: [Type.Date], // optional
});

person.is({
  id: 1,
  name: 'Alexander',
}); // true

person.is({
  name: 'Alexander',
}); // false, required property `id` is missing

```