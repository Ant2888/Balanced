﻿module COMBAT {
    /**
     * Simple ability class for the player
     * @author Anthony
     */
    export class PlayerAbilities extends AbilityManager{

        public static GLOBAL_CD = 200;
        public isGCDUp = true;

        constructor(ent: ENTITIES.Player, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            super(ent, gsm, energyMan);
        }

        public getAttackSpeed(): number {
            return (<ENTITIES.Player>(this.ent)).ATTACK_SPEED;
        }

        public setAttackSpeed(atkspd: number) {
            (<ENTITIES.Player>(this.ent)).ATTACK_SPEED = atkspd;
        }

        public getPlayer(): ENTITIES.Player {
            return (<ENTITIES.Player>(this.ent))
        }

        public attemptCast(ability: number): boolean {

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
        }

        public usePotionOne(): boolean {
            this.gsm.musicBox.playByID('Drinking', undefined, undefined, UTIL.SFX, false, false);
            this.ent.healEntity(25, false, true);
            return true;
        }

        public usePotionTwo(): boolean {
            this.gsm.musicBox.playByID('Drinking', undefined, undefined, UTIL.SFX, false, false);
            this.energyMan.regenEnergy(25, true);
            return true;
        }

        public castAbilityOne(): boolean {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            if (!this.energyMan.useAbility(this.getPlayer().ab1_mod.energyCost)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height,
                this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, this.getAttackSpeed(), false, false, true);
            
            this.ent.animations.currentAnim.onComplete.add(function() {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Regular_Hit', undefined, undefined, UTIL.SFX, false, false);
            this.setGCD(300);
            return true;
        }

        public castAbilityTwo(): boolean {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            if (!this.energyMan.useAbility(this.getPlayer().ab2_mod.energyCost)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                this.setGCD();
                return false;
            }

            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height,
                this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability2L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability2R, this.getAttackSpeed(), false, false, true);

            var bullet = this.getPlayer().energyWave.bullets.getTop();

            if (this.ent.facingLeft) {
                bullet.scale.x *= -1;
                this.getPlayer().energyWave.fireAngle = 180;
                this.getPlayer().energyWave.bulletSpeed = -800;
            } else {
                bullet.scale.x = Math.abs(bullet.scale.x);
                this.getPlayer().energyWave.fireAngle = 0;
                this.getPlayer().energyWave.bulletSpeed = 800;
            }

            this.getPlayer().energyWave.fire();
            
            this.ent.animations.currentAnim.onComplete.add(function() {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Regular_Hit', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        }

        public castAbilityThree(): boolean {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            if (!this.energyMan.useAbility(this.getPlayer().ab3_mod.energyCost)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height,
                this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability3L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability3R, this.getAttackSpeed(), false, false, true);

            this.ent.animations.currentAnim.onComplete.add(function() {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());
            this.gsm.musicBox.playByID('Three_Attack', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        }

        public castAbilityFour(): boolean {
            if (!this.isGCDUp) {
                this.gsm.musicBox.randomPlayByID('spell_not_ready', 10, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            if (!this.energyMan.useAbility(this.getPlayer().ab4_mod.energyCost)) {
                this.gsm.musicBox.randomPlayByID('Need_Energy', 20, undefined, undefined, UTIL.SFX, false, false);
                return false;
            }

            this.getPlayer().body.setSize(this.getPlayer().attackSize.width, this.getPlayer().attackSize.height,
                this.getPlayer().attackSize.wOffset, this.getPlayer().attackSize.hOffset);

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability4L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability4R, this.getAttackSpeed(), false, false, true);

            this.ent.animations.currentAnim.onComplete.add(function() {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);
            }, this.getPlayer());

            this.gsm.musicBox.playByID('Whirlwind', undefined, undefined, UTIL.SFX, false);
            this.setGCD(300);
            return true;
        }

        /**
         * Set the GCD of the players abilities (excluding potions)
         * @param offset The additional time after gcd
         */
        public setGCD(offset?: number): void {

            offset = offset || 0;

            this.isGCDUp = false;
            var _timer = this.gsm.game.time.create(true);
            _timer.add(PlayerAbilities.GLOBAL_CD+offset, () => {
                this.isGCDUp = true;
            }, this);
            _timer.start();
        }
    }
}