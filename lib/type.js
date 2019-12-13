'use strict';

class Type {
  #constraints = [];

  constructor(constraint) {
    if (constraint) {
      this.addConstraint(constraint);
    }
  }

  is(value) {
    return this.#constraints.every(constraint => constraint(value));
  }

  addConstraint(constraint) {
    this.#constraints.push(constraint);
    return this;
  }

  static extend(parent, constraint) {
    const type = parent.#constraints.reduce(
      (type, parentConstraint) => type.addConstraint(parentConstraint),
      new Type()
    );
    return type.addConstraint(constraint);
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
    const valid = this.#types.some(type => type.is(value));
    if (!valid) {
      return false;
    }
    return super.is(value);
  }

  of(value) {
    return this.#types.find(type => type.is(value));
  }
}

module.exports = Type;
