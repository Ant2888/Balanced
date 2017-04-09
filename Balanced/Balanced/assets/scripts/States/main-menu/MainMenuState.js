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
            return true;
        };
        MainMenuState.prototype.end = function () {
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