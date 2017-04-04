module GUI {
    export class MainMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite

        private playButton: Phaser.Button
        private loadButton: Phaser.Button
        private optionsHelpButton: Phaser.Button
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(200, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'mmBackground');

            this.group.add(this.backgroundImage);
        }

        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getPlayButton(func: any): void {
            this.playButton = this.gsm.game.add.button(556, 313, 'mmPlayButton', func);
            //return this.playButton;
        }

        public getLoadButton(func: any): void {
            this.loadButton = this.gsm.game.add.button(556, 398, 'mmLoadButton', func);
            //return this.loadButton;
        }

        public getOptionsHelpButton(func: any): void {
            this.optionsHelpButton = this.gsm.game.add.button(436, 484, 'mmOptionsHelpButton', func);
            //return this.optionsHelpButton;
        }
    }
}