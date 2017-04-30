module FSM {

    export class FollowPlayerState extends FiniteState {

        public EPSILON = 5;

        constructor(sys: OgreStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void {
            this.system.curState = (<OgreStateSystem>this.system).wonder;
        }

        public elevate(): void {
            this.system.curState = (<OgreStateSystem>this.system).attack;
        }

        public doLogic(): void {
            
            var ogre = <ENTITIES.Ogre>this.system.ai;

            if (ogre.x + this.EPSILON >= this.system.player.x
                && ogre.x - this.EPSILON <= this.system.player.x) {
                ogre.walk(0);
                return;
            }

            var ms = (ogre.x > this.system.player.x ? -1 : 1) * ogre.WALK_SPEED;
            ogre.walk(ms);

        }


        public checkCondition(): void {
            if (this.shouldAttack()) {
                this.system.ai.walk(0);
                this.elevate();
            }
            /*else if (this.shouldFollow) {
                this.system.ai.walk(0);
                this.deElevate();
            }*/
        }

        private shouldFollow(): boolean {
            var ogre = <ENTITIES.Ogre>this.system.ai;

            return !((this.system.player.x > (ogre.x + ogre.WONDER_RANGE)) ||
                (this.system.player.x < (ogre.x - ogre.WONDER_RANGE)))
                && ((this.system.player.y > (ogre.y + ogre.WONDER_RANGE)) ||
                    (this.system.player.y < (ogre.y - ogre.WONDER_RANGE)));
        }

        private shouldAttack(): boolean {
            var ogre = <ENTITIES.Ogre>this.system.ai;
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);

            return (dx <= ogre.ATTACK_DISTANCE) && (dy <= (ogre.ATTACK_DISTANCE+20));
        }
    }

}