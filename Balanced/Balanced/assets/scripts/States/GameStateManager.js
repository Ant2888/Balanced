///<referenced path="State.ts"/>
var States;
(function (States) {
    /**
     * This class acts as the primary controller of the entire game.
     * This class controls the interaction between states and contains
     * a refernce to most managers. Most states and objects should access
     * objects they need from Phaser.Game (or otherwise) from here.
     *
     * @author Anthony
     */
    var GameStateManager = (function () {
        /**
         * Intializes the GSM. Places the state that is determined to be the start.
         *
         * @param game The Phaser.Game that should have been initialized in
         *             the Boot script.
         */
        function GameStateManager(game) {
            this.game = game;
            this.state = new States.TestState(this);
            this.initState();
        }
        //helper to place the initial state
        GameStateManager.prototype.initState = function () {
            this.state.init();
            if (this.state.startup() == false) {
                //TODO: ERROUT
            }
        };
        /**
         * Gets the current state docked in the GSM.
         *
         * @returns The state in the GSM.
         */
        GameStateManager.prototype.getState = function () {
            return this.state;
        };
        /**
         * Docks the given state into the GSM. This will call the init
         * regardless of the s parameter. This will also call the "end()"
         * function of the current state.
         *
         * @param s The state to dock.
         * @param start Whether to automatically start the state after docking.
         */
        GameStateManager.prototype.setState = function (s, start) {
            if (start === void 0) { start = false; }
            if (s === undefined || s === null) {
                //TODO: ERROUT
            }
            if (this.state === undefined || this.state === null) {
                //TODO: ERROUT
            }
            if (this.state.end() == false) {
                //TODO: ERROUT
            }
            s.init();
            if (start && this.state.startup() == false) {
                //TODO: ERROUT
            }
            this.state = s;
        };
        /**
         * Starts the state if not started in the setState.
         */
        GameStateManager.prototype.startState = function () {
            if (this.state.startup() == false) {
                //TODO: ERROUT
            }
        };
        /**
         * Ends the current docked state.
         */
        GameStateManager.prototype.endState = function () {
            if (this.state.end() == false) {
                //TODO: ERROUT
            }
        };
        /**
         * The update function that gets passed from the main. This will
         * be executed before render. This is used to update before the state,
         * then the state and anything after.
         */
        GameStateManager.prototype.update = function () {
            //TODO: DO PRE STATE CLIENT UPDATING HERE
            this.state.update();
            //TODO: DO POST STATE CLIENT UPDATING HERE
        };
        /**
         * Render function gets passed from the main. Executed after update.
         * Used to draw to the screen. The state will be able to decide to tell
         * the GSM whether or not to render something static.
         */
        GameStateManager.prototype.render = function () {
            //TODO: DO PRE STATE CLIENT RENDERING HERE
            this.state.render();
            //TODO: DO POST STATE CLIENT RENDERING HERE
        };
        return GameStateManager;
    }());
    States.GameStateManager = GameStateManager;
})(States || (States = {}));
//# sourceMappingURL=GameStateManager.js.map