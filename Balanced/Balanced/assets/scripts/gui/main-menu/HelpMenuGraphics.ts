module GUI {
    /**
    *This is the help menu gui of the game
    *
    * @author Emerson
    */
    export class HelpMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;

        private okButton: Phaser.Button;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(202, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'hmBackground');

            this.group.add(this.backgroundImage);
        }

        // initializes the button when the gui is loaded
        public setOkButton(func: any): void {
            this.okButton = this.gsm.game.add.button(570, 550, 'hmOkButton', func, this, 1, 0, 2);
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