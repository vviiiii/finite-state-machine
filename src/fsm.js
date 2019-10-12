class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error;
        }
        this.config = config;
        this.state = config['initial'];
        this.history = [this.state];
        this.initial = true;
        this.position = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config['states'][state]) {
            throw new Error;
        }
        this.state = state;
        this.history.push(this.state);
        this.position = this.history.length - 1;
        this.initial = false;
        return this.state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config['states'][this.state]['transitions'][event]) {
            throw new Error;
        }
        this.state = this.config['states'][this.state]['transitions'][event];
        this.history.push(this.state);
        this.position = this.history.length - 1;
        this.initial = false;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config['initial'];
        this.operationCount = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.config['states']);
        }

        let states = [];
        for (let key in this.config['states']) {
            if (this.config['states'][key]['transitions'].hasOwnProperty(event)) {
                states.push(key);
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */

    undo() {

        if (this.initial) {
            return false;
        }
        if (this.position) {
            this.position = this.history.length - 2;
            this.state = this.history[this.position];

            return true;
        } else {
            return false;
        }



    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if (this.initial) {
            return false;
        }
        if (this.position < this.history.length - 1) {
            this.position++;
            this.state = this.history[this.position];
            return true;
        } else {
            return false;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.initial = true;

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
