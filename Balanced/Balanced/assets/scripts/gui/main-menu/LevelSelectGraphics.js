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
    /**
    * Level Select Menu
    * @author Anthony
    */
    var LevelSelectGraphics = (function (_super) {
        __extends(LevelSelectGraphics, _super);
        function LevelSelectGraphics(group) {
            return _super.call(this, 202, group) || this;
        }
        LevelSelectGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'level_select_menu');
            this.group.add(this.backgroundImage);
            this.setOkButton(this.okButtonPressed);
        };
        // initializes the buttons
        LevelSelectGraphics.prototype.setOkButton = function (func) {
            this.okButton = this.gsm.game.add.button(0, 0, 'tutorial_btn', func, this, 0, 0, 0);
            this.group.add(this.okButton);
        };
        LevelSelectGraphics.prototype.okButtonPressed = function () {
            console.log('Tutorial selected');
            this.gsm.setState(States.PROTOTYPE_STATE);
        };
        // getters
        LevelSelectGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        LevelSelectGraphics.prototype.getOkButton = function () {
            return this.okButton;
        };
        return LevelSelectGraphics;
    }(GUI.GameObject));
    GUI.LevelSelectGraphics = LevelSelectGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=LevelSelectGraphics.js.map