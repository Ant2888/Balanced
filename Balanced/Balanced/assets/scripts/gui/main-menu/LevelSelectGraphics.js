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
    *This is the level select menu gui of the game
    *
    * @author Emerson
    */
    var LevelSelectGraphics = (function (_super) {
        __extends(LevelSelectGraphics, _super);
        function LevelSelectGraphics(group) {
            return _super.call(this, 203, group) || this;
        }
        LevelSelectGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'ls_background');
            this.group.add(this.backgroundImage);
            this.setLevel1Button(this.level1ButtonPressed);
            this.setLevel2Button(this.level2ButtonPressed);
            this.setLevel3Button(this.level3ButtonPressed);
            this.setCancelButton(this.cancelButtonPressed);
        };
        // initializes the buttons
        LevelSelectGraphics.prototype.setLevel1Button = function (func) {
            this.level1Button = this.gsm.game.add.button(500, 250, 'ls_level1_btn', func, this, 1, 0, 2);
            this.group.add(this.level1Button);
        };
        LevelSelectGraphics.prototype.setLevel2Button = function (func) {
            this.level2Button = this.gsm.game.add.button(500, 350, 'ls_level2_btn', func, this, 1, 0, 2);
            this.group.add(this.level2Button);
        };
        LevelSelectGraphics.prototype.setLevel3Button = function (func) {
            this.level3Button = this.gsm.game.add.button(500, 450, 'ls_level3_btn', func, this, 1, 0, 2);
            this.group.add(this.level3Button);
        };
        LevelSelectGraphics.prototype.setCancelButton = function (func) {
            this.cancelButton = this.gsm.game.add.button(500, 606, 'omCancelButton', func, this, 1, 0, 2);
            this.group.add(this.cancelButton);
        };
        LevelSelectGraphics.prototype.level1ButtonPressed = function () {
            console.log('Level 1 selected');
            this.gsm.setState(States.PROTOTYPE_STATE);
        };
        LevelSelectGraphics.prototype.level2ButtonPressed = function () {
            console.log('Level 2 selected');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        LevelSelectGraphics.prototype.level3ButtonPressed = function () {
            console.log('Level 3 selected');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        LevelSelectGraphics.prototype.cancelButtonPressed = function () {
            console.log('cancel button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        };
        // getters
        LevelSelectGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        LevelSelectGraphics.prototype.getLevel1 = function () {
            return this.level1Button;
        };
        LevelSelectGraphics.prototype.getLevel2 = function () {
            return this.level2Button;
        };
        LevelSelectGraphics.prototype.getLevel3 = function () {
            return this.level3Button;
        };
        LevelSelectGraphics.prototype.getCancelButton = function () {
            return this.cancelButton;
        };
        return LevelSelectGraphics;
    }(GUI.GameObject));
    GUI.LevelSelectGraphics = LevelSelectGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=LevelSelectGraphics.js.map