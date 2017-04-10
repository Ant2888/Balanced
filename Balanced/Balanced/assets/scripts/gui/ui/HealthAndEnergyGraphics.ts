module GUI {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson
    */
    export class HealthAndEnergyGraphics extends GameObject {
        private gsm: States.GameStateManager;
        private ul_unitframe: Phaser.Image; 

        private healthTicks: Phaser.Group;
        private energyTicks: Phaser.Group;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(204, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.buildHealthBar();
            this.buildEnergyBar();
            this.displayOverlay();
                        
        }

        public displayOverlay(): void {
            this.ul_unitframe = this.gsm.game.add.sprite(0, 0, 'ul_ui');
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);
        }

        public buildHealthBar(): void {
            this.healthTicks = this.gsm.game.add.group();
            this.healthTicks.fixedToCamera = true;
            this.healthTicks.enableBody = true;

            var tick;
            for (var i = 132; i < 455; i += 4) {                
                tick = this.healthTicks.create(i, 7, 'uf_health_tick');
            }
        }

        public buildEnergyBar(): void {
            this.energyTicks = this.gsm.game.add.group();
            this.energyTicks.fixedToCamera = true;
            this.energyTicks.enableBody = true;

            var tick;
            for (var i = 132; i < 332; i += 2) {               
                tick = this.energyTicks.create(i, 43, 'uf_energy_tick');
            }
        }
    }    
}