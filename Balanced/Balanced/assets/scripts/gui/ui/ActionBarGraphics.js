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
var GUI;
(function (GUI) {
    var ActionBarGraphics = (function (_super) {
        __extends(ActionBarGraphics, _super);
        function ActionBarGraphics(group) {
            return _super.call(this, 0, group) || this;
        }
        ActionBarGraphics.prototype.initialize = function (gsm) {
            this.box = gsm.game.add.sprite(150, 150, 'logo2');
            this.group.add(this.box);
        };
        ActionBarGraphics.prototype.getBox = function () {
            return this.box;
        };
        ActionBarGraphics.prototype.setBox = function (num) {
            this.box.x = num;
        };
        return ActionBarGraphics;
    }(GUI.GameObject));
    GUI.ActionBarGraphics = ActionBarGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=ActionBarGraphics.js.map