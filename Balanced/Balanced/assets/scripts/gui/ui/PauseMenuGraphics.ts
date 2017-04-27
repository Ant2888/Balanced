module GUI {
    /**
    *This is the town gui of the game
    *
    * @author Emerson
    */
    export class PauseMenuGraphics extends GameObject {

        private pm_background: Phaser.Sprite;

        private resume: Phaser.Button;
        private pm_help_btn: Phaser.Button;
        private pm_mainmenu_btn: Phaser.Button;
        private pm_options_btn: Phaser.Button;
        private pm_resume_btn: Phaser.Button;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(205, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

        }

        public displayPauseMenuDialog(): void {            
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
        }
            
    }
}