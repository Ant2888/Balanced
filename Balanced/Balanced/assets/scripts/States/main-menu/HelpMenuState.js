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
    *This is the help menu of the game
    *
    * @author Emerson
    */
    var HelpMenuState = (function (_super) {
        __extends(HelpMenuState, _super);
        function HelpMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        HelpMenuState.prototype.update = function () {
        };
        HelpMenuState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.helpMenu = new GUI.HelpMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.helpMenu);
        };
        HelpMenuState.prototype.startup = function () {
            console.log("Help Menu Started.");
            this.helpMenu.setOkButton(this.okButtonPressed);
            return true;
        };
        HelpMenuState.prototype.end = function () {
            return true;
        };
        HelpMenuState.prototype.getType = function () {
            return this;
        };
        HelpMenuState.prototype.okButtonPressed = function () {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        return HelpMenuState;
    }(States.State));
    States.HelpMenuState = HelpMenuState;
})(States || (States = {}));
//# sourceMappingURL=HelpMenuState.js.map