///<referenced path = "States" />
module States {
    export class TestState extends States.State {

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            console.log("Updating TestState!");
        }
        public render(): void { }

        public init(): void { }

        public startup(): boolean {
            var logo = this.gsm.game.add.sprite(this.gsm.game.world.centerX, this.gsm.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            console.log("State started!");
            return true;
        }

        public end(): boolean { return false; }
    }
}