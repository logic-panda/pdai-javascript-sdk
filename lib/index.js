/**
 * panda.js: LogicPandaAI SDK.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

/**
 * Setup to expose.
 * @type {Object}
 */
const panda = exports

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */
panda.version = require('../package.json').version;
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
panda.PandaAI = require('./panda');
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
panda.integrations = require('./integrations');

module.exports = panda;