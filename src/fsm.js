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
        // this.transition = config['states'][this.state]['transitions'];
        // this.event = config['states'][this.state][this.transition];
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
        // console.log('111111', this.config['states'][state]);
        if (!this.config['states'][state]) {
            throw new Error;
        }
        this.state = state;
        this.history.push(this.state);
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
        this.initial = false;
        // console.log('111', this.history);
        // console.log('2222', this.transition);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config['initial'];
        this.initial = true;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            // console.log(Object.keys(this.config['states']));
            return Object.keys(this.config['states']);
        }
        if (this.config['states'][this.state]['transitions'][event] === undefined) {
            return [];
        }

        return this.config['states'];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */

     ///// THINK!!!
    undo() {

        if (this.initial) {
            return false;
        }
        // if ( this.history[this.history.length - 2] === undefined) {
        //     return false;
        // }
        // this.state = this.history[this.history.length - 2];
        // console.log('111', this.state );
        //  console.log('22', this.history);
        // return true;


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
        // console.log('22', this.history);
        // this.state = this.history[this.history.length - 1];
        // console.log('111', this.state );
        // console.log('22', this.history);
        // return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        // console.log('111', this.history.length);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
