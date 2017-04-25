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
     * Simple ability class for the ogre
     * @author Anthony
     */
    var OgreAbilities = (function (_super) {
        __extends(OgreAbilities, _super);
        function OgreAbilities(ent, gsm, energyMan) {
            return _super.call(this, ent, gsm, energyMan) || this;
        }
        OgreAbilities.prototype.attemptCast = function (ability) {
            return this.castAbilityOne();
        };
        OgreAbilities.prototype.getOgre = function () {
            return this.ent;
        };
        OgreAbilities.prototype.castAbilityOne = function () {
            if (!this.energyMan.useAbility(this.getOgre().ABILITY_ONE_COST)) {
                return false;
            }
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, this.getOgre().ATTACK_SPEED, false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, this.getOgre().ATTACK_SPEED, false, false, true);
            return true;
        };
        return OgreAbilities;
    }(COMBAT.AbilityManager));
    COMBAT.OgreAbilities = OgreAbilities;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=OgreAbilities.js.map