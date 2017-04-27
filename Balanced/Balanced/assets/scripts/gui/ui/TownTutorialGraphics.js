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
    *This is the town gui of the game
    *
    * @author Emerson
    */
    var TownTutorialGraphics = (function (_super) {
        __extends(TownTutorialGraphics, _super);
        function TownTutorialGraphics(group) {
            var _this = _super.call(this, 206, group) || this;
            _this.done = false;
            return _this;
        }
        TownTutorialGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.tut_screen2 = gsm.game.add.sprite(0, 0, 'tut_screen2');
            this.tut_screen = gsm.game.add.sprite(0, 0, 'tut_screen1');
            this.group.add(this.tut_screen2);
            this.group.add(this.tut_screen);
            this.setNextButton(this.nextButtonPressed);
        };
        // initializes the buttons
        TownTutorialGraphics.prototype.setNextButton = function (func) {
            this.next = this.gsm.game.add.button(1030, 660, 'tut_next_btn', func, this, 1, 0, 2);
            this.group.add(this.next);
        };
        TownTutorialGraphics.prototype.nextButtonPressed = function () {
            console.log('next button pressed');
            this.tut_screen.exists = false;
            if (this.done) {
                this.gsm.setState(States.TOWN_STATE);
            }
            this.done = true;
        };
        return TownTutorialGraphics;
    }(GUI.GameObject));
    GUI.TownTutorialGraphics = TownTutorialGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=TownTutorialGraphics.js.map