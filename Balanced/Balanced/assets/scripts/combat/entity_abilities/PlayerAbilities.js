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
var COMBAT;
(function (COMBAT) {
    /**
     * Simple ability class
     * @author Anthony
     */
    var PlayerAbilities = (function (_super) {
        __extends(PlayerAbilities, _super);
        function PlayerAbilities(ent, energyMan, gsm) {
            return _super.call(this, ent, energyMan, gsm) || this;
        }
        PlayerAbilities.prototype.attemptCast = function (ability) {
            switch (ability) {
                case 1:
                    return this.castAbilityOne();
                case 2:
                    return this.castAbilityTwo();
                case 3:
                    return this.castAbilityThree();
                case 4:
                    return this.castAbilityFour();
                default:
                    return false;
            }
        };
        PlayerAbilities.prototype.castAbilityOne = function () {
            return false;
        };
        PlayerAbilities.prototype.castAbilityTwo = function () {
            return false;
        };
        PlayerAbilities.prototype.castAbilityThree = function () {
            return false;
        };
        PlayerAbilities.prototype.castAbilityFour = function () {
            return false;
        };
        return PlayerAbilities;
    }(COMBAT.AbilityManager));
    COMBAT.PlayerAbilities = PlayerAbilities;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=PlayerAbilities.js.map