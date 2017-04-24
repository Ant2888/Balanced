
module States {
    export class TownState extends State {

        private townGraphics: GUI.TownGraphics;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
        }

        public init(): void {
            this.gsm.musicBox.addSound('dark_loop');
            var group = this.gsm.game.add.group();
            this.townGraphics = new GUI.TownGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);
        }

        public startup(): boolean {
            this.gsm.musicBox.playByID('dark_loop', undefined, undefined, .2, true, false);
            console.log("Town state started");
            return true;
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