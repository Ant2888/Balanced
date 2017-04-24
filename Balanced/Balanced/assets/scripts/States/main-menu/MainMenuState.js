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
    *This is the main menu of the game
    *
    * @author Emerson, Anthony
    */
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        MainMenuState.prototype.update = function () {
        };
        MainMenuState.prototype.init = function () {
            this.gsm.musicBox.addSound('Hover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('Unhover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickDown', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickLetGo', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('dark_intro', UTIL.MENU_SFX);
            var group = this.gsm.game.add.group();
            this.mainMenu = new GUI.MainMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.mainMenu);
        };
        MainMenuState.prototype.startup = function () {
            this.gsm.musicBox.playByID('dark_intro', undefined, undefined, .4, true, false);
            var btn1 = this.mainMenu.getHelpButton();
            btn1.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn1.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn1.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn1.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn2 = this.mainMenu.getLoadButton();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn3 = this.mainMenu.getOptionsButton();
            btn3.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn3.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn3.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn3.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn4 = this.mainMenu.getPlayButton();
            btn4.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn4.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn4.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn4.setOverSound(this.gsm.musicBox.findSound('Hover'));
            return true;
        };
        MainMenuState.prototype.end = function () {
            this.gsm.musicBox.stopByID('dark_intro');
            return true;
        };
        MainMenuState.prototype.getType = function () {
            return this;
        };
        return MainMenuState;
    }(States.State));
    States.MainMenuState = MainMenuState;
})(States || (States = {}));
//# sourceMappingURL=MainMenuState.js.map