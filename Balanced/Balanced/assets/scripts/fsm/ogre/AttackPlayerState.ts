module FSM {

    export class AttackPlayerState extends FiniteState {

        public EPSILON = 10;
        public gcd_up: boolean
        
        constructor(sys: OgreStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.gcd_up = true;
        }

        public deElevate(): void {
            this.system.curState = (<OgreStateSystem>this.system).follow;
        }

        public elevate(): void {
            // No case to elevate
        }

        public doLogic(): void {

            if (!this.gcd_up)
                return;

            var ogre = <ENTITIES.Ogre>(this.system.ai);
            if (ogre.getAbilityManager().attemptCast(ENTITIES.Ogre.ABILITY_ONE)) {

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

        public checkCondition(): void {
            if (this.delvLogic())
                this.deElevate();
        }

        private delvLogic(): boolean {
            var ogre = <ENTITIES.Ogre>(this.system.ai);
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);

            return (dx > (ogre.ATTACK_DISTANCE + this.EPSILON)) || (dy > (ogre.ATTACK_DISTANCE + this.EPSILON));
        }

    }

}