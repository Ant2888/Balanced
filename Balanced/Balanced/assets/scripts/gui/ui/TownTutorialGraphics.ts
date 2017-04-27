module GUI {
    /**
    *This is the town gui of the game
    *
    * @author Emerson
    */
    export class TownTutorialGraphics extends GameObject {

        private tut_screen: Phaser.Sprite;
        private tut_screen2: Phaser.Sprite;

        private next: Phaser.Button;

        private gsm: States.GameStateManager;

        private done: boolean = false;

        constructor(group: Phaser.Group) {
            super(206, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.tut_screen2 = gsm.game.add.sprite(0, 0, 'tut_screen2');
            this.tut_screen = gsm.game.add.sprite(0, 0, 'tut_screen1');
            
            this.group.add(this.tut_screen2);
            this.group.add(this.tut_screen);
            
            this.setNextButton(this.nextButtonPressed);
        }

        // initializes the buttons
        public setNextButton(func: any): void {
            this.next = this.gsm.game.add.button(1030, 660, 'tut_next_btn', func, this, 1, 0, 2);
            this.group.add(this.next);
        }  

        private nextButtonPressed(): any {
            console.log('next button pressed');
            this.tut_screen.exists = false;
            
            if (this.done) {
                this.gsm.setState(States.TOWN_STATE);
            }

            this.done = true;
        }        
    }
}