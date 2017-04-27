
module States {
    /*
    @author Emerson
    */    
    export class TownTutorialState extends State {

        private townGraphics: GUI.TownGraphics;
        private tutGrahpics: GUI.TownTutorialGraphics;

      

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
        }

        public init(): void {
            this.gsm.musicBox.addSound('dark_loop');
            var group = this.gsm.game.add.group();

            this.townGraphics = new GUI.TownGraphics(group);
            this.tutGrahpics = new GUI.TownTutorialGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);
            this.gsm.getGUIM().addGroup(this.tutGrahpics);
        }

        public startup(): boolean {
            this.gsm.musicBox.playByID('dark_loop', undefined, undefined, .2, true, false);
            console.log("Town state started");

                       

            return true;
        }

        public setupKeybinds(data: this): void {

           
        }

        public end(): boolean {
            this.gsm.musicBox.stopByID('dark_loop');
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}