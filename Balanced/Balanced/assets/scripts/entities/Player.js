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
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm, x, y, key, frame) || this;
            _this.maxHealth = 100;
            _this.onDeathCallback = new Array();
            _this.flinching = false;
            _this.inAnim = false;
            _this.animTimer = _this.gsm.game.time.create(false);
            _this.flinchTimer = _this.gsm.game.time.create(false);
            return _this;
        }
        /**
         * Deals damage to the player. If they should die to this they will and the on death
         * call back will be sent. Returns if the damage actually happened
         * @param damage
         * @param crit
         * @param flinch Should the player flinch? Default: true
         * @param display Should we display the damage on the player? Default: true
         */
        Player.prototype.dealDamage = function (damage, crit, display, flinch, flinchLeft) {
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
                new FloatingText(this.gsm.game, {
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: (crit ? "CRIT " : "") + damage,
                    animation: crit ? "explode" : this.getRandomEffect(),
                    textOptions: {
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
                this.onDeathCallback.forEach(function (e) { e(); });
                return true;
            }
            else {
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
        };
        /**
         * Heals the player (resets the alive bool if applicable)
         * @param hp
         * @param crit
         * @param display
         */
        Player.prototype.healPlayer = function (hp, crit, display) {
            if (display === undefined || display === null)
                display = true;
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
            return true;
        };
        /**
         * Executes all callbacks bound when the player should "die".
         * @param callback  function to be called
         * @param thisargs  the this context
         */
        Player.prototype.addOnDeathCallBack = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.onDeathCallback.push(callback);
        };
        /**
         * Clears all callbacks for when the player dies
         */
        Player.prototype.clearDeathCallBacks = function () {
            this.onDeathCallback = new Array();
        };
        /**
         * Removes a callback from the list.
         * May have undefined behaivor.
         * @param callback
         */
        Player.prototype.removeOnDeathCallBack = function (callback) {
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
        Player.prototype.playAnimState = function (anim, fps, loop, releasable, override) {
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
        return Player;
    }(ENTITIES.Entity));
    //END PLACEHOLDERS
    Player.FLINCH_TIME = 500;
    ENTITIES.Player = Player;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Player.js.map