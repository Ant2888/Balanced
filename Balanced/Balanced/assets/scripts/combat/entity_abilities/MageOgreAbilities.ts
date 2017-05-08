module COMBAT {
    /**
     * Simple ability class for the ogre
     * @author Anthony
     */
    export class MageOgreAbilities extends AbilityManager {

        constructor(ent: ENTITIES.MageOgre, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            super(ent, gsm, energyMan);
        }

        public attemptCast(ability: number): boolean {
            return this.castAbilityOne();
        }

        public getMageOgre(): ENTITIES.MageOgre {
            return (<ENTITIES.MageOgre>this.ent);
        }

        public castAbilityOne(): boolean {
            if (!this.energyMan.useAbility(this.getMageOgre().ab1_mod.energyCost)) {
                return false;
            }

            var ogre = <ENTITIES.MageOgre>this.ent;
            this.ent.facingLeft = ogre.player.x < ogre.x;

            ogre.body.setSize(ogre.attackSize.width, ogre.attackSize.height,
                ogre.attackSize.wOffset, ogre.attackSize.hOffset);

            var bullet = this.getMageOgre().fireBall.bullets.getTop();
            var player = this.getMageOgre().player;

            if (this.ent.facingLeft) {
                bullet.scale.x = -Math.abs(bullet.scale.x);
                this.ent.playAnimState(ENTITIES.Entity.attackL, 10, false, false, true);

                this.getMageOgre().fireBall.fire(this.ent, player.x, player.y);
            }
            else {
                bullet.scale.x = Math.abs(bullet.scale.x);
                this.ent.playAnimState(ENTITIES.Entity.attackR, 10, false, false, true);

                this.getMageOgre().fireBall.fire(this.ent, player.x, player.y);
            }

            this.ent.animations.currentAnim.onComplete.add(function () {
                this.body.setSize(this.hitSize.width, this.hitSize.height,
                    this.hitSize.wOffset, this.hitSize.hOffset);

                this.playAnimState(this.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                    1, true, true, true);
            }, <ENTITIES.MageOgre>this.ent);

            return true;
        }
    }
}