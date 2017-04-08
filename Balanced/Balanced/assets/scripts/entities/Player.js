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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(gsm, x, y, abilities, energy, key, frame) {
            return _super.call(this, gsm, x, y, abilities, energy, key, frame) || this;
        }
        return Player;
    }(ENTITIES.Entity));
    ENTITIES.Player = Player;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Player.js.map