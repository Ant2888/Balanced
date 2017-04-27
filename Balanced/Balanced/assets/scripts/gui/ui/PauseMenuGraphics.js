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
    var DialogGraphics = (function (_super) {
        __extends(DialogGraphics, _super);
        function DialogGraphics(group, player) {
            var _this = _super.call(this, 205, group) || this;
            _this.player = player;
            return _this;
        }
        DialogGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.background = false;
            this.resume = false;
            this.options = false;
            this.mainmenu = false;
            this.help = false;
            this.isPaused = false;
            this.pm_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'pm_background');
            this.pm_background.anchor.setTo(.5, .5);
            this.pm_background.fixedToCamera = true;
            this.group.add(this.pm_background);
            //resume
            this.pm_resume_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) - 80, 'pm_resume_btn', function () {
                this.togglePauseMenuDialog();
            }, this, 1, 0, 2);
            this.pm_resume_btn.anchor.setTo(.5, .5);
            this.pm_resume_btn.fixedToCamera = true;
            this.group.add(this.pm_resume_btn);
            //options
            this.pm_options_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) - 10, 'pm_options_btn', function () {
                // MAKE AN OPTIONS GUI FOR IN GAME
            }, this, 1, 0, 2);
            this.pm_options_btn.anchor.setTo(.5, .5);
            this.pm_options_btn.fixedToCamera = true;
            this.group.add(this.pm_options_btn);
            //main menu
            this.pm_mainmenu_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) + 60, 'pm_mainmenu_btn', function () {
                this.gsm.game.paused = false;
                this.gsm.setState(States.MAIN_MENU_STATE);
            }, this, 1, 0, 2);
            this.pm_mainmenu_btn.anchor.setTo(.5, .5);
            this.pm_mainmenu_btn.fixedToCamera = true;
            this.group.add(this.pm_mainmenu_btn);
            //help
            this.pm_help_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) + 130, 'pm_help_btn', function () {
            }, this, 1, 0, 2);
            this.pm_help_btn.anchor.setTo(.5, .5);
            this.pm_help_btn.fixedToCamera = true;
            this.group.add(this.pm_help_btn);
            this.togglePauseMenuDialog();
            this.gsm.game.paused = false;
        };
        DialogGraphics.prototype.togglePauseMenuDialog = function () {
            this.pm_background.exists = this.background;
            this.pm_resume_btn.exists = this.resume;
            this.pm_options_btn.exists = this.options;
            this.pm_mainmenu_btn.exists = this.mainmenu;
            this.pm_help_btn.exists = this.help;
            this.background = !this.background;
            this.resume = !this.resume;
            this.options = !this.options;
            this.mainmenu = !this.mainmenu;
            this.help = !this.help;
            this.gsm.game.paused = !this.gsm.game.paused;
        };
        DialogGraphics.prototype.createBackground = function () {
        };
        return DialogGraphics;
    }(GUI.GameObject));
    GUI.DialogGraphics = DialogGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=PauseMenuGraphics.js.map