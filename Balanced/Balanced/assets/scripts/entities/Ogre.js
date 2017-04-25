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
     * @author Anthony
     */
    var Ogre = (function (_super) {
        __extends(Ogre, _super);
        function Ogre(gsm, x, y, player, key, frame) {
            var _this = _super.call(this, gsm, x, y, key, frame) || this;
            _this.ABILITY_ONE_COST = 75;
            //AI STUFF
            _this.WONDER_RANGE = 64 * 1;
            _this.VISION_X = 64 * 3;
            _this.VISION_Y = 64 * 3;
            _this.WALK_INTERVAL = [1000, 4000];
            _this.WALK_SPEED = 150;
            _this.player = player;
            _this.startPosition = new Phaser.Point(x, y);
            _this.abm = new COMBAT.OgreAbilities(_this, gsm);
            _this.addOnDeathCallBack(function () {
                var _this = this;
                var val = this.randomValWithRandomness(2, 1);
                this.gsm.musicBox.playByID(val == 3 ? 'OgreDeath1' :
                    (val == 2 ? 'OgreDeath2' : 'OgreDeath3'), undefined, undefined, UTIL.SFX, false, false);
                this.animations.currentAnim.onComplete.add(function () { _this.kill(); }, this);
            }, _this);
            _this.addOnDamageCallback(function (d, h) {
                if (h == 0)
                    return;
                var val = this.randomValWithRandomness(2, 2);
                this.gsm.musicBox.playByID(val == 4 ? 'OgreHurt2' :
                    (val == 3 ? 'OgreHurt3' : (val == 2 ? 'OgreHurt4' : 'OgreHurt5')), undefined, undefined, UTIL.SFX, false, false);
            }, _this);
            _this.stateLogic = new FSM.OgreStateSystem(_this.gsm, _this, _this.player);
            return _this;
        }
        Ogre.prototype.dealWithOverlap = function (player, me) {
        };
        Ogre.prototype.createAnimations = function () {
            this.animations.add(ENTITIES.Entity.walkL, [7, 8, 9, 10, 11, 12, 13], 15, false);
            this.animations.add(ENTITIES.Entity.walkR, [14, 15, 16, 17, 18, 19, 20], 15, false);
            this.animations.add(ENTITIES.Entity.dieL, [49, 50, 51], 8, false);
            this.animations.add(ENTITIES.Entity.dieR, [56, 57, 58], 8, false);
            this.animations.add(ENTITIES.Entity.idleL, [0], 1, false);
            this.animations.add(ENTITIES.Entity.idleR, [2], 1, false);
            this.animations.add(ENTITIES.Entity.flinchL, [35, 36, 37], 10, false);
            this.animations.add(ENTITIES.Entity.flinchR, [42, 43, 44], 10, false);
            this.animations.add(ENTITIES.Entity.attackR, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(ENTITIES.Entity.attackL, [66, 67, 68, 69, 70, 71], 15, false);
            this.animations.add(ENTITIES.Entity.jumpL, [21, 22, 23], 15, false);
            this.animations.add(ENTITIES.Entity.jumpR, [28, 29, 30], 15, false);
            this.jumpL_lastFrame = 23;
            this.jumpR_lastFrame = 30;
        };
        Ogre.prototype.loadEntitySounds = function (box) {
            box.addSound('OgreAttack1');
            box.addSound('OgreAttack2');
            box.addSound('OgreAttack3');
            box.addSound('OgreAttack4');
            box.addSound('OgreDeath1');
            box.addSound('OgreDeath2');
            box.addSound('OgreDeath3');
            box.addSound('OgreHurt2');
            box.addSound('OgreHurt3');
            box.addSound('OgreHurt4');
            box.addSound('OgreHurt5');
        };
        return Ogre;
    }(ENTITIES.Entity));
    Ogre.ABILITY_ONE = 1;
    ENTITIES.Ogre = Ogre;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Ogre.js.map