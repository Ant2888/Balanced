module GUI {
    /**
    *This is the options menu gui of the game
    *
    * @author Emerson
    */
    export class OptionsMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;
        private okButton: Phaser.Button;        
        private gsm: States.GameStateManager;
                

        constructor(group: Phaser.Group) {
            super(201, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'omBackground');

            this.setOkButton(this.okButtonPressed);            
            this.group.add(this.backgroundImage);
                       
        }
        
        // initializes the buttons
        public setOkButton(func: any): void {
            this.okButton = this.gsm.game.add.button(270, 590, 'omOkButton', func, this, 1, 0, 2);
        }       

        private okButtonPressed(): any {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
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