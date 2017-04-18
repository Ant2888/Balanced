module GUI {
    /**
    *This is the main menu gui of the game
    *
    * @author Emerson
    */
    export class MainMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Image;

        private playButton: Phaser.Button;
        private loadButton: Phaser.Button;
        private helpButton: Phaser.Button;
        private optionsButton: Phaser.Button;
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(200, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.backgroundImage = gsm.game.add.image(0, 0, 'mmBackground');
            this.group.add(this.backgroundImage);

            this.setPlayButton(this.playButtonPressed);
            this.setLoadButton(this.loadButtonPressed);
            this.setHelpButton(this.helpButtonPressed);
            this.setOptionsButton(this.optionsButtonPressed);
        }

        // initializes the buttons
        public setPlayButton(func: any): void {
            this.playButton = this.gsm.game.add.button(550, 280, 'mmPlayButton', func, this, 1, 0, 2);
            this.group.add(this.playButton);
        }

        public setLoadButton(func: any): void {
            this.loadButton = this.gsm.game.add.button(550, 360, 'mmLoadButton', func, this, 1, 0, 2);
            this.group.add(this.loadButton);
        }

        public setHelpButton(func: any): void {
            this.helpButton = this.gsm.game.add.button(550, 440, 'mmHelpButton', func, this, 1, 0, 2);
            this.group.add(this.helpButton);
        }

        public setOptionsButton(func: any): void {
            this.optionsButton = this.gsm.game.add.button(465, 520, 'mmOptionsButton', func, this, 1, 0, 2);
            this.group.add(this.optionsButton);
        }

        private playButtonPressed(): any {
            console.log('play button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        }

        private loadButtonPressed(): any {
            console.log('load button was pressed');
        }

        private helpButtonPressed(): any {
            console.log('help button was pressed');
            this.gsm.setState(States.HELP_MENU_STATE);
        }

        private optionsButtonPressed(): any {
            console.log('options button was pressed');
            this.gsm.setState(States.OPTIONS_MENU_STATE);
        }

        // getters
        public getBackgroundImage(): Phaser.Image {
            return this.backgroundImage;
        }

        public getPlayButton(): Phaser.Button {
            return this.playButton;
        }

        public getLoadButton(): Phaser.Button {
            return this.loadButton;
        }

        public getHelpButton(): Phaser.Button {
            return this.helpButton;
        }

        public getOptionsButton(): Phaser.Button {
            return this.optionsButton;
        }
    }
}