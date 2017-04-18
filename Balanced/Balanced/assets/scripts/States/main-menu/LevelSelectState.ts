module States {
    /**
     * Level Sel state
     * @author Anthony, Emerson
     */
    export class LevelSelectState extends State {
        private selMenu: GUI.LevelSelectGraphics;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {

        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.selMenu = new GUI.LevelSelectGraphics(group);

            this.gsm.getGUIM().addGroup(this.selMenu);
        }

        public startup(): boolean {
            console.log("Level Select Started.");

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