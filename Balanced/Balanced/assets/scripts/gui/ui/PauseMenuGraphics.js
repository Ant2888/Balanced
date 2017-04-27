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
    var PauseMenuGraphics = (function (_super) {
        __extends(PauseMenuGraphics, _super);
        function PauseMenuGraphics(group) {
            return _super.call(this, 205, group) || this;
        }
        PauseMenuGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
        };
        PauseMenuGraphics.prototype.displayPauseMenuDialog = function () {
            this.pm_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'pm_background');
            this.pm_background.anchor.setTo(.5, .5);
            this.pm_background.fixedToCamera = true;
            this.group.add(this.pm_background);
            this.gsm.game.paused = true;
            //resume
            this.pm_resume_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 50, (this.gsm.game.height / 2) + 50, 'pm_resume_btn', function () {
                this.gsm.game.paused = true;
            }, this, 1, 0, 2);
            this.pm_resume_btn.anchor.setTo(.5, .5);
            this.pm_resume_btn.fixedToCamera = true;
            this.group.add(this.pm_resume_btn);
            //options
            this.pm_options_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 200, (this.gsm.game.height / 2) + 50, 'pm_options_btn', function () {
                // MAKE AN OPTIONS GUI FOR IN GAME
            }, this, 1, 0, 2);
            this.pm_options_btn.anchor.setTo(.5, .5);
            this.pm_options_btn.fixedToCamera = true;
            this.group.add(this.pm_options_btn);
            //main menu
            this.pm_mainmenu_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 200, (this.gsm.game.height / 2) + 50, 'pm_mainmenu_btn', function () {
                this.gsm.setState(States.MAIN_MENU_STATE);
            }, this, 1, 0, 2);
            this.pm_mainmenu_btn.anchor.setTo(.5, .5);
            this.pm_mainmenu_btn.fixedToCamera = true;
            this.group.add(this.pm_mainmenu_btn);
            //help
            this.pm_help_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 200, (this.gsm.game.height / 2) + 50, 'pm_help_btn', function () {
                this.gsm.setState(States.TOWN_STATE);
            }, this, 1, 0, 2);
            this.pm_help_btn.anchor.setTo(.5, .5);
            this.pm_help_btn.fixedToCamera = true;
            this.group.add(this.pm_help_btn);
        };
        return PauseMenuGraphics;
    }(GUI.GameObject));
    GUI.PauseMenuGraphics = PauseMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=PauseMenuGraphics.js.map