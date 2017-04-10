var COMBAT;
(function (COMBAT) {
    var AbilityManager = (function () {
        function AbilityManager(ent, energyMan, gsm) {
            this.ent = ent;
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