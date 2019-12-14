'use strict';

const { Type, Schema } = require('../');

module.exports = test => {
  test('Create basic schema', assert => {
    const person = new Schema({
      id: Type.Number,
      name: Type.String,
      born: Type.Date,
    });

    assert(person.is({
      id: 1,
      name: 'Alexander',
      born: new Date(),
    }));

    assert(person.is({}) === false);
    assert(person.is({
      id: '1',
      name: 'Alexander',
      born: '2019-12-14',
    }) === false);
  });

  test('Schema as a property', assert => {
    const name = new Schema({
      firstName: Type.String,
      lastName: Type.String,
    });

    const person = new Schema({
      id: Type.Number,
      name,
    });

    assert(person.is({
      id: 1,
      name: {
        firstName: 'Alexander',
        lastName: 'McDonald\'s',
      },
    }));
    assert(person.is({
      id: 1,
      name: 'Alexander',
    }) === false);
  });

  test('Optional properties', assert => {
    const person = new Schema({
      id: Type.Number,
      name: Type.String,
      born: [Type.Date],
    });

    assert(person.is({
      id: 1,
      name: 'Alexander'
    }));
    assert(person.is({
      id: 1,
      name: 'Alexander',
      born: new Date(),
    }));
    assert(person.is({
      id: 1,
      born: new Date(),
    }) === false);
  });
};
