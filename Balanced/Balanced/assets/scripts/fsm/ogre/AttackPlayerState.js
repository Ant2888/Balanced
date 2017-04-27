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
            var _this = _super.call(this, sys, gsm) || this;
            _this.EPSILON = 10;
            _this.gcd_up = true;
            return _this;
        }
        AttackPlayerState.prototype.deElevate = function () {
            this.system.curState = this.system.follow;
        };
        AttackPlayerState.prototype.elevate = function () {
            // No case to elevate
        };
        AttackPlayerState.prototype.doLogic = function () {
            var _this = this;
            if (!this.gcd_up)
                return;
            var ogre = (this.system.ai);
            if (ogre.getAbilityManager().attemptCast(ENTITIES.Ogre.ABILITY_ONE)) {
                var val = ogre.randomValWithRandomness(2, 2);
                this.system.gsm.musicBox.playByID(val == 4 ? 'OgreAttack1' :
                    (val == 3 ? 'OgreAttack2' : (val == 2 ? 'OgreAttack3' : 'OgreAttack4')), undefined, undefined, UTIL.SFX, false, false);
                var timer = this.system.gsm.game.time.create(true);
                this.gcd_up = false;
                timer.add(ogre.GCD, function () { _this.gcd_up = true; }, this);
                timer.start();
            }
        };
        AttackPlayerState.prototype.checkCondition = function () {
            if (this.delvLogic())
                this.deElevate();
        };
        AttackPlayerState.prototype.delvLogic = function () {
            var ogre = (this.system.ai);
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);
            return (dx > (ogre.ATTACK_DISTANCE + this.EPSILON)) || (dy > (ogre.ATTACK_DISTANCE + this.EPSILON));
        };
        return AttackPlayerState;
    }(FSM.FiniteState));
    FSM.AttackPlayerState = AttackPlayerState;
})(FSM || (FSM = {}));
//# sourceMappingURL=AttackPlayerState.js.map