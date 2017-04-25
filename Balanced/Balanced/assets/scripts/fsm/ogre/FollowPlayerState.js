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
    var FollowPlayerState = (function (_super) {
        __extends(FollowPlayerState, _super);
        function FollowPlayerState(sys, gsm) {
            return _super.call(this, sys, gsm) || this;
        }
        FollowPlayerState.prototype.deElevate = function () { };
        FollowPlayerState.prototype.elevate = function () { };
        FollowPlayerState.prototype.doLogic = function () { };
        FollowPlayerState.prototype.checkCondition = function () { };
        return FollowPlayerState;
    }(FSM.FiniteState));
    FSM.FollowPlayerState = FollowPlayerState;
})(FSM || (FSM = {}));
//# sourceMappingURL=FollowPlayerState.js.map