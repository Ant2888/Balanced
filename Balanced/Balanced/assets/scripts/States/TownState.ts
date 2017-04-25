
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
            this.setupKeybinds(this);
            return true;
        }

        public setupKeybinds(data: this): void {

            this.gsm.game.input.keyboard.onUpCallback = function (e) {

                if (e.keyCode == Phaser.Keyboard.V) {
                    data.gsm.setState(States.LEVEL1_STATE);
                }

                if (e.keyCode == Phaser.Keyboard.B) {
                    data.gsm.setState(States.LEVEL2_STATE);
                }

                if (e.keyCode == Phaser.Keyboard.H) {
                    data.gsm.setState(States.LEVEL3_STATE);
                }
            }
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