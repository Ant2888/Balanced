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
    *This is the help menu of the game
    *
    * @author Emerson, Anthony
    */
    var HelpMenuState = (function (_super) {
        __extends(HelpMenuState, _super);
        function HelpMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        HelpMenuState.prototype.update = function () {
        };
        HelpMenuState.prototype.init = function () {
            this.gsm.musicBox.addSound('Hover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('Unhover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickDown', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickLetGo', UTIL.MENU_SFX);
            var group = this.gsm.game.add.group();
            this.helpMenu = new GUI.HelpMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.helpMenu);
        };
        HelpMenuState.prototype.startup = function () {
            var btn = this.helpMenu.getOkButton();
            btn.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn.setOverSound(this.gsm.musicBox.findSound('Hover'));
            this.setupKeybinds(this);
            return true;
        };
        HelpMenuState.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.V) {
                    data.gsm.setState(States.LEVEL1_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.B) {
                    data.gsm.setState(States.LEVEL2_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.G) {
                    data.gsm.setState(States.LEVEL3_STATE);
                }
            };
        };
        HelpMenuState.prototype.end = function () {
            return true;
        };
        HelpMenuState.prototype.getType = function () {
            return this;
        };
        return HelpMenuState;
    }(States.State));
    States.HelpMenuState = HelpMenuState;
})(States || (States = {}));
//# sourceMappingURL=HelpMenuState.js.map