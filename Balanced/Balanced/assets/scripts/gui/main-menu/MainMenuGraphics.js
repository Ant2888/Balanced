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
    *This is the main menu gui of the game
    *
    * @author Emerson
    */
    var MainMenuGraphics = (function (_super) {
        __extends(MainMenuGraphics, _super);
        function MainMenuGraphics(group) {
            return _super.call(this, 200, group) || this;
        }
        MainMenuGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.image(0, 0, 'mmBackground');
            this.group.add(this.backgroundImage);
            this.setPlayButton(this.playButtonPressed);
            this.setLoadButton(this.loadButtonPressed);
            this.setHelpButton(this.helpButtonPressed);
            this.setOptionsButton(this.optionsButtonPressed);
        };
        // initializes the buttons
        MainMenuGraphics.prototype.setPlayButton = function (func) {
            this.playButton = this.gsm.game.add.button(550, 280, 'mmPlayButton', func, this, 1, 0, 2);
            this.group.add(this.playButton);
        };
        MainMenuGraphics.prototype.setLoadButton = function (func) {
            this.loadButton = this.gsm.game.add.button(550, 360, 'mmLoadButton', func, this, 1, 0, 2);
            this.group.add(this.loadButton);
        };
        MainMenuGraphics.prototype.setHelpButton = function (func) {
            this.helpButton = this.gsm.game.add.button(550, 440, 'mmHelpButton', func, this, 1, 0, 2);
            this.group.add(this.helpButton);
        };
        MainMenuGraphics.prototype.setOptionsButton = function (func) {
            this.optionsButton = this.gsm.game.add.button(465, 520, 'mmOptionsButton', func, this, 1, 0, 2);
            this.group.add(this.optionsButton);
        };
        MainMenuGraphics.prototype.playButtonPressed = function () {
            console.log('play button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        };
        MainMenuGraphics.prototype.loadButtonPressed = function () {
            console.log('load button was pressed');
        };
        MainMenuGraphics.prototype.helpButtonPressed = function () {
            console.log('help button was pressed');
            this.gsm.setState(States.HELP_MENU_STATE);
        };
        MainMenuGraphics.prototype.optionsButtonPressed = function () {
            console.log('options button was pressed');
            this.gsm.setState(States.OPTIONS_MENU_STATE);
        };
        // getters
        MainMenuGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        MainMenuGraphics.prototype.getPlayButton = function () {
            return this.playButton;
        };
        MainMenuGraphics.prototype.getLoadButton = function () {
            return this.loadButton;
        };
        MainMenuGraphics.prototype.getHelpButton = function () {
            return this.helpButton;
        };
        MainMenuGraphics.prototype.getOptionsButton = function () {
            return this.optionsButton;
        };
        return MainMenuGraphics;
    }(GUI.GameObject));
    GUI.MainMenuGraphics = MainMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=MainMenuGraphics.js.map