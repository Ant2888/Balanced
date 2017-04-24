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
     * @author Anthony, Emerson
     */
    var LevelSelectState = (function (_super) {
        __extends(LevelSelectState, _super);
        function LevelSelectState(gsm) {
            return _super.call(this, gsm) || this;
        }
        LevelSelectState.prototype.update = function () {
        };
        LevelSelectState.prototype.init = function () {
            this.gsm.musicBox.addSound('Hover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('Unhover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickDown', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickLetGo', UTIL.MENU_SFX);
            var group = this.gsm.game.add.group();
            this.selMenu = new GUI.LevelSelectGraphics(group);
            this.gsm.getGUIM().addGroup(this.selMenu);
        };
        LevelSelectState.prototype.startup = function () {
            var btn1 = this.selMenu.getLevel1();
            btn1.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn1.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn1.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn1.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn2 = this.selMenu.getLevel2();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn3 = this.selMenu.getLevel3();
            btn3.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn3.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn3.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn3.setOverSound(this.gsm.musicBox.findSound('Hover'));
            var btn4 = this.selMenu.getCancelButton();
            btn4.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn4.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn4.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn4.setOverSound(this.gsm.musicBox.findSound('Hover'));
            return true;
        };
        LevelSelectState.prototype.end = function () {
            this.gsm.musicBox.stopAll();
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