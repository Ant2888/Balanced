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
    var TownState = (function (_super) {
        __extends(TownState, _super);
        function TownState(gsm) {
            return _super.call(this, gsm) || this;
        }
        TownState.prototype.update = function () {
        };
        TownState.prototype.init = function () {
            this.gsm.musicBox.addSound('dark_loop');
            var group = this.gsm.game.add.group();
            this.townGraphics = new GUI.TownGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);
        };
        TownState.prototype.startup = function () {
            this.gsm.musicBox.playByID('dark_loop', undefined, undefined, .2, true, false);
            console.log("Town state started");
            this.setupKeybinds(this);
            return true;
        };
        TownState.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.V) {
                    data.gsm.setState(States.LEVEL1_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.B) {
                    data.gsm.setState(States.LEVEL2_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.H) {
                    data.gsm.setState(States.LEVEL3_STATE);
                }
            };
        };
        TownState.prototype.end = function () {
            this.gsm.musicBox.stopByID('dark_loop');
            return true;
        };
        TownState.prototype.getType = function () {
            return this;
        };
        return TownState;
    }(States.State));
    States.TownState = TownState;
})(States || (States = {}));
//# sourceMappingURL=TownState.js.map