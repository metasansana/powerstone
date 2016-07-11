import Promise from 'bluebird';

/**
 * StateManager manages multiple StateChangeListener on behalf
 * of the Application.
 * @param {Application} app 
 */
class StateManager {

    constructor(app) {

        this._app = app;
        this._list = [];
        this._state = 'initial';

    }

    /**
     * addListener adds an StateChangeListener to the internal list
     * @param {StateChangeListener} l 
     * @returns {StateManager}
     */
    addListener(l) {

        this._list.push(l);
        return this;

    }

    /**
     * setState sets and dispatches the change.
     * @param {string} state 
     * @returns {StateManager}
     */
    setState(state) {

        this.state = state;
        return Promise.all([Promise.resolve()].concat(this._list.map(l => l.onStateChange(this._app))));

    }

}

export default StateManager
