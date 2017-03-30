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
        return State;
    }());
    States.State = State;
})(States || (States = {}));
//# sourceMappingURL=State.js.map