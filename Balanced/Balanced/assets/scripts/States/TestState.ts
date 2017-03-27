///<referenced path = "States" />
///<referenced path = "GUI" />

module States {
    export class TestState extends States.State {

        private test: GUI.TestDrawable;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.test.x = this.test.x + 1;
        }

        public render(): void {
            this.gsm.getGUIM().add(this.test);
        }

        public init(): void { }

        public startup(): boolean {
            this.test = new GUI.TestDrawable(this);
            console.log("Test State Started. Drawable Initialized!");
            return true;
        }

        public end(): boolean { return false; }
    }
}