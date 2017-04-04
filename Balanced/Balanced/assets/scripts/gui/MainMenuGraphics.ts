module GUI {
    export class MainMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite

        private playButton: Phaser.Sprite
        private loadButton: Phaser.Sprite
        private optionsHelpButton: Phaser.Sprite

        constructor(group: Phaser.Group) {
            super(200, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'mmBackground');

            this.playButton = gsm.game.add.sprite(556, 313, 'mmPlayButton');
            this.loadButton = gsm.game.add.sprite(556, 398, 'mmLoadButton');
            this.optionsHelpButton = gsm.game.add.sprite(436, 484, 'mmOptionsHelpButton');



            this.group.add(this.backgroundImage);
        }

        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getPlayButton(): Phaser.Sprite {
            return this.playButton;
        }

        public getLoadButton(): Phaser.Sprite {
            return this.loadButton;
        }

        public getOptionsHelpButton(): Phaser.Sprite {
            return this.optionsHelpButton;
        }
    }
}