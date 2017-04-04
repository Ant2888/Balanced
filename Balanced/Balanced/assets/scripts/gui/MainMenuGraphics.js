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
    var MainMenuGraphics = (function (_super) {
        __extends(MainMenuGraphics, _super);
        function MainMenuGraphics(group) {
            return _super.call(this, 200, group) || this;
        }
        MainMenuGraphics.prototype.initialize = function (gsm) {
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'mmBackground');
            this.playButton = gsm.game.add.sprite(556, 313, 'mmPlayButton');
            this.loadButton = gsm.game.add.sprite(556, 398, 'mmLoadButton');
            this.optionsHelpButton = gsm.game.add.sprite(436, 484, 'mmOptionsHelpButton');
            this.group.add(this.backgroundImage);
        };
        MainMenuGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        MainMenuGraphics.prototype.getPlayButton = function () {
            return this.playButton;
        };
        MainMenuGraphics.prototype.getLoadButton = function () {
            return this.loadButton;
        };
        MainMenuGraphics.prototype.getOptionsHelpButton = function () {
            return this.optionsHelpButton;
        };
        return MainMenuGraphics;
    }(GUI.GameObject));
    GUI.MainMenuGraphics = MainMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=MainMenuGraphics.js.map