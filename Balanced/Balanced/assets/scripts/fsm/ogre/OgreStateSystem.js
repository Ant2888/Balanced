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
    var OgreStateSystem = (function (_super) {
        __extends(OgreStateSystem, _super);
        function OgreStateSystem(gsm, ai, player) {
            var _this = _super.call(this, gsm, ai, player) || this;
            _this.initStates();
            return _this;
        }
        OgreStateSystem.prototype.initStates = function () {
            this.attack = new FSM.AttackPlayerState(this, this.gsm);
            this.follow = new FSM.FollowPlayerState(this, this.gsm);
            this.wonder = new FSM.WonderState(this, this.gsm);
            this.curState = this.wonder;
        };
        return OgreStateSystem;
    }(FSM.StateSystem));
    FSM.OgreStateSystem = OgreStateSystem;
})(FSM || (FSM = {}));
//# sourceMappingURL=OgreStateSystem.js.map