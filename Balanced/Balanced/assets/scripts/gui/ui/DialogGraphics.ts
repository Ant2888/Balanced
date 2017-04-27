module GUI {
    /**
    *This is the town gui of the game
    *
    * @author Emerson
    */
    export class DialogGraphics extends GameObject {

        // variables for the in game pause menu
        private pm_background: Phaser.Sprite;
        private pm_resume_btn: Phaser.Button;
        private pm_options_btn: Phaser.Button;
        private pm_mainmenu_btn: Phaser.Button;
        private pm_help_btn: Phaser.Button;

        // variables for the tutorial dialog
        private tut_background: Phaser.Sprite;
        private tut_yes_btn: Phaser.Button;
        private tut_no_btn: Phaser.Button;

        // variables for the death dialog
        private dd_background: Phaser.Sprite;
        private dd_menu_btn: Phaser.Button;
        private dd_town_btn: Phaser.Button;

        // reference to the gsm and the player   
        private gsm: States.GameStateManager;
        private player: ENTITIES.Player;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(205, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            if (this.player == null || this.player == undefined)
                return;

            this.puaseMenu();

            this.player.addOnDeathCallBack(function () {
                this.deathMenu();
            }, this);
        }s

        public puaseMenu(): void {
            // pause menu background
            this.pm_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'pm_background');
            this.pm_background.anchor.setTo(.5, .5);
            this.pm_background.fixedToCamera = true;
            this.group.add(this.pm_background);
            
            //resume
            this.pm_resume_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) - 80, 'pm_resume_btn', function () {
                this.togglePauseMenu();


            }, this, 1, 0, 2);

            this.pm_resume_btn.anchor.setTo(.5, .5);
            this.pm_resume_btn.fixedToCamera = true;
            this.group.add(this.pm_resume_btn);

            //options
            this.pm_options_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) - 10, 'pm_options_btn', function () {



            }, this, 1, 0, 2);
            this.pm_options_btn.anchor.setTo(.5, .5);
            this.pm_options_btn.fixedToCamera = true;
            this.group.add(this.pm_options_btn);

            //main menu
            this.pm_mainmenu_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) + 60, 'pm_mainmenu_btn', function () {
                this.togglePauseMenu();
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

            // dont show anything untill requested
            this.pm_background.exists = false;
            this.pm_help_btn.exists = false;
            this.pm_mainmenu_btn.exists = false;
            this.pm_options_btn.exists = false;
            this.pm_resume_btn.exists = false;      
        }

        public togglePauseMenu(): void {
            // if you are dead dont open the pause menu..
            if (!this.player.alive)
                return;

            this.pm_background.exists = !this.pm_background.exists;
            this.pm_help_btn.exists = !this.pm_help_btn.exists;
            this.pm_mainmenu_btn.exists = !this.pm_mainmenu_btn.exists;
            this.pm_options_btn.exists = !this.pm_options_btn.exists;
            this.pm_resume_btn.exists = !this.pm_resume_btn.exists; 

            this.gsm.game.paused = !this.gsm.game.paused;
        }

        public deathMenu(): void {
            this.dd_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'dd_background');
            this.dd_background.anchor.setTo(.5, .5);
            this.dd_background.fixedToCamera = true;
            this.group.add(this.dd_background);

            this.dd_menu_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 50, (this.gsm.game.height / 2) + 50, 'dd_menu_btn', function () {
                this.gsm.setState(States.MAIN_MENU_STATE);
            }, this, 1, 0, 2);

            this.dd_menu_btn.anchor.setTo(.5, .5);
            this.dd_menu_btn.fixedToCamera = true;
            this.group.add(this.dd_menu_btn);

            this.dd_town_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 200, (this.gsm.game.height / 2) + 50, 'dd_twn_btn', function () {
                this.gsm.setState(States.TOWN_STATE);
            }, this, 1, 0, 2);

            this.dd_town_btn.anchor.setTo(.5, .5);
            this.dd_town_btn.fixedToCamera = true;
            this.group.add(this.dd_town_btn);
        }

        public tutorialMenu(): void {
            // tut menu background
            this.tut_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'tut_background');
            this.tut_background.anchor.setTo(.5, .5);
            this.tut_background.fixedToCamera = true;
            this.group.add(this.tut_background);

            //yes
            this.tut_yes_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) - 30, 'tut_yes_btn', function () {
                this.gsm.setState(States.TOWN_TUTORIAL_STATE);
            }, this, 1, 0, 2);

            this.tut_yes_btn.anchor.setTo(.5, .5);
            this.tut_yes_btn.fixedToCamera = true;
            this.group.add(this.tut_yes_btn);

            //no
            this.tut_no_btn = this.gsm.game.add.button((this.gsm.game.width / 2), (this.gsm.game.height / 2) + 40, 'tut_no_btn', function () {
                this.gsm.setState(States.TOWN_STATE);
            }, this, 1, 0, 2);
            this.tut_no_btn.anchor.setTo(.5, .5);
            this.tut_no_btn.fixedToCamera = true;
            this.group.add(this.tut_no_btn);
                        
        }
    }
}