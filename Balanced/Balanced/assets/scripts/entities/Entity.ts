module ENTITIES {

    /**
     * Basic entity class
     * @author Anthony
     */
    export class Entity extends Phaser.Sprite{
        
        public gsm: States.GameStateManager;

        //PLACEHOLDERS UNTIL FOUND
        protected attackL: string;
        protected attackR: string;
        protected idle: string;
        protected walkL: string;
        protected walkR: string;
        protected die: string;
        protected flinchL: string;
        protected flinchR: string;
        protected jump: string;
        //END PLACEHOLDERS

        public static FLINCH_TIME = 1000;

        protected onDeathCallback: any[];
        protected onDamageCallback: any[];
        protected onHealCallback: any[];

        public flinching: boolean;
        public flinchTimer: Phaser.Timer;
        public inAnim: boolean;
        public animTimer: Phaser.Timer;

        protected abm: COMBAT.PlayerAbilities;

        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
                | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm.game, x, y, key, frame);
            this.gsm = gsm;

            this.health = 100;
            this.flinching = false;
            this.inAnim = false;

            this.onDeathCallback = new Array();
            this.onDamageCallback = new Array();
            this.onHealCallback = new Array();

            this.animTimer = this.gsm.game.time.create(false);
            this.flinchTimer = this.gsm.game.time.create(false);
            this.gsm.game.add.existing(this);
        }

        public getAbilityManager(): COMBAT.AbilityManager {
            return this.abm;
        }

        /**
         * Clears all current callbacks related to the entity.
         */
        public clearCallBacks(): void {
            this.animTimer.clearPendingEvents();
            this.flinchTimer.clearPendingEvents();
            this.onDeathCallback = new Array();
            this.onDamageCallback = new Array();
            this.onHealCallback = new Array();
        }


        /**
         * Adds a listener to the sprite for when they are healed
         * @param callback  The function, it will get passed the amount of healing and the hp of the sprite
         * @param thisargs  The calling context
         */
        public addOnHealCallback(callback: any, thisargs?: any): void {

            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);

            this.onHealCallback.push(callback);
        }

        /**
         * Clears all existing healing callbacks
         */
        public clearHealCallbacks(): void {
            this.onHealCallback = new Array();
        }

        /**
         * Removes a heal callback from the sprite
         * @param callback The callback to remove
         */
        public removeHealCallback(callback: any) {
            this.onHealCallback = this.onHealCallback.filter(function (e) {
                e != callback;
            });
        }


        /**
         * Adds a listener to the sprite for when they are dealt damage
         * @param callback  The function, it will get passed the amount of damage and the hp of the sprite
         * @param thisargs  The calling context
         */
        public addOnDamageCallback(callback: any, thisargs?: any): void {

            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);

            this.onDamageCallback.push(callback);
        }

        /**
         * Clears all existing damage callbacks
         */
        public clearDamageCallbacks(): void {
            this.onDamageCallback = new Array();
        }

        /**
         * Removes a damage callback from the sprite
         * @param callback The callback to remove
         */
        public removeDamageCallback(callback: any) {
            this.onDamageCallback = this.onDamageCallback.filter(function (e) {
                e != callback;
            });
        }

        /**
         * Deals damage to the player. If they should die to this they will and the on death
         * call back will be sent. Returns if the damage actually happened.
         * If the player is already dead no events will be sent out
         * @param damage
         * @param crit
         * @param flinch Should the player flinch? Default: true
         * @param display Should we display the damage on the player? Default: true
         */
        public dealDamage(damage: number, crit: boolean, color = "red", display?: boolean,
            flinch?: boolean, flinchLeft?: boolean): boolean {

            if (flinchLeft === undefined || flinchLeft === null)
                flinchLeft = false;

            if (flinch === undefined || flinch === null)
                flinch = true;

            if (display === undefined || display === null)
                display = true;

            //Already dead
            if (!this.alive)
                return false;

            if (this.flinching)
                return false;

            //Show the damage
            if (display) {
                new FloatingText(this.gsm.game, <FloatingText.Options>{
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + damage,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: <FloatingText.TextOptions>{
                        fontSize: 32,
                        fill: color,
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

                var hp = this.health;
                this.onDamageCallback.forEach(function (e) { e(damage, hp) });
                this.onDeathCallback.forEach(function (e) { e() });

                return true;
            } else {
                this.health -= damage;
            }

            var hp = this.health;
            this.onDamageCallback.forEach(function (e) { e(damage, hp) });

            if (!flinch)
                return true;

            //Deal with flinching
            this.flinching = true;
            this.flinchTimer.loop(Player.FLINCH_TIME, function () {
                this.flinching = false;
            }, this);
            this.flinchTimer.start();

            //Play the flinch animation
            this.playAnimState(flinchLeft ? this.flinchL : this.flinchR, 15, false, true, true);

            return true;
        }

        /**
         * Heals the entity (resets the alive bool if applicable)
         * @param hp
         * @param crit
         * @param display
         */
        public healEntity(hp: number, crit: boolean, display?: boolean): boolean {

            if (display === undefined || display === null)
                display = true;

            if (this.health + hp >= 100)
                this.health = 100;
            else
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

            var curhp = this.health;
            this.onHealCallback.forEach(function (e) { e(hp, curhp) });

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
            this.onDeathCallback = this.onDeathCallback.filter(function (e) {
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

        /**
         * Gets a random effect for the FCT
         */
        public getRandomEffect(): string {
            var effectArray = ['smoke', 'physics', 'fade'];
            var randomNumber = Math.floor(Math.random() * effectArray.length) + 1;
            return effectArray[randomNumber];
        }
    }
}