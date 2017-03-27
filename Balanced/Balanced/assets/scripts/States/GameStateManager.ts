﻿///<referenced path="State.ts"/>
module States {
    /**
     * This class acts as the primary controller of the entire game.
     * This class controls the interaction between states and contains
     * a refernce to most managers. Most states and objects should access
     * objects they need from Phaser.Game (or otherwise) from here.
     *
     * @author Anthony
     */
    export class GameStateManager {

        public game: Phaser.Game;
        protected state: States.State;

        /**
         * Intializes the GSM. Places the state that is determined to be the start.
         *
         * @param game The Phaser.Game that should have been initialized in
         *             the Boot script.
         */
        constructor(game: Phaser.Game) {
            this.game = game;
            this.state = new States.TestState(this);
            this.initState();
        }

        //helper to place the initial state
        private initState(): void {
            this.state.init();

            if (this.state.startup() == false) {
                //TODO: ERROUT
            }
        }

        /**
         * Gets the current state docked in the GSM.
         *
         * @returns The state in the GSM.
         */
        public getState(): States.State {
            return this.state;
        }

        /**
         * Docks the given state into the GSM. This will call the init
         * regardless of the s parameter. This will also call the "end()"
         * function of the current state.
         *
         * @param s The state to dock.
         * @param start Whether to automatically start the state after docking.
         */
        public setState(s: States.State, start = false): void {
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
        }

        /**
         * Starts the state if not started in the setState.
         */
        public startState(): void {
            if (this.state.startup() == false) {
                //TODO: ERROUT
            }
        }

        /**
         * Ends the current docked state.
         */
        public endState(): void {
            if (this.state.end() == false) {
                //TODO: ERROUT
            }
        }

        /**
         * The update function that gets passed from the main. This will
         * be executed before render. This is used to update before the state,
         * then the state and anything after.
         */
        public update(): void {
            //TODO: DO PRE STATE CLIENT UPDATING HERE
            this.state.update();
            //TODO: DO POST STATE CLIENT UPDATING HERE
        }

        /**
         * Render function gets passed from the main. Executed after update.
         * Used to draw to the screen. The state will be able to decide to tell
         * the GSM whether or not to render something static.
         */
        public render(): void {
            //TODO: DO PRE STATE CLIENT RENDERING HERE
            this.state.render();
            //TODO: DO POST STATE CLIENT RENDERING HERE
        }
    }
}