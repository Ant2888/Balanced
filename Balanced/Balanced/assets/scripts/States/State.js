///<referenced path="GameStateManager.ts"/>
var States;
(function (States) {
    var State = (function () {
        function State(gsm) {
            this.gsm = gsm;
        }
        State.prototype.update = function () { };
        State.prototype.render = function () { };
        State.prototype.init = function () { };
        State.prototype.startup = function () { return false; };
        State.prototype.end = function () { return false; };
        return State;
    }());
    States.State = State;
})(States || (States = {}));
//# sourceMappingURL=State.js.map