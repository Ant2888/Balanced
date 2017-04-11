module GUI {
    /**
    *This is the help menu gui of the game
    *
    * @author Emerson
    */
    export class LevelSelectGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;

        private okButton: Phaser.Button;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(202, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'level_select_menu');

            this.group.add(this.backgroundImage);

            this.setOkButton(this.okButtonPressed);
        }

        // initializes the buttons
        public setOkButton(func: any): void {
            this.okButton = this.gsm.game.add.button(0, 0, 'tutorial_btn', func, this, 0, 0, 0);
            this.group.add(this.okButton);
        }

        private okButtonPressed(): any {
            console.log('Tutorial selected');
            this.gsm.setState(States.PROTOTYPE_STATE);
        }

        // getters
        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getOkButton(): Phaser.Button {
            return this.okButton;
        }
    }
}