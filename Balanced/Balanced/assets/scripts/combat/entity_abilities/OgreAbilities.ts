module COMBAT {
    /**
     * Simple ability class for the ogre
     * @author Anthony
     */
    export class OgreAbilities extends AbilityManager {

        constructor(ent: ENTITIES.Ogre, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            super(ent, gsm, energyMan);
        }

        public attemptCast(ability: number): boolean {
            return this.castAbilityOne();
        }

        public getOgre(): ENTITIES.Ogre {
            return (<ENTITIES.Ogre>this.ent);
        }

        public castAbilityOne(): boolean {
            if (!this.energyMan.useAbility(this.getOgre().ABILITY_ONE_COST)) {
                return false;
            }

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, this.getOgre().ATTACK_SPEED, false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, this.getOgre().ATTACK_SPEED, false, false, true);
            
            return true;
        }
    }
}