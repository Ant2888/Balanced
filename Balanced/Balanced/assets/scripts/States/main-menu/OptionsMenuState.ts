module States {
    /**
    *This is the options menu of the game
    *
    * @author Emerson
    */
    export class OptionsMenuState extends State {
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
            console.log("Options Menu Started.");
                       
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