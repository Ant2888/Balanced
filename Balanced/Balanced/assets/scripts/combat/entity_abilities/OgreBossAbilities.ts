﻿module COMBAT {
    /**
     * Simple ability class for the ogre
     * @author Anthony
     */
    export class OgreBossAbilities extends AbilityManager {

        constructor(ent: ENTITIES.OgreBoss, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            super(ent, gsm, energyMan);
        }

        public attemptCast(ability: number): boolean {
            return this.castAbilityOne(); //add more
        }

        public getOgreBoss(): ENTITIES.OgreBoss {
            return (<ENTITIES.OgreBoss>this.ent);
        }

        //basic attack
        public castAbilityOne(): boolean {
            if (!this.energyMan.useAbility(this.getOgreBoss().ab1_mod.energyCost)) {
                return false;
            }

            var ogre = <ENTITIES.OgreBoss>this.ent;
            this.ent.facingLeft = ogre.player.x < ogre.x;

            ogre.body.setSize(ogre.attackSize.width, ogre.attackSize.height,
                ogre.attackSize.wOffset, ogre.attackSize.hOffset);

            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, 15, false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, 15, false, false, true);

            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);

                this.playAnimState(this.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                    1, true, true, true);
            }, <ENTITIES.OgreBoss>this.ent);

            return true;
        }
    }
}