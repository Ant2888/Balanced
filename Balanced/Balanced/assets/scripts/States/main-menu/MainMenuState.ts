module States {
    /**
    *This is the main menu of the game
    *
    * @author Emerson
    */
    export class MainMenuState extends State {        
        private mainMenu: GUI.MainMenuGraphics;            

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
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}