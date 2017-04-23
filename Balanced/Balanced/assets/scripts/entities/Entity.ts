module ENTITIES {

    /**
     * Simple knockback struct
     */
    interface KnockBack {
        //how far back should the player go
        dx?: number,
        //how far up/down should the player go
        dy?: number,
        //how long should it take to get there
        time?: number,
        //how long are they stunned? 0 for no stunning
        stunTime?: number
    }

    /**
     * Basic entity class
     * @author Anthony
     */
    export abstract class Entity extends Phaser.Sprite{
        
        public gsm: States.GameStateManager;

        //PLACEHOLDERS UNTIL FOUND
        public static attackL = 'attackL';
        public static attackR = 'attackR';
        public static idleL   = 'idleL';
        public static idleR   = 'idleR';
        public static walkL   = 'walkL';
        public static walkR   = 'walkR';
        public static dieL    = 'dieL';
        public static dieR    = 'dieR';
        public static flinchL = 'flinchL';
        public static flinchR = 'flinchR';
        public static jumpL   = 'jumpL';
        public static jumpR = 'jumpR';
        protected jumpL_lastFrame: number;
        protected jumpR_lastFrame: number;
        //END PLACEHOLDERS

        public facingLeft: boolean;
        public isJumping: boolean;

        public static FLINCH_TIME = 1000;

        protected onDeathCallback: any[];
        protected onDamageCallback: any[];
        protected onHealCallback: any[];

        public curTween: Phaser.Tween;
        public stunned: boolean;
        public stunTimer: Phaser.Timer;
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
            this.stunned = false;
            this.inAnim = false;
            this.facingLeft = false;
            this.isJumping = false;

            this.onDeathCallback = new Array();
            this.onDamageCallback = new Array();
            this.onHealCallback = new Array();

            this.animTimer = this.gsm.game.time.create(false);
            this.flinchTimer = this.gsm.game.time.create(false);
            this.stunTimer = this.gsm.game.time.create(false);
            this.gsm.game.add.existing(this);

            this.createAnimations();
            this.anchor.setTo(0.5, 0.5);
            this.gsm.game.physics.arcade.enable(this);
            this.body.gravity.y = 500;
            this.body.collideWorldBounds = true;
        }

        public jump(vy: number): boolean {
            if (this.stunned || !this.alive)
                return false;

            this.body.velocity.y = vy;
            this.playAnimState(this.facingLeft ? ENTITIES.Entity.jumpL : ENTITIES.Entity.jumpR,
                10, false, false, true);

            return true;
        }
        
        /**
         * Moves the entity. Left if < 0 Right else.
         * Stops moving the player and places his idle state if 0.
         * @param dx How to move it.
         */
        public walk(vx: number): boolean {
            if (this.stunned || !this.alive)
                return false;

            if (vx == 0) {
                this.body.velocity.x = 0;
                
                if (this.isJumping) {
                    
                } else {
                    this.playAnimState(this.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR,
                        10, true, true);
                }

                return true;
            }

            else if (vx < 0) {
                this.body.velocity.x = vx;

                if (this.isJumping) {
                    this.frame = this.jumpL_lastFrame;
                } else {
                    this.playAnimState(ENTITIES.Entity.walkL, 10, true, true);
                }

                this.facingLeft = true;
                return true;
            }

            else {
                this.body.velocity.x = vx;

                if (this.isJumping) {
                    this.frame = this.jumpR_lastFrame;
                } else {
                    this.playAnimState(ENTITIES.Entity.walkR, 10, true, true);
                }

                this.facingLeft = false;
                return true;
            }

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
         * @param display Should we display the damage on the player? Default: true
         * @param flinch Should the player flinch? Default: true
         * @param flinchTime How long should we flinch? Defaults FLINCH_TIME
         * @param flinchLeft Should the player flinchLeft? Default: true
         */
        public dealDamage(damage: number, crit: boolean, color = "red", display?: boolean,
            flinch?: boolean, flinchTime?: number, knockBack?: KnockBack, flinchLeft?: boolean): boolean {

            if (flinchTime === undefined || flinchTime === null)
                flinchTime = Player.FLINCH_TIME;

            if (flinchLeft === undefined || flinchLeft === null)
                flinchLeft = true;

            if (flinch === undefined || flinch === null)
                flinch = true;

            if (display === undefined || display === null)
                display = true;

            //Already dead
            if (!this.alive)
                return false;

            //are we flinching?
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

            //do the knockback
            if (knockBack === undefined || knockBack === null) {
                knockBack = { dx: 0, dy: 0, time: 0, stunTime: 0};
            }

            knockBack = {
                dx: knockBack.dx || 0,
                dy: knockBack.dy || 0,
                time: knockBack.time || 1,
                stunTime: knockBack.stunTime || 0
            };

            //stun the entity
            if (knockBack.stunTime != 0) {
                this.stunned = true;

                this.stunTimer.loop(knockBack.stunTime, function () {
                    this.stunned = false;
                    this.stunTimer.stop();
                }, this);

                this.stunTimer.start();
            }

            //make sure we're actually getting knock backed
            if (knockBack.dx != 0 || knockBack.dy != 0) {
                if (this.curTween !== null && this.curTween !== undefined)
                    this.curTween.stop();

                //tween them to where they should go
                var dx = this.x + knockBack.dx;
                var dy = this.y + knockBack.dy;
                var tween = this.gsm.game.add.tween(this).to({ x: dx, y: dy }, knockBack.time, Phaser.Easing.Quadratic.InOut,
                    true);
                tween.interpolation(Phaser.Math.bezierInterpolation);
                this.curTween = tween;
            }

            //Deal the damage
            if (this.health - damage <= 0) {
                this.health = 0;
                this.alive = false;

                //Kill the player
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.playAnimState(this.facingLeft ? Entity.dieL : Entity.dieR, 15, false, false, true);

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
            this.flinchTimer.loop(flinchTime, function () {
                this.flinching = false;
                this.flinchTimer.stop();
            }, this);
            this.flinchTimer.start();

            //Play the flinch animation
            this.playAnimState(flinchLeft ? Entity.flinchL : Entity.flinchR, 10, false, false, true);

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
            
            this.animations.play(anim, fps, loop);

            if (!releasable)
                this.inAnim = true;
            else
                return;

            this.events.onAnimationComplete.add(function () {
                this.inAnim = false;
                this.events.onAnimationComplete.removeAll();
            }, this);
        }

        /**
         * Gets a random effect for the FCT
         */
        public getRandomEffect(): string {
            var effectArray = ['smoke', 'physics', 'fade'];
            var randomNumber = Math.floor(Math.random() * effectArray.length) + 1;
            return effectArray[randomNumber];
        }

        protected abstract createAnimations(): void;
    }
}