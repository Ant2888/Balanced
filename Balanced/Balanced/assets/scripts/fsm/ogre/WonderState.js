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
    var WonderState = (function (_super) {
        __extends(WonderState, _super);
        function WonderState(sys, gsm) {
            var _this = _super.call(this, sys, gsm) || this;
            _this.EPSILON = 10;
            _this.waitIntervalOver = true;
            return _this;
        }
        WonderState.prototype.deElevate = function () {
            // Do nothing -- at base state.
        };
        WonderState.prototype.elevate = function () {
            // we can elevate if we need to follow the player
            this.system.curState = (this.system).follow;
        };
        WonderState.prototype.doLogic = function () {
            var _this = this;
            if (!this.waitIntervalOver)
                return;
            this.timeOut = 3000;
            this.waitIntervalOver = false;
            //grab a rnd pos to go to
            var ogre = this.system.ai;
            this.curGoto = new Phaser.Rectangle(ogre.startPosition.x - ogre.WONDER_RANGE, ogre.startPosition.y + ogre.height, ogre.WONDER_RANGE, 1).randomX;
            //start walking there
            var ms = (ogre.x > this.curGoto ? -1 : 1) * ogre.WALK_SPEED;
            ogre.walk(ms);
            //deal with checking if we are there yet. When we are start the timer for the wait interval
            this.walkLoop = this.system.gsm.game.time.create(true);
            this.walkLoop.loop(50, function () {
                if (_this.timeOut <= 0) {
                    _this.system.ai.walk(0);
                    _this.waitForRndInterval();
                    _this.walkLoop.stop();
                    _this.walkLoop.destroy();
                }
                else if ((_this.system.ai.x == (_this.curGoto + _this.EPSILON))
                    || (_this.system.ai.x == (_this.curGoto - _this.EPSILON))) {
                    _this.system.ai.walk(0);
                    _this.waitForRndInterval();
                    _this.walkLoop.stop();
                    _this.walkLoop.destroy();
                }
                _this.timeOut -= 50;
            }, this);
            this.walkLoop.start();
        };
        WonderState.prototype.waitForRndInterval = function () {
            var _this = this;
            var ogre = this.system.ai;
            var temp = this.system.gsm.game.time.create(true);
            var rnd = Math.floor(Math.random() * (ogre.WALK_INTERVAL[1] - ogre.WALK_INTERVAL[0]))
                + ogre.WALK_INTERVAL[0];
            temp.add(rnd, function () { _this.waitIntervalOver = true; }, this);
            temp.start();
        };
        WonderState.prototype.checkCondition = function () {
            if (this.shouldSee() || (this.system.ai.health < this.system.ai.maxHealth)) {
                this.elevate();
            }
        };
        WonderState.prototype.shouldSee = function () {
            var ogre = this.system.ai;
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);
            return (dx <= ogre.VISION_X) && (dy <= ogre.VISION_Y);
        };
        return WonderState;
    }(FSM.FiniteState));
    FSM.WonderState = WonderState;
})(FSM || (FSM = {}));
//# sourceMappingURL=WonderState.js.map