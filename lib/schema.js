'use strict';

const Type = require('./type');

class Schema extends Type {
  #definition;
  #required;

  constructor(definition) {
    super();

    const valid = Object
      .keys(definition)
      .every(key => Array.isArray(definition[key])
        ? definition[key][0] instanceof Type
        : definition[key] instanceof Type
      );

    if (!valid) {
      throw new Error('Invalid Definition');
    }

    this.#required = Object
      .keys(definition)
      .filter(key => !Array.isArray(definition[key]));

    this.#definition = Object.fromEntries(
      Object.entries(definition)
        .map(([key, value]) =>
          this.#required.includes(key)
            ? [key, value]
            : [key, value[0]]
        )
    );
  }

  is(value) {
    if (typeof value !== 'object') {
      return false;
    }

    const hasRequired = this.#required.every(key => value.hasOwnProperty(key));

    return hasRequired && Object.keys(value).every(key => {
      if (!this.#definition.hasOwnProperty(key)) {
        return false;
      }

      return this.#definition[key].is(value[key]);
    });
  }
}

module.exports = Schema;
