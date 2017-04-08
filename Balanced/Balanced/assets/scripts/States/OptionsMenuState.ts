module States {
    /**
    *This is the options menu of the game
    *
    * @author Emerson
    */
    export class OptionsMenuState extends State {

        // the background of the main menu, could be just a placeholder for now
        private optionsMenu: GUI.OptionsMenuGraphics;
                
        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {

        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.optionsMenu = new GUI.OptionsMenuGraphics(group);

            this.gsm.getGUIM().addGroup(this.optionsMenu);
        }

        public startup(): boolean {
            console.log("Main Menu Started.");

            this.optionsMenu.setOkButton(this.okButtonPressed);
            this.optionsMenu.setCancelButton(this.cancelButtonPressed);
           

            return true;
        }

        public end(): boolean {           
            return true;
        }

        public getType(): any {
            return this;
        }

        private okButtonPressed(): any {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        }

        private cancelButtonPressed(): any {
            console.log('cancel button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        }
               
    }
}