module FSM {

    export class MageBossP1State extends FiniteState {

        public teleporting: boolean;
        //also counts as the spawning flag
        public waiting: boolean;

        public castingEvent: Phaser.Timer;

        constructor(sys: MageBossAI, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.teleporting = false;
            this.waiting = false;
        }

        public deElevate(): void {
            //no lower state
        }

        public elevate(): void {
            this.system.ai.invincible = false;
            this.teleporting = false;
            this.system.curState = (<MageBossAI>this.system).p2;
        }

        public doLogic(): void {
            //make sure we're invincible
            if (!this.system.ai.invincible)
                this.system.ai.invincible = true;

            //is the player avoiding the other boss?
            if (this.avoidingBoss() && !this.waiting) {
                this.waiting = true;

                this.castingEvent = this.system.gsm.game.time.create();
                this.castingEvent.loop(Math.random() * (5000 - 2000) + 2000,
                    this.spawnMobsOnInterval, this);

                this.castingEvent.start(2200);

            } else if (!this.avoidingBoss) {
                //player jumped down so lets make sure we dont spawn a mob
                this.waiting = false;

                if (this.castingEvent !== undefined && this.castingEvent !== null) {
                    this.castingEvent.stop(true);
                    this.castingEvent.destroy();
                }
            }


            //teleport the player
            if (!this.shouldTeleport() || this.teleporting)
                return;

            var boss = <ENTITIES.MageBoss>this.system.ai;
            boss.facingLeft = this.system.player.x < boss.x;
            this.teleporting = true;

            boss.playAnimState(boss.facingLeft ? ENTITIES.Entity.attackL : ENTITIES.Entity.attackR);
            boss.animations.currentAnim.onComplete.add(() => {
                this.teleporting = false;
                this.system.ai.playAnimState(this.system.ai.facingLeft ? ENTITIES.Entity.idleL :
                    ENTITIES.Entity.idleR);
                this.system.player.x = Math.random() * (1000 - 200) + 200;
                this.system.player.y = 11 * 64;;
            }, this);
        }

        public spawnMobsOnInterval(): void {
            if (!this.avoidingBoss()) {
                this.waiting = false;
                this.castingEvent.stop(true);
                this.castingEvent.destroy();
                return;
            }

            var boss = <ENTITIES.MageBoss>this.system.ai;
            //lets figure out the mobs position stuff
            var mobX = this.system.player.x > 800 ? Math.random() * (1490 - 1090) + 1090 :
                Math.random() * (400 - 2) + 2;
            var mobY = 100;
            boss.facingLeft = this.system.player.x < boss.x;

            var state = <States.Level3State>this.system.gsm.getState();
            var enem = new ENTITIES.Ogre(this.system.gsm, mobX, mobY,
                <ENTITIES.Player>this.system.player, 'ogre')
            state.enemies.add(enem);
            enem.stateLogic.curState.elevate();
            enem.makeEnergyBar();
            enem.makeHealthBar();

            boss.playAnimState(boss.facingLeft ? ENTITIES.Entity.attackL : ENTITIES.Entity.attackR);
            boss.animations.currentAnim.onComplete.add(() => {
                this.system.ai.playAnimState(this.system.ai.facingLeft ? ENTITIES.Entity.idleL :
                    ENTITIES.Entity.idleR);
            }, this);
        }

        private avoidingBoss(): boolean {
            var py = this.system.player.y;
            return (py < 540);
        }

        private shouldTeleport(): boolean {
            var x = this.system.ai.x;
            var y = this.system.ai.y;
            var px = this.system.player.x;
            var py = this.system.player.y;

            return (py - 32 < y + this.system.ai.height / 2 - 30) && ((px + 300 >= x) || (px - 300 <= x));
        }

        public checkCondition(): void {
            //the elevate will need to passed through the level
        }

    }

}