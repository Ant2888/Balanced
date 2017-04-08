var COMBAT;
(function (COMBAT) {
    var AbilityManager = (function () {
        function AbilityManager(ent, energyMan, gsm) {
            this.ent = ent;
            this.energyMan = energyMan;
            this.gsm = gsm;
        }
        return AbilityManager;
    }());
    COMBAT.AbilityManager = AbilityManager;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=AbilityManager.js.map