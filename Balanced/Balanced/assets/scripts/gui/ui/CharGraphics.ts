module GUI {
    export class CharGraphics extends GameObject {
        
        private char_menu: Phaser.Sprite;
        private closeBtn: Phaser.Button;
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(0, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.char_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'char_menu');
            this.char_menu.anchor.setTo(.5, .5);
            this.char_menu.fixedToCamera = true;
            this.group.add(this.char_menu);   

            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);   
            this.closeMenu();
        }

        public openMenu(): void {
            this.char_menu.exists = true;
            this.closeBtn.exists = true;
        }

        public closeMenu(): void {
            if (this.char_menu.exists)
                this.char_menu.exists = false;
            if (this.closeBtn.exists)
                this.closeBtn.exists = false;
        }

        public flipMenu(): void {
            this.char_menu.exists = !this.char_menu.exists;
            this.closeBtn.exists = !this.closeBtn.exists;
        }
    }
}