
module States {
    export class TestState extends States.State {

        private test: GUI.TestGraphic;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            var num = this.test.getBox().x;
            this.test.setBox(num + 1);
        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.test = new GUI.TestGraphic(group);
            this.gsm.getGUIM().addGroup(this.test);
        }

        public startup(): boolean {
            console.log("Test State Started. Drawable Initialized!");
            return true;
        }

        public end(): boolean { return false; }

        public getType(): any {
            return this;
        }
    }
}