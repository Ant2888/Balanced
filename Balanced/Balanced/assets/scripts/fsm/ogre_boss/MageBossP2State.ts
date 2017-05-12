module FSM {

    export class MageBossP2State extends FiniteState {

        public justStart: boolean;

        private teleporting: boolean;
        private locked: boolean;

        public isFull: boolean;
        public isHalf: boolean;
        public isQuarter: boolean;

        constructor(sys: MageBossAI, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.justStart = true;
            this.isFull = true;

            this.locked = false;

            this.isHalf = false;
            this.isQuarter = false;
        }

        public deElevate(): void {
            this.system.curState = (<OgreBossAI>this.system).p1;
        }

        public elevate(): void {
            //
        }

        public doLogic(): void {
            //are we locked and shouldnt be executing?
            if (this.locked)
                return;
            
            //in the middle of tp'ing
            if (this.teleporting)
                return;

            //init p2
            if (this.justStart) {
                this.isQuarter ? this.doInitScene(156, 200) : 
                    (this.isHalf ? this.doInitScene(1290, 200) : 
                        this.doInitScene());
                return;
            }

            //just attack the player and tp around
            var mage = <ENTITIES.MageBoss>(this.system.ai);
            if (mage.getAbilityManager().attemptCast(ENTITIES.MageOgre.ABILITY_ONE)) {

                var val = mage.randomValWithRandomness(2, 2);

                this.system.gsm.musicBox.playByID(val == 4 ? 'OgreAttack1' :
                    (val == 3 ? 'OgreAttack2' : (val == 2 ? 'OgreAttack3' : 'OgreAttack4')),
                    undefined, undefined, UTIL.SFX, false, false);
            }
        }

        private doInitScene(numx?: number, numy?: number): void {
            if (numx === null || numx === undefined)
                numx = 750;

            if (numy === null || numy === undefined)
                numy = 650;

            this.justStart = false;
            this.locked = true;

            var tween = this.teleport(numx, numy, true, null, false, true);
            var mage = <ENTITIES.MageBoss>this.system.ai;
            //stay invincible
            mage.overHeadText.text = 'Come my minions!';

            var doSpawning = this.system.gsm.game.time.create(true);
            doSpawning.add(3000, () => {
                this.spawnMobs();
            }, this);

            doSpawning.start();
            this.system.gsm.game.camera.shake(.009, 5000);
        }

        public spawnMobs(): void {
            var boss = <ENTITIES.MageBoss>this.system.ai;
            var state = <States.Level3State>this.system.gsm.getState();
            //lets figure out the mobs position stuff
            var enem;

            var timer = this.system.gsm.game.time.create(true);
            timer.add(300, () => {
                enem = new ENTITIES.MageOgre(this.system.gsm, 1250+Math.random()*(120), 200,
                    <ENTITIES.Player>this.system.player, 'ogre_mage');
                enem.stateLogic.alwaysAttack = true;
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(600, () => {
                enem = new ENTITIES.MageOgre(this.system.gsm, 220 + Math.random() * (120), 200,
                    <ENTITIES.Player>this.system.player, 'ogre_mage');
                enem.stateLogic.alwaysAttack = true;
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(900, () => {
                enem = new ENTITIES.MageOgre(this.system.gsm, 730 + Math.random() * (120), 50,
                    <ENTITIES.Player>this.system.player, 'ogre_mage');
                enem.stateLogic.alwaysAttack = true;
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(1200, () => {
                enem = new ENTITIES.Ogre(this.system.gsm, 220 + Math.random() * (120), 600,
                    <ENTITIES.Player>this.system.player, 'ogre');
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(1500, () => {
                enem = new ENTITIES.Ogre(this.system.gsm, 680 + Math.random() * (120), 600,
                    <ENTITIES.Player>this.system.player, 'ogre');
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(1800, () => {
                enem = new ENTITIES.Ogre(this.system.gsm, 1000 + Math.random() * (120), 600,
                    <ENTITIES.Player>this.system.player, 'ogre');
                enem.stateLogic.curState.elevate();
                enem.makeEnergyBar();
                enem.makeHealthBar();
                state.enemies.add(enem);
            }, this);
            timer.start();

            timer = this.system.gsm.game.time.create(true);
            timer.add(2100, () => {
                boss.facingLeft = this.system.player.x < boss.x;
                boss.playAnimState(boss.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR);
                this.locked = false;
                boss.invincible = false;
                boss.overHeadText.clearColors();
                boss.overHeadText.text = '';
            }, this);
            timer.start();
        }

        /**
         * Teleports the AI to the location in the specified time. Returns the
         * tween that will do such an action. You may pass false through autoStart
         * to start it yourself.
         * @param x
         * @param y
         * @param timeToTP
         */
        public teleport(x: number, y: number, autoStart?: boolean, timeToTP?: number,
            stopAnim?: boolean, stillInvincible?: boolean): Phaser.Tween {
            if (stillInvincible === null || stillInvincible === undefined)
                stillInvincible = false;

            if (stopAnim === null || stopAnim === undefined)
                stopAnim = true;

            if (autoStart === null || autoStart === undefined)
                autoStart = true;

            if (timeToTP === null || timeToTP === undefined)
                timeToTP = 1000;

            this.system.ai.invincible = true;
            this.teleporting = true;

            var tweenOut = this.system.gsm.game.add.tween(
                this.system.ai).to({ alpha: 0 }, timeToTP, Phaser.Easing.Linear.None, false);
            var tweenIn = this.system.gsm.game.add.tween(
                this.system.ai).to({ alpha: 1 }, timeToTP, Phaser.Easing.Linear.None, false);

            tweenOut.chain(tweenIn);
            tweenOut.onComplete.add(() => { this.system.ai.x = x; this.system.ai.y = y; }, this);
            tweenIn.onComplete.add(() => {
                var mage = <ENTITIES.MageBoss>this.system.ai;

                if (!stillInvincible)
                    mage.invincible = false;

                this.teleporting = false;

                if (stopAnim) {
                    mage.playAnimState(mage.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                        null, false, true, true);
                }
            }, this);

            var mage = <ENTITIES.MageBoss>this.system.ai;
            mage.playAnimState(mage.facingLeft ? ENTITIES.Entity.attackL : ENTITIES.Entity.attackR,
                5, true, true);

            if (autoStart)
                tweenOut.start();

            return tweenOut;
        }

        public checkCondition(): void {

        }

    }

}