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
var ENTITIES;
(function (ENTITIES) {
    /**
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm, x, y, key, frame) || this;
            _this.abm = new COMBAT.PlayerAbilities(_this, gsm);
            return _this;
        }
        Player.prototype.createAnimations = function () {
            this.animations.add(ENTITIES.Entity.walkL, [11, 12, 13, 14, 15, 16, 17, 18], 15, false);
            this.animations.add(ENTITIES.Entity.walkR, [22, 23, 24, 25, 26, 27, 28, 29], 15, false);
            this.animations.add(ENTITIES.Entity.dieL, [44, 45, 46, 47, 48, 49, 50, 51], 15, false);
            this.animations.add(ENTITIES.Entity.dieR, [55, 56, 57, 58, 59, 60, 61, 62], 15, false);
            this.animations.add(ENTITIES.Entity.idleL, [0], 1, false);
            this.animations.add(ENTITIES.Entity.idleR, [6], 1, false);
            this.animations.add(ENTITIES.Entity.flinchL, [2, 3, 4], 10, false);
            this.animations.add(ENTITIES.Entity.flinchR, [8, 9, 10], 10, false);
            this.animations.add(ENTITIES.Entity.attackR, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(ENTITIES.Entity.attackL, [66, 67, 68, 69, 70, 71], 15, false);
            this.animations.add(ENTITIES.Entity.jumpL, [33, 34, 35, 36, 37], 15, false);
            this.animations.add(ENTITIES.Entity.jumpR, [38, 39, 40, 41, 42], 15, false);
            this.jumpL_lastFrame = 37;
            this.jumpR_lastFrame = 42;
        };
        return Player;
    }(ENTITIES.Entity));
    ENTITIES.Player = Player;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Player.js.map