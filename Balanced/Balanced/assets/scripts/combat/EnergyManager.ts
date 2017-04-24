module COMBAT {
    /**
     * This class will represent the energy of any entity. You can limit ability usage
     * through this or ignore it.
     * @author Anthony
     */
    export class EnergyManager {

        private ent: ENTITIES.Entity;
        public energy: number;

        public static REGEN_RATE = 50;

        protected gsm: States.GameStateManager;
        protected regenRate: number;
        protected rate: number;
        protected regenTimer: Phaser.Timer;
        protected energyGainedCallbacks: any[];
        protected energyLossedCallbacks: any[];

        constructor(gsm: States.GameStateManager, ent: ENTITIES.Entity, regenRate?: number,
            rate?: number) {
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
        public restartEnergyRegen(): void {
            this.regenTimer.stop();
            this.regenTimer.loop(this.rate, function () {
                this.regenEnergy(this.regenRate, false);
            }, this);
            this.regenTimer.start();
        }

        /**
         * Stops the energy regen.
         */
        public stopEnergyRegen(): void {
            this.regenTimer.stop();
        }

        /**
         * Adds a listener to the manager for when energy is gained
         * @param callback  The function, it will get passed the amount of energy gained, and current energy
         * @param thisargs  The calling context
         */
        public addOnEnergyLossCallback(callback: any, thisargs?: any): void {

            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);

            this.energyLossedCallbacks.push(callback);
        }

        /**
         * Removes a loss callback from the sprite
         * @param callback The callback to remove
         */
        public removeEnergyLossCallback(callback: any) {
            this.energyLossedCallbacks = this.energyLossedCallbacks.filter(function (e) {
                e != callback;
            });
        }

        /**
         * Adds a listener to the manager for when energy is lossed
         * @param callback  The function, it will get passed the amount of energy gained, and current energy
         * @param thisargs  The calling context
         */
        public addOnEnergyGainCallback(callback: any, thisargs?: any): void {

            if (thisargs !== undefined && thisargs !== null)
                callback = callback.bind(thisargs);

            this.energyGainedCallbacks.push(callback);
        }

        /**
         * Clears all existing callbacks
         */
        public clearAllCallbacks(): void {
            this.energyGainedCallbacks = new Array();
            this.energyLossedCallbacks = new Array();
        }

        /**
         * Removes a heal callback from the sprite
         * @param callback The callback to remove
         */
        public removeEnergyGainCallback(callback: any) {
            this.energyGainedCallbacks = this.energyGainedCallbacks.filter(function (e) {
                e != callback;
            });
        }

        /**
         * This will attempt to subtract from the energy pool and notify that the energy
         * has changed and current energy. If it fails no one will be notified and this will return false.
         * @param cost
         */
        public useAbility(cost: number): boolean {
            if (this.energy - cost < 0)
                return false;

            this.energy -= cost;

            var en = this.energy;
            this.energyLossedCallbacks.forEach(function (e) { e(cost, en) });

            return true;
        }

        /**
         * You can use this to set a regen rate. Alerts the respective callbacks
         * IF energy was gained.
         * @param regenRate
         */
        public regenEnergy(regenRate: number, display?: boolean): void {

            if (display === undefined || display === null)
                display = true;

            if (display) {
                new FloatingText(this.ent.gsm.game, <FloatingText.Options>{
                    text: "" + regenRate,
                    animation: this.ent.getRandomEffect(),
                    textOptions: <FloatingText.TextOptions>{
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
                this.energyGainedCallbacks.forEach(function (e) { e(regenRate, 100) });
                return;
            }

            this.energy += regenRate;
            var en = this.energy;
            this.energyGainedCallbacks.forEach(function (e) { e(regenRate, en) });
        }

        /**
         * Reset the energy. This will alert the respective callbacks regardless.
         * @param display Optional parameter whether to trigger FCT. Defaults true
         */
        public resetEnergy(display?: boolean): void {

            if (display === undefined || display === null)
                display = true;

            this.energy = 100;

            if (display) {
                new FloatingText(this.ent.gsm.game, <FloatingText.Options>{
                    text: ""+100,
                    animation: this.ent.getRandomEffect(),
                    textOptions: <FloatingText.TextOptions>{
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

            this.energyGainedCallbacks.forEach(function (e) { e(100, 100) });
        }
    }
}