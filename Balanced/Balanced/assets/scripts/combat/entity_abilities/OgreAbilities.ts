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

            var ogre = <ENTITIES.Ogre>this.ent;
            this.ent.facingLeft = ogre.player.x < ogre.x;

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, 10, false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, 10, false, false, true);

            this.ent.animations.currentAnim.onComplete.add(() => {
                this.ent.playAnimState(this.ent.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                    1, true, true, true);
            }, this);

            return true;
        }
    }
}