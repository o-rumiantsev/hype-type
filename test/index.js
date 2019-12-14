'use strict';

const { readdir } = require('fs');
const { join } = require('path');
const test = require('./test');

readdir(__dirname, (err, files) => {
  if (err) {
    console.debug('Could not run tests');
    console.error(err);
    return;
  }

  files.filter(filename => filename.endsWith('.test.js'))
    .forEach(filename => {
      console.debug(`\n${filename}`);
      const testFn = require(join(__dirname, filename));
      testFn(test);
    });
});
