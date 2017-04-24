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
    *This is the help menu gui of the game
    *
    * @author Emerson
    */
    var HelpMenuGraphics = (function (_super) {
        __extends(HelpMenuGraphics, _super);
        function HelpMenuGraphics(group) {
            return _super.call(this, 202, group) || this;
        }
        HelpMenuGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'hmBackground');
            this.group.add(this.backgroundImage);
            this.setOkButton(this.okButtonPressed);
        };
        // initializes the buttons
        HelpMenuGraphics.prototype.setOkButton = function (func) {
            this.okButton = this.gsm.game.add.button(570, 550, 'hmOkButton', func, this, 1, 0, 2);
            this.group.add(this.okButton);
        };
        HelpMenuGraphics.prototype.okButtonPressed = function () {
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        // getters
        HelpMenuGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        HelpMenuGraphics.prototype.getOkButton = function () {
            return this.okButton;
        };
        return HelpMenuGraphics;
    }(GUI.GameObject));
    GUI.HelpMenuGraphics = HelpMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=HelpMenuGraphics.js.map