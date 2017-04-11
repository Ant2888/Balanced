module GUI {
    export class BagGraphics extends GameObject {

        private dropBtn: Phaser.Button;
        private inv_menu: Phaser.Sprite;
        private closeBtn: Phaser.Button;
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(0, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.inv_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'inv_menu');
            this.inv_menu.anchor.setTo(.5, .5);
            this.inv_menu.fixedToCamera = true;
            this.group.add(this.inv_menu);   

            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);   

            this.dropBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'drop_btn_ss', null, this, 1,0,2);
            this.dropBtn.anchor.setTo(.5, .5);
            this.dropBtn.fixedToCamera = true;
            this.group.add(this.dropBtn);   

            this.closeMenu();
        }

        public openMenu(): void {
            this.inv_menu.exists = true;
            this.closeBtn.exists = true;
            this.dropBtn.exists = true;
        }

        public closeMenu(): void {
            if (this.inv_menu.exists)
                this.inv_menu.exists = false;
            if (this.closeBtn.exists)
                this.closeBtn.exists = false;
            if (this.dropBtn.exists)
                this.dropBtn.exists = false;
        }

        public flipMenu(): void {
            this.inv_menu.exists = !this.inv_menu.exists;
            this.closeBtn.exists = !this.closeBtn.exists;
        }

    }
}