'use strict';

const assert = require('assert').strict;

const test = (name, testFn) => {
  try {
    testFn(assert);
    console.debug(`[+]\t${name}`);
  } catch (err) {
    console.debug(`[-]\t${name}`);
    console.error(err);
  }
};

module.exports = test;
