module States {
    /**
    *This is the main menu of the game
    *
    * @author Emerson, Anthony
    */
    export class MainMenuState extends State {        
        private mainMenu: GUI.MainMenuGraphics;            

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
            this.gsm.musicBox.addSound('dark_intro', UTIL.MENU_SFX);

            var group = this.gsm.game.add.group();
            this.mainMenu = new GUI.MainMenuGraphics(group);

            this.gsm.getGUIM().addGroup(this.mainMenu);
        }

        public startup(): boolean {
            this.gsm.musicBox.playByID('dark_intro', undefined, undefined, .4, true, false);
            var btn1 = this.mainMenu.getHelpButton();
            btn1.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn1.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn1.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn1.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn2 = this.mainMenu.getLoadButton();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn3 = this.mainMenu.getOptionsButton();
            btn3.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn3.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn3.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn3.setOverSound(this.gsm.musicBox.findSound('Hover'));

            var btn4 = this.mainMenu.getPlayButton();
            btn4.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn4.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn4.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn4.setOverSound(this.gsm.musicBox.findSound('Hover'));
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
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}