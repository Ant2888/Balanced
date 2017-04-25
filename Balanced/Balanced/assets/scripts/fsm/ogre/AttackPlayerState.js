var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FSM;
(function (FSM) {
    var AttackPlayerState = (function (_super) {
        __extends(AttackPlayerState, _super);
        function AttackPlayerState(sys, gsm) {
            return _super.call(this, sys, gsm) || this;
        }
        AttackPlayerState.prototype.deElevate = function () { };
        AttackPlayerState.prototype.elevate = function () { };
        AttackPlayerState.prototype.doLogic = function () { };
        AttackPlayerState.prototype.checkCondition = function () { };
        return AttackPlayerState;
    }(FSM.FiniteState));
    FSM.AttackPlayerState = AttackPlayerState;
})(FSM || (FSM = {}));
//# sourceMappingURL=AttackPlayerState.js.map