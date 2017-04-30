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
var COMBAT;
(function (COMBAT) {
    /**
     * Simple ability class for the player
     * @author Anthony
     */
    var PlayerAbilities = (function (_super) {
        __extends(PlayerAbilities, _super);
        function PlayerAbilities(ent, gsm, energyMan) {
            var _this = _super.call(this, ent, gsm, energyMan) || this;
            _this.isGCDUp = true;
            return _this;
        }
        PlayerAbilities.prototype.getAttackSpeed = function () {
            return (this.ent).ATTACK_SPEED;
        };
        PlayerAbilities.prototype.setAttackSpeed = function (atkspd) {
            (this.ent).ATTACK_SPEED = atkspd;
        };
        PlayerAbilities.prototype.getPlayer = function () {
            return (this.ent);
        };
        PlayerAbilities.prototype.attemptCast = function (ability) {
            if (!this.ent.alive)
                return false;
            switch (ability) {
                case ENTITIES.Player.ABILITY_ONE:
                    return this.castAbilityOne();
                case ENTITIES.Player.ABILITY_TWO:
                    return this.castAbilityTwo();
                case ENTITIES.Player.ABILITY_THREE:
                    return this.castAbilityThree();
                case ENTITIES.Player.ABILITY_FOUR:
                    return this.castAbilityFour();
                case ENTITIES.Player.POTION_ONE:
                    return this.usePotionOne();
                case ENTITIES.Player.POTION_TWO:
                    return this.usePotionTwo();
                default:
                    return false;
            }
        };
        PlayerAbilities.prototype.usePotionOne = function () {
            this.gsm.musicBox.playByID('Drinking', undefined, undefined, UTIL.SFX, false, false);
            this.ent.healEntity(25, false, true);
            return true;
        };
        PlayerAbilities.prototype.usePotionTwo = function () {
            this.gsm.musicBox.playByID('Drinking', undefined, undefined, UTIL.SFX, false, false);
            this.energyMan.regenEnergy(25, true);
            return true;
        };
        PlayerAbilities.prototype.castAbilityOne = function () {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_ONE_COST)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height, this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, this.getAttackSpeed(), false, false, true);
            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height, this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Regular_Hit', undefined, undefined, UTIL.SFX, false, false);
            this.setGCD(300);
            return true;
        };
        PlayerAbilities.prototype.castAbilityTwo = function () {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_TWO_COST)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                this.setGCD();
                return false;
            }
            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height, this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability2L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability2R, this.getAttackSpeed(), false, false, true);
            var bullet = this.getPlayer().energyWave.bullets.getTop();
            if (this.ent.facingLeft) {
                bullet.scale.x *= -1;
                this.getPlayer().energyWave.fireAngle = 180;
                this.getPlayer().energyWave.bulletSpeed = -800;
            }
            else {
                bullet.scale.x = Math.abs(bullet.scale.x);
                this.getPlayer().energyWave.fireAngle = 0;
                this.getPlayer().energyWave.bulletSpeed = 800;
            }
            this.getPlayer().energyWave.fire();
            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height, this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Regular_Hit', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        };
        PlayerAbilities.prototype.castAbilityThree = function () {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_THREE_COST)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height, this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability3L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability3R, this.getAttackSpeed(), false, false, true);
            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height, this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Three_Attack', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        };
        PlayerAbilities.prototype.castAbilityFour = function () {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_FOUR_COST)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }
            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height, this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability4L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability4R, this.getAttackSpeed(), false, false, true);
            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height, this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Whirlwind', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        };
        /**
         * Set the GCD of the players abilities (excluding potions)
         * @param offset The additional time after gcd
         */
        PlayerAbilities.prototype.setGCD = function (offset) {
            var _this = this;
            offset = offset || 0;
            this.isGCDUp = false;
            var _timer = this.gsm.game.time.create(true);
            _timer.add(PlayerAbilities.GLOBAL_CD + offset, function () {
                _this.isGCDUp = true;
            }, this);
            _timer.start();
        };
        return PlayerAbilities;
    }(COMBAT.AbilityManager));
    PlayerAbilities.GLOBAL_CD = 200;
    COMBAT.PlayerAbilities = PlayerAbilities;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=PlayerAbilities.js.map