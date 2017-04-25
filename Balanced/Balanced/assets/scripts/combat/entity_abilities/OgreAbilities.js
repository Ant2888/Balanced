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
            var _this = this;
            if (!this.energyMan.useAbility(this.getOgre().ABILITY_ONE_COST)) {
                return false;
            }
            var ogre = this.ent;
            this.ent.facingLeft = ogre.player.x < ogre.x;
            if (this.ent.facingLeft)
                this.ent.playAnimState(ENTITIES.Entity.attackL, 10, false, false, true);
            else
                this.ent.playAnimState(ENTITIES.Entity.attackR, 10, false, false, true);
            this.ent.animations.currentAnim.onComplete.add(function () {
                _this.ent.playAnimState(_this.ent.facingLeft ? ENTITIES.Entity.idleL : ENTITIES.Entity.idleR, 1, true, true, true);
            }, this);
            return true;
        };
        return OgreAbilities;
    }(COMBAT.AbilityManager));
    COMBAT.OgreAbilities = OgreAbilities;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=OgreAbilities.js.map