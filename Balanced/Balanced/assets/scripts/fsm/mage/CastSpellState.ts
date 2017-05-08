module FSM {

    export class CastSpellState extends FiniteState {

        public EPSILON = 10;
        
        constructor(sys: MageStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void {
            this.system.curState = (<MageStateSystem>this.system).idle;
        }

        public elevate(): void {
            // No case to elevate
        }

        public doLogic(): void {

            var ogre = <ENTITIES.MageOgre>(this.system.ai);
            if (ogre.getAbilityManager().attemptCast(ENTITIES.MageOgre.ABILITY_ONE)) {

                var val = ogre.randomValWithRandomness(2, 2);

                this.system.gsm.musicBox.playByID(val == 4 ? 'OgreAttack1' :
                    (val == 3 ? 'OgreAttack2' : (val == 2 ? 'OgreAttack3' : 'OgreAttack4')),
                    undefined, undefined, UTIL.SFX, false, false);
            }

        }

        public checkCondition(): void {
            if (this.delvLogic())
                this.deElevate();
        }

        private delvLogic(): boolean {
            var ogre = <ENTITIES.MageOgre>this.system.ai;
            var player = this.system.player;

            var farLeft = player.x < ogre.x
                && player.x < (ogre.x - ogre.VISION_X - this.EPSILON);

            var farRight = player.x > ogre.x
                && player.x > (ogre.x + ogre.VISION_X + this.EPSILON);

            var farTop = player.y > ogre.y
                && player.y > (ogre.y + ogre.VISION_Y + this.EPSILON);

            var farBot = player.y < ogre.y
                && player.y < (ogre.y - ogre.VISION_Y - this.EPSILON);

            return (farLeft || farRight) && (farTop || farBot);
        }

    }

}