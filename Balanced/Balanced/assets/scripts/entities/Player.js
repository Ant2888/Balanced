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
            // STATS
            _this.ATTACK_SPEED = 12;
            _this.DEFENCE = 25;
            _this.ATTACK = 45;
            // END STATS
            _this.RANDOMNESS = 20;
            _this.ABILITY_ONE_COST = 5;
            _this.ABILITY_TWO_COST = 30;
            _this.ABILITY_THREE_COST = 45;
            _this.ABILITY_FOUR_COST = 80;
            _this.WAVE_ATK = 'wave_attk';
            _this.abm = new COMBAT.PlayerAbilities(_this, gsm);
            _this.energyWave = _this.gsm.game.add.weapon(15, _this.WAVE_ATK);
            _this.energyWave.addBulletAnimation('wave_anim', [0, 1, 2, 3, 4], 10, false);
            _this.energyWave.bulletAnimation = 'wave_anim';
            _this.energyWave.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
            _this.energyWave.bulletLifespan = 750;
            _this.energyWave.bulletSpeed = 800;
            _this.energyWave.bulletRotateToVelocity = true;
            _this.energyWave.bulletGravity.y = -_this.gsm.game.physics.arcade.gravity.y;
            _this.energyWave.fireRate = 250;
            _this.energyWave.trackSprite(_this, 0, 0, true);
            _this.recalcModifiers();
            _this.addOnDeathCallBack(function () {
                this.gsm.musicBox.playByID('PlayerDeath', undefined, undefined, UTIL.SFX, false, false);
            }, _this);
            _this.addOnDamageCallback(function () {
                var val = this.randomValWithRandomness(2, 1);
                this.gsm.musicBox.randomPlayByID(val == 3 ? 'PlayerHurt3' :
                    (val == 2 ? 'PlayerHurt2' : 'PlayerHurt1'), 70, undefined, undefined, UTIL.SFX, false, false);
            }, _this);
            return _this;
        }
        Player.prototype.recalcModifiers = function () {
            this.ab1_mod = {
                dmg: this.ATTACK * 1.0, flinchTime: ENTITIES.Entity.FLINCH_TIME, stunTime: 0,
                knockback: { dx: 10, dy: -10, time: 300 }
            };
            this.ab2_mod = {
                dmg: this.ATTACK * .75
            };
            this.ab3_mod = {
                dmg: this.ATTACK * .75, flinchTime: 0, stunTime: 0,
                knockback: { dx: 10, dy: -10, time: 300, stunTime: 100 }
            };
            this.ab4_mod = {
                dmg: this.ATTACK * 1.75, flinchTime: this.ab1_mod.flinchTime || ENTITIES.Entity.FLINCH_TIME, stunTime: 1500,
                knockback: { dx: 115, dy: -125, time: 500, stunTime: 1250 }
            };
        };
        Player.prototype.createAnimations = function () {
            this.animations.add(Player.ability2L, [66, 67, 68, 69, 70, 71], 15, false);
            this.animations.add(Player.ability2R, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(Player.ability3L, [88, 89, 90, 91, 92, 93, 94, 95, 96, 97], 15, false);
            this.animations.add(Player.ability3R, [99, 100, 101, 102, 103, 104, 105, 106, 107, 108], 15, false);
            this.animations.add(Player.ability4L, [110, 111, 112, 113, 114, 115, 116, 117, 118, 119], 15, false);
            this.animations.add(Player.ability4R, [121, 122, 123, 124, 125, 126, 127, 128, 129, 130], 15, false);
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
        Player.prototype.dealWithOverlap = function (me, other) {
            if (me instanceof Phaser.Bullet) {
                this.bulletLogic(me, other);
            }
            if (other instanceof Phaser.Group) {
                other.forEach(function (e) { this.doAttackLogic(e); }, this);
            }
            else {
                this.doAttackLogic(other);
            }
        };
        Player.prototype.doAttackLogic = function (mob) {
            switch (this.animations.currentAnim.name) {
                case ENTITIES.Entity.idleL:
                case ENTITIES.Entity.idleR:
                    mob.dealWithOverlap(this, mob);
                    break;
                case ENTITIES.Entity.attackL:
                case ENTITIES.Entity.attackR:
                    mob.dealWithOverlap(this, mob);
                    this.doAbilityDamage(mob, this.ab1_mod);
                    break;
                case Player.ability2L:
                case Player.ability2R:
                    mob.dealWithOverlap(this, mob);
                    //Bullet case so ignore this
                    break;
                case Player.ability3L:
                case Player.ability3R:
                    mob.dealWithOverlap(this, mob);
                    this.ab3(mob);
                    break;
                case Player.ability4L:
                case Player.ability4R:
                    mob.dealWithOverlap(this, mob);
                    this.doAbilityDamage(mob, this.ab4_mod);
                    break;
            }
        };
        Player.prototype.ab3 = function (mob) {
            var mod = this.ab3_mod;
            var damage = this.randomValWithRandomness(mod.dmg, this.RANDOMNESS);
            mod.knockback.dx = Math.abs(mod.knockback.dx) * (this.facingLeft ? -1 : 1);
            mob.dealDamage(damage, damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, false, 0, mod.knockback, this.facingLeft);
            mob.dealDamage(Math.floor(damage * .75), damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, false, 0, mod.knockback, this.facingLeft);
            mob.dealDamage(Math.floor(damage * .33), damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, true, 1000, mod.knockback, this.facingLeft);
        };
        Player.prototype.doAbilityDamage = function (mob, mod) {
            var damage = this.randomValWithRandomness(mod.dmg, this.RANDOMNESS);
            mod.knockback.dx = Math.abs(mod.knockback.dx) * (this.facingLeft ? -1 : 1);
            mob.dealDamage(damage, damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, mod.flinchTime > 0, mod.flinchTime, mod.knockback, this.facingLeft);
        };
        Player.prototype.bulletLogic = function (me, other) {
            var damage = this.randomValWithRandomness(this.ab2_mod.dmg, this.RANDOMNESS);
            other.dealDamage(damage, damage > (this.ab2_mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, true, 300, { dx: (this.facingLeft ? -1 : 1) * 10, dy: -10, stunTime: 200, time: 300 }, this.facingLeft);
            me.kill();
        };
        Player.prototype.loadEntitySounds = function (box) {
            box.addSound('PlayerDeath');
            box.addSound('PlayerHurt1');
            box.addSound('PlayerHurt2');
            box.addSound('PlayerHurt3');
            box.addSound('Regular_Hit');
            box.addSound('Spell_not_Ready');
            box.addSound('Three_Attack');
            box.addSound('Whirlwind');
            box.addSound('Need_Energy');
            box.addSound('Jump1');
            box.addSound('Fall1');
            box.addSound('Footsteps');
            box.addSound('Drinking');
            box.addSound('Bag_Open');
            box.addSound('Bag_Close');
            box.addSound('OpenMenu');
        };
        return Player;
    }(ENTITIES.Entity));
    // end mods
    Player.ability2L = 'ab2L';
    Player.ability2R = 'ab2R';
    Player.ability3L = 'ab3L';
    Player.ability3R = 'ab3R';
    Player.ability4L = 'ab4L';
    Player.ability4R = 'ab4R';
    Player.ABILITY_ONE = 1;
    Player.ABILITY_TWO = 2;
    Player.ABILITY_THREE = 3;
    Player.ABILITY_FOUR = 4;
    Player.POTION_ONE = 5;
    ENTITIES.Player = Player;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Player.js.map