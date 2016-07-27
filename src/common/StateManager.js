import Promise from 'bluebird';

/**
 * StateManager manages multiple StateChangeListener on behalf
 * of the Application.
 * @param {Application} app 
 * @param {string} state 
 */
class StateManager {

    constructor(app, state) {

        this._app = app;
        this._list = [];
        this._state = state;

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
