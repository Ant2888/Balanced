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
    /*
    @author Emerson
    */
    var TownTutorialState = (function (_super) {
        __extends(TownTutorialState, _super);
        function TownTutorialState(gsm) {
            return _super.call(this, gsm) || this;
        }
        TownTutorialState.prototype.update = function () {
        };
        TownTutorialState.prototype.init = function () {
            this.gsm.musicBox.addSound('dark_loop');
            var group = this.gsm.game.add.group();
            this.townGraphics = new GUI.TownGraphics(group);
            this.tutGrahpics = new GUI.TownTutorialGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);
            this.gsm.getGUIM().addGroup(this.tutGrahpics);
        };
        TownTutorialState.prototype.startup = function () {
            this.gsm.musicBox.playByID('dark_loop', undefined, undefined, .2, true, false);
            console.log("Town state started");
            return true;
        };
        TownTutorialState.prototype.setupKeybinds = function (data) {
        };
        TownTutorialState.prototype.end = function () {
            this.gsm.musicBox.stopByID('dark_loop');
            return true;
        };
        TownTutorialState.prototype.getType = function () {
            return this;
        };
        return TownTutorialState;
    }(States.State));
    States.TownTutorialState = TownTutorialState;
})(States || (States = {}));
//# sourceMappingURL=TownTutorialState.js.map