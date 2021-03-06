﻿
module States {
    /**
     * This class acts as a template for all States. Use it as an abstract class
     * and extend it to create a new game state.
     * @author Anthony, Emerson 
     */
    export abstract class State {
        private volumeButton: Phaser.Button;
        protected gsm: States.GameStateManager;

        /**
         * All states must be initialized with an instance of GSM
         * @param gsm The GameStateManager (controller) of the program.
         */
        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
        }

        /**
         * Use this to perform any calculations, movements and animations that aren't dealt
         * with in any StaticManagers.
         */
        public abstract update(): void;

        /**
         * This function should be used to initialize the class and prepare it for
         * docking in the GSM. This should NOT be used to create the class, only to
         * allocate resources that are not being cached (and things of that sort).
         * Note: Init will get called  BEFORE you start the state whilst startup will
         * be called AS you dock.
         */
        public abstract init(): void;

        /**
         * This function will be called as it being docked so any initial drawing or
         * preparing that might need to be done can be here. Note: Init will get called
         * BEFORE you start the state whilst startup will be called AS you dock.
         *
         * @returns If the startup was succesfull. Errout otherwise.
         */
        public abstract startup(): boolean;

        /**
         * This function will be called when another state has been sent to be docked.
         * This should NOT destroy everything about the class but just things that
         * SHOULD be initialized again when it must be "start[ed]up".
         *
         * @returns If the ending was succesful. Errout otherwise.
         */
        public abstract end(): boolean;

        /**
         * This function is meant to give a type for something like the GSM to
         * bind a context to.
         */
        public abstract getType(): any;

        /**
         * You can choose to include this in your state or not
         */
        public render(): void {

        }

        public buildSoundButton(): void {
            this.volumeButton = this.gsm.game.add.button(1230, 0, 'sound_btn', function () {
                if (UTIL.MASTER == 1) {
                    this.gsm.game.sound.volume = .5;
                    this.volumeButton.frame = 1;
                    UTIL.MASTER = .5;
                } else if (UTIL.MASTER == .5) {
                    this.gsm.game.sound.volume = 0;
                    this.volumeButton.frame = 2;
                    UTIL.MASTER = 0;
                } else if (UTIL.MASTER == 0) {
                    this.gsm.game.sound.volume = 1;
                    this.volumeButton.frame = 0;
                    UTIL.MASTER = 1;
                }
            }, this);

            switch (UTIL.MASTER) {
                case 0: this.volumeButton.frame = 2; this.gsm.game.sound.volume = 0; break;
                case .5: this.volumeButton.frame = 1; this.gsm.game.sound.volume = .5; break;
                case 1: this.volumeButton.frame = 0; this.gsm.game.sound.volume = 1; break;
            }

            this.volumeButton.fixedToCamera = true;
        }

        public destroySoundButton(): void {
            this.volumeButton.destroy(true);
        }
    }
}