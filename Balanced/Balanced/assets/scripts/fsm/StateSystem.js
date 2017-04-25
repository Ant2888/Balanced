var FSM;
(function (FSM) {
    var StateSystem = (function () {
        function StateSystem(gsm, ai, player) {
            this.ai = ai;
            this.player = player;
            this.gsm = gsm;
        }
        StateSystem.prototype.updateSystem = function () {
            this.curState.checkCondition();
            this.curState.doLogic();
        };
        return StateSystem;
    }());
    FSM.StateSystem = StateSystem;
})(FSM || (FSM = {}));
//# sourceMappingURL=StateSystem.js.map