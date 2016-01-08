import restify from 'restify';

/**
 * Plugins is a store for plugins that you can use with restify.
 *
 */
 class Plugins {

  constructor() {
    this.plugins = {};
  }

  /**
   * @callback provider
   * @param {restify.Server} server
   * @param {Configuration} config
   * @param {Loader} loader
   * @param {Module} project
   *
   * set a provider
   * @param {string} name
   * @param {function} provider
   */
   set(name, provider) {
    this.plugins[name] = provider;
    return this;
  }

  /**
   * get returns a previously stored provider
   * @param  {string} name
   */
   get(name) {
    if (!this.plugins.hasOwnProperty(name))
      throw new Error('Unknown restify plugin "' + name + '"!');
    return this.plugins[name];
  }
}

export default new Plugins()
