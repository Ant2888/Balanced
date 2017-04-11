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
var States;
(function (States) {
    /**
     * Level Sel state
     * @author Anthony
     */
    var LevelSelectState = (function (_super) {
        __extends(LevelSelectState, _super);
        function LevelSelectState(gsm) {
            return _super.call(this, gsm) || this;
        }
        LevelSelectState.prototype.update = function () {
        };
        LevelSelectState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.selMenu = new GUI.LevelSelectGraphics(group);
            this.gsm.getGUIM().addGroup(this.selMenu);
        };
        LevelSelectState.prototype.startup = function () {
            console.log("Level Select Started.");
            return true;
        };
        LevelSelectState.prototype.end = function () {
            return true;
        };
        LevelSelectState.prototype.getType = function () {
            return this;
        };
        return LevelSelectState;
    }(States.State));
    States.LevelSelectState = LevelSelectState;
})(States || (States = {}));
//# sourceMappingURL=LevelSelectState.js.map