/**
 * StateChangeListener is an interface for objects interested in 
 * reacting to changes in the runtime state of the main application.
 * @abstract
 */
class StateChangeListener {

  /**
   * onStateChanged is called when the application changes state
   * @param {Application} app 
   */
  onStateChanged(app) {
    
  }

    /**
     * onBoot is called just as Application#start is called.
     * @param {Application} app 
     */
    onBoot(app) {

    }

    /**
     * onConnected is called when the various defined connections are established.
     * @param {Application} app 
     */
    onConnected(app) {

    }

    /**
     * onListening is called when the HttpServer has started accepting connections.
     * @param {Application} app 
     */
    onListening(app) {

    }

    /**
     * onError is called when the application is an unexpected error state and 
     * should be terminated or restored.
     * @param {Error} e 
     * @param {Application} app 
     */
    onError(e, app) {

    }

}

export default StateChangeListener
