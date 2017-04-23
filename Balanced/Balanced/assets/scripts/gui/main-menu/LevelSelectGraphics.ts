module GUI {
    /**
    *This is the level select menu gui of the game
    *
    * @author Emerson
    */
    export class LevelSelectGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;

        private level1Button: Phaser.Button;
        private level2Button: Phaser.Button;
        private level3Button: Phaser.Button;

        private cancelButton: Phaser.Button;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(203, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.backgroundImage = gsm.game.add.sprite(0, 0, 'ls_background');
            this.group.add(this.backgroundImage);

            this.setLevel1Button(this.level1ButtonPressed);
            this.setLevel2Button(this.level2ButtonPressed);
            this.setLevel3Button(this.level3ButtonPressed);

            this.setCancelButton(this.cancelButtonPressed);
        }

        // initializes the buttons
        public setLevel1Button(func: any): void {
            this.level1Button = this.gsm.game.add.button(500, 250, 'ls_level1_btn', func, this, 1, 0, 2);
            this.group.add(this.level1Button);
        }

        public setLevel2Button(func: any): void {
            this.level2Button = this.gsm.game.add.button(500, 350, 'ls_level2_btn', func, this, 1, 0, 2);
            this.group.add(this.level2Button);
        }

        public setLevel3Button(func: any): void {
            this.level3Button = this.gsm.game.add.button(500, 450, 'ls_level3_btn', func, this, 1, 0, 2);
            this.group.add(this.level3Button);
        }

        public setCancelButton(func: any): void {
            this.cancelButton = this.gsm.game.add.button(500, 606, 'omCancelButton', func, this, 1, 0, 2);
            this.group.add(this.cancelButton);
        }

        private level1ButtonPressed(): any {
            console.log('Level 1 selected');
            this.gsm.setState(States.LEVEL1_STATE);
        }

        private level2ButtonPressed(): any {
            console.log('Level 2 selected');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private level3ButtonPressed(): any {
            console.log('Level 3 selected');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private cancelButtonPressed(): any {
            console.log('cancel button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        }

        // getters
        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getLevel1(): Phaser.Button {
            return this.level1Button;
        }

        public getLevel2(): Phaser.Button {
            return this.level2Button;
        }

        public getLevel3(): Phaser.Button {
            return this.level3Button;
        }

        public getCancelButton(): Phaser.Button {
            return this.cancelButton;
        }
    }
}