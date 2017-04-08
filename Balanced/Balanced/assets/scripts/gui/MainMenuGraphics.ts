module GUI {
    /**
    *This is the main menu gui of the game
    *
    * @author Emerson
    */
    export class MainMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite

        private playButton: Phaser.Button
        private loadButton: Phaser.Button
        private helpButton: Phaser.Button
        private optionsButton: Phaser.Button
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(200, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.backgroundImage = gsm.game.add.sprite(0, 0, 'mmBackground');
            this.group.add(this.backgroundImage);
        }

        // initializes the button when the gui is loaded
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

        // getters
        public getBackgroundImage(): Phaser.Sprite {
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