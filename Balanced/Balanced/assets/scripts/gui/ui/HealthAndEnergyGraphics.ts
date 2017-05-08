module GUI {
    /**
    * This will be the unit frame for the player
    *
    * @author Emerson, Anthony
    */
    export class HealthAndEnergyGraphics extends GameObject {
        private gsm: States.GameStateManager;
        private player: ENTITIES.Player;

        private ul_unitframe: Phaser.Image;       

        private healthBar: Phaser.Image;
        private energyBar: Phaser.Image;    

        private healthText: Phaser.Text;
        private energyText: Phaser.Text;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(204, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
                       
            this.buildHealthBar();
            this.buildEnergyBar();

            this.displayOverlay();
            this.buildHealthText();
            this.buildEnergyText();

            this.player.addOnHealCallback(this.updateHealth, this);
            this.player.addOnDamageCallback(this.updateHealth, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyGainCallback(this.updateEnergy, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyLossCallback(this.updateEnergy, this);
        }

        public buildHealthText(): void {
            this.healthText = this.gsm.game.add.text(345, 3, this.player.health+'', { fill: '#000000', font: 'papyrus', fontSize: '24px', fontStyle: 'bold' });
            this.group.add(this.healthText);
            this.healthText.fixedToCamera = true;

        }

        public buildEnergyText(): void {
            this.energyText = this.gsm.game.add.text(244, 41, this.player.health+'', { fill: '#000000', font: 'papyrus', fontSize: '18px', fontStyle: 'bold' });
            this.group.add(this.energyText);
            this.energyText.fixedToCamera = true;
        }

        public updateHealth() {
            if (this.player.health >= 0 && this.player.health <= 100) {            
                this.healthBar.width = ((323 / this.player.maxHealth) * this.player.health);                
            }
            this.healthText.setText(this.player.health + '');
        }       

        public updateEnergy() {
            if (this.player.getAbilityManager().getEnergyManager().energy >= 0 && this.player.getAbilityManager().getEnergyManager().energy <= 100) {
                this.energyBar.width = ((200 / 100) * this.player.getAbilityManager().getEnergyManager().energy);                
            }
            this.energyText.setText(this.player.getAbilityManager().getEnergyManager().energy + '');
        }            

        public buildHealthBar(): void {
            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(323, 31);

            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 323, 31);
            bmd.ctx.fillStyle = '#FF4848';
            bmd.ctx.fill();

            this.healthBar = this.gsm.game.add.image(134, 5, bmd);
            this.healthBar.fixedToCamera = true; 

            this.group.add(this.healthBar);
        }
        
        public buildEnergyBar(): void {
            // This the yellow background of the energybar
            var bmd2 = this.gsm.game.add.bitmapData(200, 25);

            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, 200, 25);
            bmd2.ctx.fillStyle = '#FEE74F';
            bmd2.ctx.fill();

            this.energyBar = this.gsm.game.add.image(134, 41, bmd2);
            this.energyBar.fixedToCamera = true;

            this.group.add(this.energyBar);
        }

        public displayOverlay(): void {
            this.ul_unitframe = this.gsm.game.add.sprite(0, 0, 'ul_ui');
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);
        }
    }
}