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
    * @author Emerson
    */
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        MainMenuState.prototype.update = function () {
        };
        MainMenuState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.mainMenu = new GUI.MainMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.mainMenu);
        };
        MainMenuState.prototype.startup = function () {
            console.log("Main Menu Started.");
            // THIS WORKS
            this.mainMenu.getPlayButton(function () {
                console.log('play button was pressed');
            });
            this.mainMenu.getLoadButton(function () {
                console.log('load button was pressed');
            });
            this.mainMenu.getOptionsHelpButton(function () {
                console.log('options/help button was pressed');
            });
            // THIS DOES NOT WORK
            //this.mainMenu.getPlayButton(this.playButtonPressed());
            return true;
        };
        MainMenuState.prototype.end = function () {
            this.press.reset();
            return true;
        };
        MainMenuState.prototype.getType = function () {
            return this;
        };
        MainMenuState.prototype.playButtonPressed = function () {
            console.log('play button was pressed');
        };
        MainMenuState.prototype.loadButtonPressed = function () {
            console.log('load button was pressed');
        };
        MainMenuState.prototype.optionsHelpButtonPressed = function () {
            console.log('options/help button was pressed');
        };
        return MainMenuState;
    }(States.State));
    States.MainMenuState = MainMenuState;
})(States || (States = {}));
//# sourceMappingURL=MainMenuState.js.map