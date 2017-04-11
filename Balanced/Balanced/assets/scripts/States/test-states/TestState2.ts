module States {
    export class TestState2 extends State {

        private test: GUI.TestGraphic;
        private press: Phaser.Key;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.test = new GUI.TestGraphic(group);
            this.gsm.getGUIM().addGroup(this.test);
        }

        public startup(): boolean {
            console.log("Test State Started. Drawable Initialized!");

            this.press = this.gsm.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.press.onDown.add(function () {
                this.gsm.setState(States.TEST_STATE);
            }, this);

            return true;
        }

        public end(): boolean {
            this.press.reset();
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}