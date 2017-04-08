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
    *This is the options menu gui of the game
    *
    * @author Emerson
    */
    var OptionsMenuGraphics = (function (_super) {
        __extends(OptionsMenuGraphics, _super);
        function OptionsMenuGraphics(group) {
            return _super.call(this, 201, group) || this;
        }
        OptionsMenuGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'omBackground');
            this.group.add(this.backgroundImage);
        };
        // initializes the button when the gui is loaded
        OptionsMenuGraphics.prototype.setOkButton = function (func) {
            this.okButton = this.gsm.game.add.button(360, 606, 'omOkButton', func, this, 1, 0, 2);
        };
        OptionsMenuGraphics.prototype.setCancelButton = function (func) {
            this.cancelButton = this.gsm.game.add.button(600, 606, 'omCancelButton', func, this, 1, 0, 2);
        };
        // getters
        OptionsMenuGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        OptionsMenuGraphics.prototype.getOkButton = function () {
            return this.okButton;
        };
        OptionsMenuGraphics.prototype.getCancelButton = function () {
            return this.cancelButton;
        };
        return OptionsMenuGraphics;
    }(GUI.GameObject));
    GUI.OptionsMenuGraphics = OptionsMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=OptionsMenuGraphics.js.map