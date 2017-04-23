var COMBAT;
(function (COMBAT) {
    /**
     * ABM is used to control all abilities for a given entity
     * @author Anthony
     */
    var AbilityManager = (function () {
        function AbilityManager(ent, gsm, energyMan) {
            this.ent = ent;
            if (energyMan === undefined || energyMan === null)
                energyMan = new COMBAT.EnergyManager(gsm, ent);
            this.energyMan = energyMan;
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