module States {
    /**
    *This is the help menu of the game
    *
    * @author Emerson, Anthony
    */
    export class HelpMenuState extends State {        
        private helpMenu: GUI.HelpMenuGraphics;

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
            this.helpMenu = new GUI.HelpMenuGraphics(group);

            this.gsm.getGUIM().addGroup(this.helpMenu);
        }

        public startup(): boolean {
            var btn = this.helpMenu.getOkButton();
            btn.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn.setOverSound(this.gsm.musicBox.findSound('Hover'));
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