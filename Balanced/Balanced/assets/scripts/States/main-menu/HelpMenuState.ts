module States {
    /**
    *This is the help menu of the game
    *
    * @author Emerson
    */
    export class HelpMenuState extends State {        
        private helpMenu: GUI.HelpMenuGraphics;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {

        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.helpMenu = new GUI.HelpMenuGraphics(group);

            this.gsm.getGUIM().addGroup(this.helpMenu);
        }

        public startup(): boolean {
            console.log("Help Menu Started.");
            this.helpMenu.setOkButton(this.okButtonPressed);
            
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
    }
}