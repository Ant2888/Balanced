var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ENTITIES;
(function (ENTITIES) {
    /**
     * Basic entity class
     * @author Anthony, Emerson
     */
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm.game, x, y, key, frame) || this;
            _this.gsm = gsm;
            _this.maxHealth = 100;
            _this.health = 100;
            _this.flinching = false;
            _this.stunned = false;
            _this.inAnim = false;
            _this.facingLeft = false;
            _this.isJumping = false;
            _this.onDeathCallback = new Array();
            _this.onDamageCallback = new Array();
            _this.onHealCallback = new Array();
            _this.animTimer = _this.gsm.game.time.create(false);
            _this.flinchTimer = _this.gsm.game.time.create(false);
            _this.stunTimer = _this.gsm.game.time.create(false);
            _this.flicker = _this.gsm.game.time.create(false);
            _this.gsm.game.add.existing(_this);
            _this.createAnimations();
            _this.anchor.setTo(0.5, 0.5);
            _this.gsm.game.physics.arcade.enable(_this);
            _this.body.gravity.y = 500;
            _this.body.collideWorldBounds = true;
            return _this;
        }
        Entity.prototype.makeHealthBar = function () {
            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(this.width, 5);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, this.width, 5);
            bmd.ctx.fillStyle = 'red';
            bmd.ctx.fill();
            var background = this.gsm.game.add.image(-(this.width / 2), -(this.height / 2) - 15, bmd);
            this.addChildAt(background, 0);
            // This the green background of the healthbar, it will change depending on how much damage is done
            // It is removed in the updateHealthBar function
            var bmd2 = this.gsm.game.add.bitmapData(this.width, 5);
            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, this.width, 5);
            bmd2.ctx.fillStyle = 'green';
            bmd2.ctx.fill();
            var health = this.gsm.game.add.image(-(this.width / 2), -(this.height / 2) - 15, bmd2);
            this.addChildAt(health, 1);
            this.addOnHealCallback(function () { this.updateHealthBar(); }, this);
            this.addOnDamageCallback(function () { this.updateHealthBar(); }, this);
        };
        Entity.prototype.updateHealthBar = function () {
            // remove the old green layer to be replaced
            this.removeChildAt(1);
            // rebuild the green bar to the health bars width adjusted to the width
            var bmd = this.gsm.game.add.bitmapData((this.width / this.maxHealth) * this.health, 5);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, (this.width / this.maxHealth) * this.health, 5);
            bmd.ctx.fillStyle = 'green';
            bmd.ctx.fill();
            var health = this.gsm.game.add.image(-(this.width / 2), -(this.height / 2) - 15, bmd);
            this.addChildAt(health, 1);
        };
        /**
         * Makes the entity jump.
         * @param vy
         */
        Entity.prototype.jump = function (vy) {
            if (this.stunned || !this.alive)
                return false;
            this.body.velocity.y = vy;
            this.playAnimState(this.facingLeft ? ENTITIES.Entity.jumpL : ENTITIES.Entity.jumpR, 10, false, false, true);
            return true;
        };
        /**
         * Moves the entity. Left if < 0 Right else.
         * Stops moving the player and places his idle state if 0.
         * @param dx How to move it.
         */
        Entity.prototype.walk = function (vx) {
            if (this.stunned || !this.alive)
                return false;
            if (vx == 0) {
                this.body.velocity.x = 0;
                if (this.isJumping) {
                }
                else {
                    this.playAnimState(this.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR, 10, true, true);
                }
                return true;
            }
            else if (vx < 0) {
                this.body.velocity.x = vx;
                if (this.isJumping) {
                    this.frame = this.jumpL_lastFrame;
                }
                else {
                    this.playAnimState(ENTITIES.Entity.walkL, 10, true, true);
                }
                this.facingLeft = true;
                return true;
            }
            else {
                this.body.velocity.x = vx;
                if (this.isJumping) {
                    this.frame = this.jumpR_lastFrame;
                }
                else {
                    this.playAnimState(ENTITIES.Entity.walkR, 10, true, true);
                }
                this.facingLeft = false;
                return true;
            }
        };
        Entity.prototype.getAbilityManager = function () {
            return this.abm;
        };
        /**
         * Clears all current callbacks related to the entity.
         */
        Entity.prototype.clearCallBacks = function () {
            this.animTimer.clearPendingEvents();
            this.flinchTimer.clearPendingEvents();
            this.onDeathCallback = new Array();
            this.onDamageCallback = new Array();
            this.onHealCallback = new Array();
        };
        /**
         * Adds a listener to the sprite for when they are healed
         * @param callback  The function, it will get passed the amount of healing and the hp of the sprite
         * @param thisargs  The calling context
         */
        Entity.prototype.addOnHealCallback = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.onHealCallback.push(callback);
        };
        /**
         * Clears all existing healing callbacks
         */
        Entity.prototype.clearHealCallbacks = function () {
            this.onHealCallback = new Array();
        };
        /**
         * Removes a heal callback from the sprite
         * @param callback The callback to remove
         */
        Entity.prototype.removeHealCallback = function (callback) {
            this.onHealCallback = this.onHealCallback.filter(function (e) {
                e != callback;
            });
        };
        /**
         * Adds a listener to the sprite for when they are dealt damage
         * @param callback  The function, it will get passed the amount of damage and the hp of the sprite
         * @param thisargs  The calling context
         */
        Entity.prototype.addOnDamageCallback = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.onDamageCallback.push(callback);
        };
        /**
         * Clears all existing damage callbacks
         */
        Entity.prototype.clearDamageCallbacks = function () {
            this.onDamageCallback = new Array();
        };
        /**
         * Removes a damage callback from the sprite
         * @param callback The callback to remove
         */
        Entity.prototype.removeDamageCallback = function (callback) {
            this.onDamageCallback = this.onDamageCallback.filter(function (e) {
                e != callback;
            });
        };
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
        Entity.prototype.dealDamage = function (damage, crit, color, display, flinch, flinchTime, knockBack, flinchLeft) {
            if (color === void 0) { color = "red"; }
            if (flinchTime === undefined || flinchTime === null)
                flinchTime = ENTITIES.Player.FLINCH_TIME;
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
                new FloatingText(this.gsm.game, {
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + damage,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: color,
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.x,
                    y: this.y - 35,
                    timeToLive: 300
                });
            }
            //do the knockback
            if (knockBack === undefined || knockBack === null) {
                knockBack = { dx: 0, dy: 0, time: 0, stunTime: 0 };
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
                var tween = this.gsm.game.add.tween(this).to({ x: dx, y: dy }, knockBack.time, Phaser.Easing.Quadratic.InOut, true);
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
                this.onDamageCallback.forEach(function (e) { e(damage, hp); });
                this.onDeathCallback.forEach(function (e) { e(); });
                return true;
            }
            else {
                this.health -= damage;
            }
            var hp = this.health;
            this.onDamageCallback.forEach(function (e) { e(damage, hp); });
            if (!flinch)
                return true;
            //Deal with flinching
            this.flinching = true;
            this.flinchTimer.loop(flinchTime, function () {
                this.flinching = false;
                this.flinchTimer.stop();
                this.flicker.stop();
                this.tint = 0xFFFFFF;
            }, this);
            this.flinchTimer.start();
            this.flicker.loop(120, function () {
                this.tint ^= 0xFFFF;
            }, this);
            this.flicker.start();
            //Play the flinch animation
            this.playAnimState(flinchLeft ? Entity.flinchL : Entity.flinchR, 10, false, false, false);
            return true;
        };
        /**
         * Heals the entity (resets the alive bool if applicable)
         * @param hp
         * @param crit
         * @param display
         */
        Entity.prototype.healEntity = function (hp, crit, display) {
            if (display === undefined || display === null)
                display = true;
            if (this.health + hp >= this.maxHealth)
                this.health = this.maxHealth;
            else
                this.health += hp;
            if (display) {
                new FloatingText(this.gsm.game, {
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + hp,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "green",
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.x,
                    y: this.y - 35,
                    timeToLive: 300
                });
            }
            if (this.health > 0)
                this.alive = true;
            var curhp = this.health;
            this.onHealCallback.forEach(function (e) { e(hp, curhp); });
            return true;
        };
        /**
         * Executes all callbacks bound when the player should "die".
         * @param callback  function to be called
         * @param thisargs  the this context
         */
        Entity.prototype.addOnDeathCallBack = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.onDeathCallback.push(callback);
        };
        /**
         * Clears all callbacks for when the player dies
         */
        Entity.prototype.clearDeathCallBacks = function () {
            this.onDeathCallback = new Array();
        };
        /**
         * Removes a callback from the list.
         * May have undefined behaivor.
         * @param callback
         */
        Entity.prototype.removeOnDeathCallBack = function (callback) {
            this.onDeathCallback = this.onDeathCallback.filter(function (e) {
                return e != callback;
            });
        };
        /**
         * Plays an animation state that is registered with this entity.
         * @param anim
         * @param fps
         * @param loop
         * @param releasable
         * @param override Override if it is releasable?
         */
        Entity.prototype.playAnimState = function (anim, fps, loop, releasable, override) {
            if (loop === void 0) { loop = false; }
            if (releasable === void 0) { releasable = false; }
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
        };
        Entity.prototype.randomValWithRandomness = function (val, rnd) {
            return Math.floor(Math.random() * ((val + rnd) -
                (val - rnd) + 1) + (val - rnd));
        };
        /**
         * Gets a random effect for the FCT
         */
        Entity.prototype.getRandomEffect = function () {
            var effectArray = ['smoke', 'physics', 'fade'];
            var randomNumber = Math.floor(Math.random() * effectArray.length) + 1;
            return effectArray[randomNumber];
        };
        return Entity;
    }(Phaser.Sprite));
    //PLACEHOLDERS UNTIL FOUND
    Entity.attackL = 'attackL';
    Entity.attackR = 'attackR';
    Entity.idleL = 'idleL';
    Entity.idleR = 'idleR';
    Entity.walkL = 'walkL';
    Entity.walkR = 'walkR';
    Entity.dieL = 'dieL';
    Entity.dieR = 'dieR';
    Entity.flinchL = 'flinchL';
    Entity.flinchR = 'flinchR';
    Entity.jumpL = 'jumpL';
    Entity.jumpR = 'jumpR';
    Entity.FLINCH_TIME = 1000;
    ENTITIES.Entity = Entity;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Entity.js.map