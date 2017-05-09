module States {
    /**
    *This is the options menu of the game
    *
    * @author Emerson, Anthony
    */
    export class OptionsMenuState extends State {
        private optionsMenu: GUI.OptionsMenuGraphics;
                
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
            this.optionsMenu = new GUI.OptionsMenuGraphics(group);

            this.gsm.getGUIM().addGroup(this.optionsMenu);
        }

        public startup(): boolean {

            var btn2 = this.optionsMenu.getOkButton();
            btn2.setDownSound(this.gsm.musicBox.findSound('ClickDown'));
            btn2.setUpSound(this.gsm.musicBox.findSound('ClickLetGo'));
            btn2.setOutSound(this.gsm.musicBox.findSound('Unhover'));
            btn2.setOverSound(this.gsm.musicBox.findSound('Hover'));

            this.setupKeybinds(this);
            this.buildSoundButton();
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

                if (e.keyCode == Phaser.Keyboard.G) {
                    data.gsm.setState(States.LEVEL3_STATE);
                }
            }
        } 

        public end(): boolean {
            this.destroySoundButton();         
            return true;
        }

        public getType(): any {
            return this;
        }                    
    }
}