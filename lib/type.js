'use strict';

class Type {
  #constraint;

  constructor(constraint) {
    this.#constraint = constraint;
  }

  is(value) {
    return this.#constraint(value);
  }

  static extend(parent, constraint) {
    return new Type(value => parent.is(value) && constraint(value));
  }

  static union(...types) {
    return new TypeUnion(types);
  }

  static from(someClass) {
    return new Type(value => value instanceof someClass);
  }
}

class TypeUnion extends Type {
  #types;

  constructor(types) {
    super();
    this.#types = types;
  }

  is(value) {
    return this.#types.some(type => type.is(value));
  }

  of(value) {
    return this.#types.find(type => type.is(value));
  }
}

module.exports = Type;
