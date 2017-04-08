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
    *This is the options menu of the game
    *
    * @author Emerson
    */
    var OptionsMenuState = (function (_super) {
        __extends(OptionsMenuState, _super);
        function OptionsMenuState(gsm) {
            return _super.call(this, gsm) || this;
        }
        OptionsMenuState.prototype.update = function () {
        };
        OptionsMenuState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.optionsMenu = new GUI.OptionsMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.optionsMenu);
        };
        OptionsMenuState.prototype.startup = function () {
            console.log("Main Menu Started.");
            this.optionsMenu.setOkButton(this.okButtonPressed);
            this.optionsMenu.setCancelButton(this.cancelButtonPressed);
            return true;
        };
        OptionsMenuState.prototype.end = function () {
            return true;
        };
        OptionsMenuState.prototype.getType = function () {
            return this;
        };
        OptionsMenuState.prototype.okButtonPressed = function () {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        OptionsMenuState.prototype.cancelButtonPressed = function () {
            console.log('cancel button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        return OptionsMenuState;
    }(States.State));
    States.OptionsMenuState = OptionsMenuState;
})(States || (States = {}));
//# sourceMappingURL=OptionsMenuState.js.map