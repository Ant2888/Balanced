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
var ENTITIES;
(function (ENTITIES) {
    /**
     * This is just a test of the baddie entities
     * @author Anthony
     */
    var Baddie = (function (_super) {
        __extends(Baddie, _super);
        function Baddie(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm, x, y, key, frame) || this;
            //this.abm = new COMBAT.PlayerAbilities(this, gsm);
            _this.addOnDeathCallBack(function () { this.kill(); }, _this);
            return _this;
        }
        Baddie.prototype.dealWithOverlap = function (player, me) {
            if (!this.stunned) {
                var damage = this.randomValWithRandomness(15, 15);
                player.dealDamage(damage, damage > (damage + 7.5), 'red', true, true, 1000, {}, this.facingLeft);
            }
        };
        Baddie.prototype.createAnimations = function () { };
        return Baddie;
    }(ENTITIES.Entity));
    ENTITIES.Baddie = Baddie;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Baddie.js.map