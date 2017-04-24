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
            this.gsm.musicBox.addSound('Hover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('Unhover', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickDown', UTIL.MENU_SFX);
            this.gsm.musicBox.addSound('ClickLetGo', UTIL.MENU_SFX);

            var group = this.gsm.game.add.group();
            this.selMenu = new GUI.LevelSelectGraphics(group);

            this.gsm.getGUIM().addGroup(this.selMenu);
        }

        public startup(): boolean {
            var btn1 = this.selMenu.getLevel1();
            btn1.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn1.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn1.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn1.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn2 = this.selMenu.getLevel2();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn3 = this.selMenu.getLevel3();
            btn3.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn3.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn3.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn3.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn4 = this.selMenu.getCancelButton();
            btn4.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn4.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn4.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn4.setOverSound(this.gsm.musicBox.findSound('Hover'));
            return true;
        }

        public end(): boolean {
            this.gsm.musicBox.stopAll();
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}