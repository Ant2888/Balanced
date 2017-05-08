module GUI {
    /**
    *This is the main menu gui of the game
    *
    * @author Emerson
    */
    export class MainMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Image;

        private playButton: Phaser.Button;
        private creditButton: Phaser.Button;
        private controlesButton: Phaser.Button;
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(200, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.backgroundImage = gsm.game.add.image(0, 0, 'mmBackground');
            this.group.add(this.backgroundImage);

            this.setPlayButton(this.playButtonPressed);
            this.setControlesButton(this.optionsButtonPressed);
            this.setCreditButton(this.loadButtonPressed);
        }

        // initializes the buttons
        public setPlayButton(func: any): void {
            this.playButton = this.gsm.game.add.button(265, 260, 'mmPlayButton', func, this, 1, 0, 2);
            this.group.add(this.playButton);
        }

        public setCreditButton(func: any): void {
            this.creditButton = this.gsm.game.add.button(265, 490, 'mmCreditButton', func, this, 1, 0, 2);
            this.group.add(this.creditButton);
        }        

        public setControlesButton(func: any): void {
            this.controlesButton = this.gsm.game.add.button(265, 380, 'mmControlesButton', func, this, 1, 0, 2);
            this.group.add(this.controlesButton);
        }

        private playButtonPressed(): any {
            console.log('play button was pressed');
            this.gsm.musicBox.stopByID('dark_intro');   
            this.gsm.setState(States.TOWN_STATE);
        }

        private loadButtonPressed(): any {
            console.log('load button was pressed');
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

        public getCreditButton(): Phaser.Button {
            return this.creditButton;
        }

        public getControlesButton(): Phaser.Button {
            return this.controlesButton;
        }
    }
}