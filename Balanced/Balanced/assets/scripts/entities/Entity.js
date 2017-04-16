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
     * @author Anthony
     */
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm.game, x, y, key, frame) || this;
            _this.gsm = gsm;
            _this.health = 100;
            _this.flinching = false;
            _this.inAnim = false;
            _this.onDeathCallback = new Array();
            _this.onDamageCallback = new Array();
            _this.onHealCallback = new Array();
            _this.animTimer = _this.gsm.game.time.create(false);
            _this.flinchTimer = _this.gsm.game.time.create(false);
            _this.gsm.game.add.existing(_this);
            return _this;
        }
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
         * @param flinch Should the player flinch? Default: true
         * @param display Should we display the damage on the player? Default: true
         */
        Entity.prototype.dealDamage = function (damage, crit, color, display, flinch, flinchLeft) {
            if (color === void 0) { color = "red"; }
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
            this.flinchTimer.loop(ENTITIES.Player.FLINCH_TIME, function () {
                this.flinching = false;
            }, this);
            this.flinchTimer.start();
            //Play the flinch animation
            this.playAnimState(flinchLeft ? this.flinchL : this.flinchR, 15, false, true, true);
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
            if (this.health + hp >= 100)
                this.health = 100;
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
                    y: this.y,
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
            this.animations.stop();
            this.animations.play(anim, fps, loop);
            if (!releasable)
                this.inAnim = true;
            this.events.onAnimationComplete.removeAll();
            this.events.onAnimationComplete.add(function () { this.inAnim = false; }, this);
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
    //END PLACEHOLDERS
    Entity.FLINCH_TIME = 1000;
    ENTITIES.Entity = Entity;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Entity.js.map