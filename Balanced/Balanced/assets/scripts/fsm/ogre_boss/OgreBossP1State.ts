module FSM {

    export class OgreBossP1State extends FiniteState {

        public EPSILON = 5;
        public gcd_up: boolean

        public curState: string;

        constructor(sys: OgreBossAI, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.curState = 'follow';
            this.gcd_up = true;
        }

        public deElevate(): void {

        }

        public elevate(): void {
            this.system.curState = (<OgreBossAI>this.system).p2;
        }

        public doLogic(): void {
            if (this.curState == 'follow') {
                //are we in follow substate?
                var ogre = <ENTITIES.OgreBoss>this.system.ai;

                if (ogre.x + this.EPSILON >= this.system.player.x
                    && ogre.x - this.EPSILON <= this.system.player.x) {
                    ogre.walk(0);
                    return;
                }

                var ms = (ogre.x > this.system.player.x ? -1 : 1) * ogre.WALK_SPEED;
                ogre.walk(ms);
            } else {
                //are we in attack substate?
                if (!this.gcd_up)
                    return;

                var ogre = <ENTITIES.OgreBoss>(this.system.ai);
                if (ogre.getAbilityManager().attemptCast(ENTITIES.OgreBoss.ABILITY_ONE)) {

                    var val = ogre.randomValWithRandomness(2, 2);

                    this.system.gsm.musicBox.playByID(val == 4 ? 'OgreAttack1' :
                        (val == 3 ? 'OgreAttack2' : (val == 2 ? 'OgreAttack3' : 'OgreAttack4')),
                        undefined, undefined, UTIL.SFX, false, false);

                    var timer = this.system.gsm.game.time.create(true);
                    this.gcd_up = false;
                    timer.add(ogre.GCD, () => { this.gcd_up = true }, this);
                    timer.start();
                }
            }
        }


        public checkCondition(): void {
            if (this.shouldAttack()) {
                this.system.ai.walk(0);
                this.curState = 'attack';
            } else {
                this.curState = 'follow';
            }
        }

        private shouldAttack(): boolean {
            var ogre = <ENTITIES.OgreBoss>this.system.ai;
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);

            return (dx <= ogre.ATTACK_DISTANCE) && (dy <= (ogre.ATTACK_DISTANCE + 20));
        }

        private delvLogic(): boolean {
            var ogre = <ENTITIES.Ogre>(this.system.ai);
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);

            return (dx > (ogre.ATTACK_DISTANCE + this.EPSILON)) || (dy > (ogre.ATTACK_DISTANCE + this.EPSILON));
        }

    }

}