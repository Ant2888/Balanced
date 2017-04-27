module GUI {
    /**
     * @author Anthony
     */
    export class CharGraphics extends GameObject {

        private player: ENTITIES.Player;

        private char_menu: Phaser.Sprite;
        private closeBtn: Phaser.Button;
        private gsm: States.GameStateManager;

        private player_atk: Phaser.Text;
        private player_def: Phaser.Text;
        private player_hp: Phaser.Text;
        private player_energy: Phaser.Text;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(0, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.char_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'char_menu');
            this.char_menu.anchor.setTo(.5, .5);
            this.char_menu.fixedToCamera = true;
            this.group.add(this.char_menu);

            this.player_atk = this.gsm.game.add.text(gsm.game.width - 115, 120, this.player.ATTACK + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_atk.fixedToCamera = true;
            this.player_def = this.gsm.game.add.text(gsm.game.width - 115, 150, this.player.DEFENCE + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_def.fixedToCamera = true;
            this.player_hp = this.gsm.game.add.text(gsm.game.width - 115, 180, this.player.maxHealth + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_hp.fixedToCamera = true;
            this.player_energy = this.gsm.game.add.text(gsm.game.width - 115, 210, '100', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_energy.fixedToCamera = true;    

            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);
            this.closeMenu();
        }

        public openMenu(): void {
            if (this.gsm.game.paused || !this.player.alive)
                return;

            this.char_menu.exists = true;
            this.closeBtn.exists = true;

            this.player_atk.exists = true;
            this.player_def.exists = true;
            this.player_hp.exists = true;
            this.player_energy.exists = true;

        }

        public closeMenu(): void {
            if (this.gsm.game.paused || !this.player.alive)
                return;

            if (this.char_menu.exists)
                this.char_menu.exists = false;

            if (this.closeBtn.exists)
                this.closeBtn.exists = false;

            if (this.player_atk.exists)
                this.player_atk.exists = false;

            if (this.player_def.exists)
                this.player_def.exists = false;

            if (this.player_hp.exists)
                this.player_hp.exists = false;

            if (this.player_energy.exists)
                this.player_energy.exists = false;
                                  
            
        }

        public flipMenu(): void {
            if (this.char_menu.exists)
                this.closeMenu();
            else {
                this.openMenu();
            }
        }
    }
}