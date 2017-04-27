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
            this.musicBox = new UTIL.JukeBox(this);
        }
        //helper to place the initial states and managers
        GameStateManager.prototype.initState = function () {
            this.state = States.MAIN_MENU_STATE;
            this.guiM = new GUI.GUIManager(this);
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
            if (start === void 0) { start = true; }
            if (s === undefined || s === null) {
                //TODO: ERROUT
            }
            if (this.state === undefined || this.state === null) {
                //TODO: ERROUT
            }
            if (this.state.end() == false) {
                //TODO: ERROUT
            }
            if (start)
                this.guiM.destroyAll();
            s.init();
            if (start && s.startup() == false) {
                //TODO: ERROUT
            }
            this.state = s;
        };
        /**
         * Starts the state if not started in the setState.
         * NOTE YOU MUST DESTROY EVERYTHING ON YOUR OWN!
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
            this.game.input.destroy();
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
        GameStateManager.prototype.render = function () {
            this.state.render();
        };
        /**
         * Getter for GUIM
         */
        GameStateManager.prototype.getGUIM = function () {
            return this.guiM;
        };
        return GameStateManager;
    }());
    States.GameStateManager = GameStateManager;
})(States || (States = {}));
//# sourceMappingURL=GameStateManager.js.map