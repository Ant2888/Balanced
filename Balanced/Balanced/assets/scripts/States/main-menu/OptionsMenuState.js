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
    *This is the options menu of the game
    *
    * @author Emerson, Anthony
    */
    var OptionsMenuState = (function (_super) {
        __extends(OptionsMenuState, _super);
        function OptionsMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        OptionsMenuState.prototype.update = function () {
        };
        OptionsMenuState.prototype.init = function () {
            this.gsm.musicBox.addSound('Hover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('Unhover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickDown', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickLetGo', UTIL.MENU_SFX);
            var group = this.gsm.game.add.group();
            this.optionsMenu = new GUI.OptionsMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.optionsMenu);
        };
        OptionsMenuState.prototype.startup = function () {
            var btn1 = this.optionsMenu.getCancelButton();
            btn1.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn1.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn1.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn1.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn2 = this.optionsMenu.getOkButton();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));
            return true;
        };
        OptionsMenuState.prototype.end = function () {
            return true;
        };
        OptionsMenuState.prototype.getType = function () {
            return this;
        };
        return OptionsMenuState;
    }(States.State));
    States.OptionsMenuState = OptionsMenuState;
})(States || (States = {}));
//# sourceMappingURL=OptionsMenuState.js.map