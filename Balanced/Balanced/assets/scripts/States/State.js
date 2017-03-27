///<referenced path="GameStateManager.ts"/>
var States;
(function (States) {
    /**
     * This class acts as a template for all States. Use it as an abstract class
     * and extend it to create a new game state.
     * @author Anthony
     */
    var State = (function () {
        /**
         * All states must be initialized with an instance of GSM
         * @param gsm The GameStateManager (controller) of the program.
         */
        function State(gsm) {
            this.gsm = gsm;
        }
        /**
         * The update function will be called before the render function. Use this
         * to perform any calculations, movements and animations that aren't dealt
         * with in any StaticManagers.
         */
        State.prototype.update = function () { };
        /**
         * The render function is called after update function. This can be used to
         * draw anything state related to the screen. This is also where you should
         * decide what to and not to draw from the GSM.
         *
         * It is recommended to simply ADD things to the GUIM for simplicity but not
         * enforced.
         */
        State.prototype.render = function () { };
        /**
         * This function should be used to initialize the class and prepare it for
         * docking in the GSM. This should NOT be used to create the class, only to
         * allocate resources that are not being cached (and things of that sort).
         * Note: Init will get called  BEFORE you start the state whilst startup will
         * be called AS you dock.
         */
        State.prototype.init = function () { };
        /**
         * This function will be called as it being docked so any initial drawing or
         * preparing that might need to be done can be here. Note: Init will get called
         * BEFORE you start the state whilst startup will be called AS you dock.
         *
         * @returns If the startup was succesfull. Errout otherwise.
         */
        State.prototype.startup = function () { return false; };
        /**
         * This function will be called when another state has been sent to be docked.
         * This should NOT destroy everything about the class but just things that
         * SHOULD be initialized again when it must be "start[ed]up".
         *
         * @returns If the ending was succesful. Errout otherwise.
         */
        State.prototype.end = function () { return false; };
        return State;
    }());
    States.State = State;
})(States || (States = {}));
//# sourceMappingURL=State.js.map