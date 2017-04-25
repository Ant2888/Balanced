module FSM {

    export class WonderState extends FiniteState {

        private waitIntervalOver: boolean;
        private timeOut: 3000;
        private walkLoop: Phaser.Timer;
        private curGoto: number;

        public EPSILON = 10;

        constructor(sys: OgreStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.waitIntervalOver = true;
        }

        public deElevate(): void {
            // Do nothing -- at base state.
        }

        public elevate(): void {
            // we can elevate if we need to follow the player
            this.system.curState = (<OgreStateSystem>(this.system)).follow;
        }

        public doLogic(): void {
            if (!this.waitIntervalOver)
                return;

            this.timeOut = 3000;
            this.waitIntervalOver = false;
            //grab a rnd pos to go to
            var ogre = <ENTITIES.Ogre>this.system.ai;

            this.curGoto = new Phaser.Rectangle(ogre.startPosition.x - ogre.WONDER_RANGE, ogre.startPosition.y + ogre.height,
                ogre.WONDER_RANGE, 1).randomX;

            //start walking there
            var ms = (ogre.x > this.curGoto ? -1 : 1) * ogre.WALK_SPEED;

            ogre.walk(ms);
            
            //deal with checking if we are there yet. When we are start the timer for the wait interval
            this.walkLoop = this.system.gsm.game.time.create(true);
            this.walkLoop.loop(50, () => {
                if (this.timeOut <= 0) {
                    this.system.ai.walk(0);
                    this.waitForRndInterval();
                    this.walkLoop.stop();
                    this.walkLoop.destroy();
                } else if ((this.system.ai.x == (this.curGoto + this.EPSILON))
                    || (this.system.ai.x == (this.curGoto - this.EPSILON))) {
                    this.system.ai.walk(0);
                    this.waitForRndInterval();
                    this.walkLoop.stop();
                    this.walkLoop.destroy();
                }
                this.timeOut -= 50;
            }, this);
            this.walkLoop.start();
        }

        public waitForRndInterval(): void {
            var ogre = <ENTITIES.Ogre>this.system.ai;
            var temp = this.system.gsm.game.time.create(true);

            var rnd = Math.floor(Math.random() * (ogre.WALK_INTERVAL[1] - ogre.WALK_INTERVAL[0]))
                + ogre.WALK_INTERVAL[0];

            temp.add(rnd, () => { this.waitIntervalOver = true }, this);
            temp.start();
        }

        public checkCondition(): void {
            if (this.shouldSee()) {
                //this.elevate();
            }
        }

        private shouldSee(): boolean {
            var ogre = <ENTITIES.Ogre>this.system.ai;
            var dx = Math.abs(ogre.x - this.system.player.x);
            var dy = Math.abs(ogre.y - this.system.player.y);

            return (dx <= ogre.VISION_X) && (dy <= ogre.VISION_Y);
        }
    }

}