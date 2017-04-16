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
    var PlayerAbilityManager = (function (_super) {
        __extends(PlayerAbilityManager, _super);
        function PlayerAbilityManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PlayerAbilityManager;
    }(COMBAT.AbilityManager));
    COMBAT.PlayerAbilityManager = PlayerAbilityManager;
})(COMBAT || (COMBAT = {}));
//# sourceMappingURL=PlayerAbilityManager.js.map