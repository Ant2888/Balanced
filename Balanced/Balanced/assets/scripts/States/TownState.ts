
module States {
    export class TownState extends State {

        private townGraphics: GUI.TownGraphics;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.townGraphics = new GUI.TownGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);
        }

        public startup(): boolean {
            console.log("Town state started");
            return true;
        }

        public end(): boolean { return true; }

        public getType(): any {
            return this;
        }
    }
}