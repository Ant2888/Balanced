module FSM {

    /**
     * @author Anthony
     */
    export class IdleMageState extends FiniteState {

        public EPSILON = 10;

        constructor(sys: MageStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void {
            // No case to elevate
        }

        public elevate(): void {
            this.system.curState = (<MageStateSystem>this.system).attack;
        }

        public doLogic(): void {
            //do nothing; just afking
            var ogre = <ENTITIES.MageOgre>this.system.ai;

            if (ogre.animations.currentAnim.name != 'idleL' &&
                ogre.animations.currentAnim.name != 'idleR') {
                ogre.animations.currentAnim.onComplete.add((e0, e1, me) => {
                    debugger;
                    me.playAnimState(me.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                        1, true, true, true);
                }, this, null, ogre);
            }

        }

        public checkCondition(): void {
            var ogre = <ENTITIES.MageOgre>this.system.ai;

            var closeLeft = this.system.player.x < ogre.x
                && this.system.player.x > (ogre.x - ogre.VISION_X);

            var closeRight = this.system.player.x > ogre.x
                && this.system.player.x < (ogre.x + ogre.VISION_X);

            var closeTop = this.system.player.y > ogre.y
                && this.system.player.y < (ogre.y + ogre.VISION_Y);

            var closeBot = this.system.player.y < ogre.y
                && this.system.player.y > (ogre.y - ogre.VISION_Y);

            if ((closeLeft || closeRight) && (closeTop || closeBot)) {
                this.elevate();
            }
        }
        

    }

}