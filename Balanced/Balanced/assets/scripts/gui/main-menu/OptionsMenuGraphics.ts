module GUI {
    /**
    *This is the options menu gui of the game
    *
    * @author Emerson
    */
    export class OptionsMenuGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;

        private okButton: Phaser.Button;
        private cancelButton: Phaser.Button;

        private gsm: States.GameStateManager;

        private kb_jump: Phaser.Text;
        private kb_attack: Phaser.Text;
        private kb_interact: Phaser.Text;
        private kb_ability1: Phaser.Text;
        private kb_ability2: Phaser.Text;
        private kb_ability3: Phaser.Text;
        private kb_ability4: Phaser.Text;
        private kb_itemA: Phaser.Text;
        private kb_itemB: Phaser.Text;
        private kb_inventory: Phaser.Text;
        private kb_character: Phaser.Text;
        private kb_patchNotes: Phaser.Text;
        private kb_dungeons: Phaser.Text;
        private kb_arena: Phaser.Text;

        // TODO - add a way for the user to change a key to their desired one.

        constructor(group: Phaser.Group) {
            super(201, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'omBackground');

            this.setOkButton(this.okButtonPressed);
            this.setCancelButton(this.cancelButtonPressed);

            this.group.add(this.backgroundImage);

            this.setKeybindText();            
        }

        public setKeybindText(): void {
            this.kb_jump = this.gsm.game.add.text(475, 190, ': Space', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_attack = this.gsm.game.add.text(475, 245, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_interact = this.gsm.game.add.text(475, 300, ': F', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability1 = this.gsm.game.add.text(475, 350, ': Q', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability2 = this.gsm.game.add.text(475, 405, ': W', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability3 = this.gsm.game.add.text(475, 455, ': E', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability4 = this.gsm.game.add.text(475, 505, ': R', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });

            this.kb_itemA = this.gsm.game.add.text(1000, 190, ': Z', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_itemB = this.gsm.game.add.text(1000, 250, ': X', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_inventory = this.gsm.game.add.text(1000, 300, ': I', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_character = this.gsm.game.add.text(1000, 350, ': C', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_patchNotes = this.gsm.game.add.text(1000, 405, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_dungeons = this.gsm.game.add.text(1000, 455, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_arena = this.gsm.game.add.text(1000, 505, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
        }

        // initializes the buttons
        public setOkButton(func: any): void {
            this.okButton = this.gsm.game.add.button(360, 606, 'omOkButton', func, this, 1, 0, 2);
        }

        public setCancelButton(func: any): void {
            this.cancelButton = this.gsm.game.add.button(600, 606, 'omCancelButton', func, this, 1, 0, 2);
        }

        private okButtonPressed(): any {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        }

        private cancelButtonPressed(): any {
            console.log('cancel button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        }

        public setKb_jump(newKey: string) {
            this.kb_jump.text = newKey;
        }

        public setKb_attack(newKey: string) {
            this.kb_attack.text = newKey;
        }

        public setKb_interact(newKey: string) {
            this.kb_interact.text = newKey;
        }

        public setKb_ability1(newKey: string) {
            this.kb_ability1.text = newKey;
        }

        public setKb_ability2(newKey: string) {
            this.kb_ability2.text = newKey;
        }

        public setKb_ability3(newKey: string) {
            this.kb_ability3.text = newKey;
        }

        public setKb_ability4(newKey: string) {
            this.kb_ability4.text = newKey;
        }

        public setKb_itemA(newKey: string) {
            this.kb_itemA.text = newKey;
        }

        public setKb_ItemB(newKey: string) {
            this.kb_itemB.text = newKey;
        }

        public setKb_inventory(newKey: string) {
            this.kb_inventory.text = newKey;
        }

        public setKb_character(newKey: string) {
            this.kb_character.text = newKey;
        }

        public setKb_patchNotes(newKey: string) {
            this.kb_patchNotes.text = newKey;
        }

        public setKb_dungeons(newKey: string) {
            this.kb_dungeons.text = newKey;
        }

        public setKb_arena(newKey: string) {
            this.kb_arena.text = newKey;
        }

        // getters
        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getOkButton(): Phaser.Button {
            return this.okButton;
        }

        public getCancelButton(): Phaser.Button {
            return this.cancelButton;
        }
    }
}