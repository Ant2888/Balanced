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
        FollowPlayerState.prototype.deElevate = function () {
            this.system.curState = this.system.wonder;
        };
        FollowPlayerState.prototype.elevate = function () {
            this.system.curState = this.system.attack;
        };
        FollowPlayerState.prototype.doLogic = function () {
            var ogre = this.system.ai;
            var ms = (ogre.x > this.system.player.x ? -1 : 1) * ogre.WALK_SPEED;
            ogre.walk(ms);
        };
        FollowPlayerState.prototype.checkCondition = function () {
            if (this.shouldAttack()) {
                this.system.ai.walk(0);
                this.elevate();
            }
            /*else if (this.shouldFollow) {
                this.system.ai.walk(0);
                this.deElevate();
            }*/
        };
        FollowPlayerState.prototype.shouldFollow = function () {
            var ogre = this.system.ai;
            return !((this.system.player.x > (ogre.x + ogre.WONDER_RANGE)) ||
                (this.system.player.x < (ogre.x - ogre.WONDER_RANGE)))
                && ((this.system.player.y > (ogre.y + ogre.WONDER_RANGE)) ||
                    (this.system.player.y < (ogre.y - ogre.WONDER_RANGE)));
        };
        FollowPlayerState.prototype.shouldAttack = function () {
            var ogre = this.system.ai;
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);
            return (dx <= ogre.ATTACK_DISTANCE) && (dy <= (ogre.ATTACK_DISTANCE + 20));
        };
        return FollowPlayerState;
    }(FSM.FiniteState));
    FSM.FollowPlayerState = FollowPlayerState;
})(FSM || (FSM = {}));
//# sourceMappingURL=FollowPlayerState.js.map