'use strict'

const path = require('path')
const version = require('../package.json').version

const banner =
  '/*!\n' +
  ' * vue2-modal v' + version + ' (https://github.com/officert/vue-modal)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Tim Officer\n' +
  ' * Released under the MIT License.\n' +
  ' */';

module.exports = {
  banner,
  version,
  isProduction: process.env.NODE_ENV === 'production',
  paths: {
    root: path.join(__dirname, '..'),
    src: {
      main: path.join(__dirname, '..', 'src'),
      docs: path.join(__dirname, '..', 'docs-src')
    },
    output: {
      main: path.join(__dirname, '..', 'dist'),
      docs: path.join(__dirname, '..', 'docs')
    },
    resolve(location) {
      return path.join(__dirname, '..', location);
    }
  }
};
