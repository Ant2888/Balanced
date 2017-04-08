var COMBAT;
(function (COMBAT) {
    var EnergyManager = (function () {
        function EnergyManager(ent) {
            this.ent = ent;
            this.energy = 100;
        }
        EnergyManager.prototype.useAbility = function (cost) {
            if (this.energy - cost < 0)
                return false;
            this.energy -= cost;
            return true;
        };
        EnergyManager.prototype.regenEnergy = function (regenRate) {
            if (this.energy + regenRate > 100) {
                this.energy = 100;
                return;
            }
            this.energy += regenRate;
        };
        EnergyManager.prototype.resetEnergy = function () {
            this.energy = 100;
        };
        EnergyManager.prototype.gainEnergy = function (gain) {
            if (this.energy + gain > 100) {
                this.energy = 100;
                return;
            }
            this.energy += gain;
        };
        return EnergyManager;
    }());
    COMBAT.EnergyManager = EnergyManager;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=EnergyManager.js.map