module States {
    /**
    *This is the main menu of the game
    *
    * @author Emerson
    */
    export class MainMenuState extends State {

        // the background of the main menu, could be just a placeholder for now
        private mainMenu: GUI.MainMenuGraphics;

        // this is all the keybinding actions that will take place, if any
        private press: Phaser.Key;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {

        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.mainMenu = new GUI.MainMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.mainMenu);
        }

        public startup(): boolean {
            console.log("Main Menu Started.");

                   
            return true;
        }

        public end(): boolean {
            this.press.reset();
            return true;
        }

        public getType(): any {
            return this;
        }

        private playButtonPressed(): any {
            console.log('play button was pressed');
        }

        private loadButtonPressed(): any {
            console.log('load button was pressed');
        }

        private optionsHelpButtonPressed(): any {
            console.log('options/help button was pressed');
        }
    }
}