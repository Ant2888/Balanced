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
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(gsm, x, y, key, frame) {
            var _this = _super.call(this, gsm.game, x, y, key, frame) || this;
            _this.gsm = gsm;
            return _this;
        }
        return Entity;
    }(Phaser.Sprite));
    ENTITIES.Entity = Entity;
})(ENTITIES || (ENTITIES = {}));
//# sourceMappingURL=Entity.js.map