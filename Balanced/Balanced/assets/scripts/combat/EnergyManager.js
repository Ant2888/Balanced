var COMBAT;
(function (COMBAT) {
    /**
     * This class will represent the energy of any entity. You can limit ability usage
     * through this or ignore it.
     * @author Anthony
     */
    var EnergyManager = (function () {
        function EnergyManager(gsm, ent, regenRate, rate) {
            if (regenRate === undefined || regenRate === null)
                regenRate = 1;
            if (rate === undefined || rate === null)
                rate = EnergyManager.REGEN_RATE;
            this.gsm = gsm;
            this.rate = rate;
            this.regenRate = regenRate;
            this.ent = ent;
            this.energy = 100;
            this.energyGainedCallbacks = new Array();
            this.energyLossedCallbacks = new Array();
            this.regenTimer = this.gsm.game.time.create(false);
            this.restartEnergyRegen();
        }
        /**
         * Attempts to stop the current regen and reinitializes the
         * loop again. Use this if you need to reset the rate.
         */
        EnergyManager.prototype.restartEnergyRegen = function () {
            this.regenTimer.stop();
            this.regenTimer.loop(this.rate, function () {
                this.regenEnergy(this.regenRate, false);
            }, this);
            this.regenTimer.start();
        };
        /**
         * Stops the energy regen.
         */
        EnergyManager.prototype.stopEnergyRegen = function () {
            this.regenTimer.stop();
        };
        /**
         * Adds a listener to the manager for when energy is gained
         * @param callback  The function, it will get passed the amount of energy gained, and current energy
         * @param thisargs  The calling context
         */
        EnergyManager.prototype.addOnEnergyLossCallback = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.energyLossedCallbacks.push(callback);
        };
        /**
         * Removes a loss callback from the sprite
         * @param callback The callback to remove
         */
        EnergyManager.prototype.removeEnergyLossCallback = function (callback) {
            this.energyLossedCallbacks = this.energyLossedCallbacks.filter(function (e) {
                e != callback;
            });
        };
        /**
         * Adds a listener to the manager for when energy is lossed
         * @param callback  The function, it will get passed the amount of energy gained, and current energy
         * @param thisargs  The calling context
         */
        EnergyManager.prototype.addOnEnergyGainCallback = function (callback, thisargs) {
            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);
            this.energyGainedCallbacks.push(callback);
        };
        /**
         * Clears all existing callbacks
         */
        EnergyManager.prototype.clearAllCallbacks = function () {
            this.energyGainedCallbacks = new Array();
            this.energyLossedCallbacks = new Array();
        };
        /**
         * Removes a heal callback from the sprite
         * @param callback The callback to remove
         */
        EnergyManager.prototype.removeEnergyGainCallback = function (callback) {
            this.energyGainedCallbacks = this.energyGainedCallbacks.filter(function (e) {
                e != callback;
            });
        };
        /**
         * This will attempt to subtract from the energy pool and notify that the energy
         * has changed and current energy. If it fails no one will be notified and this will return false.
         * @param cost
         */
        EnergyManager.prototype.useAbility = function (cost) {
            if (this.energy - cost < 0)
                return false;
            this.energy -= cost;
            var en = this.energy;
            this.energyLossedCallbacks.forEach(function (e) { e(cost, en); });
            return true;
        };
        /**
         * You can use this to set a regen rate. Alerts the respective callbacks
         * IF energy was gained.
         * @param regenRate
         */
        EnergyManager.prototype.regenEnergy = function (regenRate, display) {
            if (!this.ent.alive)
                return;
            if (display === undefined || display === null)
                display = true;
            if (display) {
                new FloatingText(this.ent.gsm.game, {
                    text: "" + regenRate,
                    animation: this.ent.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "blue",
                        stroke: "#000000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.ent.x,
                    y: this.ent.y,
                    timeToLive: 300
                });
            }
            if (this.energy + regenRate > 100) {
                this.energy = 100;
                this.energyGainedCallbacks.forEach(function (e) { e(regenRate, 100); });
                return;
            }
            this.energy += regenRate;
            var en = this.energy;
            this.energyGainedCallbacks.forEach(function (e) { e(regenRate, en); });
        };
        /**
         * Reset the energy. This will alert the respective callbacks regardless.
         * @param display Optional parameter whether to trigger FCT. Defaults true
         */
        EnergyManager.prototype.resetEnergy = function (display) {
            if (display === undefined || display === null)
                display = true;
            this.energy = 100;
            if (display) {
                new FloatingText(this.ent.gsm.game, {
                    text: "" + 100,
                    animation: this.ent.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "blue",
                        stroke: "#000000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.ent.x,
                    y: this.ent.y,
                    timeToLive: 300
                });
            }
            this.energyGainedCallbacks.forEach(function (e) { e(100, 100); });
        };
        return EnergyManager;
    }());
    EnergyManager.REGEN_RATE = 50;
    COMBAT.EnergyManager = EnergyManager;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=EnergyManager.js.map