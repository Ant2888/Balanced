var COMBAT;
(function (COMBAT) {
    var AbilityManager = (function () {
        function AbilityManager(ent, gsm, energyMan) {
            this.ent = ent;
            if (energyMan === undefined || energyMan === null)
                energyMan = new COMBAT.EnergyManager(ent);
            this.gsm = gsm;
        }
        AbilityManager.prototype.getEnergyManager = function () {
            return this.energyMan;
        };
        return AbilityManager;
    }());
    COMBAT.AbilityManager = AbilityManager;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=AbilityManager.js.map