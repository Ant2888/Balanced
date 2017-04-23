module COMBAT {
    /**
     * Simple ability class for the player
     * @author Anthony
     */
    export class PlayerAbilities extends AbilityManager{
        
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
                default:
                    return false;
            }
        }

        public usePotionOne(): boolean {
            return false;
        }

        public castAbilityOne(): boolean {
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_ONE_COST))
                return false;

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, this.getAttackSpeed(), false, false, true);

            return true;
        }

        public castAbilityTwo(): boolean {
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_TWO_COST))
                return false;

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

            return true;
        }

        public castAbilityThree(): boolean {
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_THREE_COST))
                return false;

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability3L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability3R, this.getAttackSpeed(), false, false, true);

            return true;
        }

        public castAbilityFour(): boolean {
            if (!this.energyMan.useAbility(this.getPlayer().ABILITY_FOUR_COST))
                return false;

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Player.ability4L, this.getAttackSpeed(), false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Player.ability4R, this.getAttackSpeed(), false, false, true);

            return true;
        }
    }
}