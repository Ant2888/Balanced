module ENTITIES {
    /**
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    export class Player extends Entity {

        //PLACEHOLDERS UNTIL FOUND

        attackL: string;
        attackR: string;
        idle: string;
        walkL: string;
        walkR: string;
        die: string;
        flinchL: string;
        flinchR: string;
        jump: string;

        //END PLACEHOLDERS

        public static FLINCH_TIME = 500;

        protected onDeathCallback: any[];
        public flinching: boolean;
        public flinchTimer: Phaser.Timer;
        public inAnim: boolean;
        public animTimer: Phaser.Timer;

        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
                | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, key, frame);
            this.maxHealth = 100;
            this.onDeathCallback = new Array();
            this.flinching = false;
            this.inAnim = false;
            this.animTimer = this.gsm.game.time.create(false);
            this.flinchTimer = this.gsm.game.time.create(false);
        }

        /**
         * Deals damage to the player. If they should die to this they will and the on death
         * call back will be sent. Returns if the damage actually happened 
         * @param damage
         * @param crit
         * @param flinch Should the player flinch? Default: true
         * @param display Should we display the damage on the player? Default: true
         */
        public dealDamage(damage: number, crit: boolean, display?: boolean,
               flinch?: boolean, flinchLeft?: boolean): boolean{

            if (flinchLeft === undefined || flinchLeft === null)
                flinchLeft = false;

            if (flinch === undefined || flinch === null)
                flinch = true;

            if (display === undefined || display === null)
                display = true;

            //Already dead
            if (!this.alive)
                return false;

            //Show the damage
            if (display) {
                new FloatingText(this.gsm.game, <FloatingText.Options>{
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + damage,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: <FloatingText.TextOptions>{
                        fontSize: 32,
                        fill: "#FF0000",
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.x,
                    y: this.y,
                    timeToLive: 300
                });
            }

            //Deal the damage
            if (this.health - damage <= 0) {
                this.health = 0;
                this.alive = false;

                //Kill the player
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.playAnimState(this.die, 15, false, false, true);
                this.onDeathCallback.forEach(function (e) { e() });

                return true;
            } else {
                this.health -= damage;
            }

            if (!flinch)
                return true;

            //Deal with flinching
            this.flinching = true;
            this.flinchTimer.loop(Player.FLINCH_TIME, function () {
                this.flinching = false;
            }, this);
            this.flinchTimer.start();

            //Play the flinch animation
            this.playAnimState(flinchLeft ? this.flinchL : this.flinchR, 15, true, false);

            return true;
        }

        /**
         * Heals the player (resets the alive bool if applicable)
         * @param hp
         * @param crit
         * @param display
         */
        public healPlayer(hp: number, crit: boolean, display?: boolean): boolean {

            if (display === undefined || display === null)
                display = true;

            this.health += hp;

            if (display) {
                new FloatingText(this.gsm.game, <FloatingText.Options>{
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + hp,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: <FloatingText.TextOptions>{
                        fontSize: 32,
                        fill: "green",
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.x,
                    y: this.y,
                    timeToLive: 300
                });
            }

            if (this.health > 0)
                this.alive = true;

            return true;
        }

        /**
         * Executes all callbacks bound when the player should "die".
         * @param callback  function to be called
         * @param thisargs  the this context
         */
        public addOnDeathCallBack(callback: any, thisargs?: any): void {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);

            this.onDeathCallback.push(callback);
        }

        /**
         * Clears all callbacks for when the player dies
         */
        public clearDeathCallBacks(): void {
            this.onDeathCallback = new Array();
        }

        /**
         * Removes a callback from the list.
         * May have undefined behaivor.
         * @param callback
         */
        public removeOnDeathCallBack(callback: any): void {
            this.onDeathCallback = this.onDeathCallback.filter( function(e) {
                return e != callback;
            });
        }

        /**
         * Plays an animation state that is registered with this entity.
         * @param anim
         * @param fps
         * @param loop
         * @param releasable
         * @param override Override if it is releasable?
         */
        public playAnimState(anim: string, fps?: number, loop = false, releasable = false,
                override?: boolean): void {

            if (override === undefined || override === null)
                override = false;

            if (this.inAnim && !override)
                return;

            this.animations.stop();
            this.animations.play(anim, fps, loop);

            if (!releasable)
                this.inAnim = true;

            this.events.onAnimationComplete.removeAll();
            this.events.onAnimationComplete.add(function () { this.inAnim = false }, this);
        }
    }
}