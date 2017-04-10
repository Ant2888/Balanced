module GUI {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson
    */
    export class HealthAndEnergyGraphics extends GameObject {
        private gsm: States.GameStateManager;
        private player: ENTITIES.Player;

        private ul_unitframe: Phaser.Image;

        private healthTicks: Phaser.Group;
        private currHealthTickPos: number;
        private hb_tickAmount: number = -1;

        private energyTicks: Phaser.Group;
        private currEnergyTickPos: number;
        private eb_tickAmount: number = -1;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(204, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.buildHealthBar();
            this.buildEnergyBar();
            this.displayOverlay();

        }

        public gainHealth(heal: number) {
            for (var i = 0; i < heal; i++) {

                this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                this.hb_tickAmount++;
                this.currHealthTickPos += 4;

            }
        }

        public loseHealth(dmg: number) {
            for (var i = 0; i < dmg; i++) {
                if (this.player.health > 0) {
                    this.healthTicks.removeChildAt(this.hb_tickAmount);
                    this.hb_tickAmount--;
                    this.currHealthTickPos -= 4;
                }
            }
        }

        public gainEnergy(heal: number) {
            for (var i = 0; i < heal; i++) {

                this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                this.eb_tickAmount++;
                this.currEnergyTickPos += 2;

            }
        }

        public loseEnergy(dmg: number) {
            for (var i = 0; i < dmg; i++) {
                //put energy limit below
                //if (this.player.health > 0) {
                    this.energyTicks.removeChildAt(this.eb_tickAmount);
                    this.eb_tickAmount--;
                    this.currEnergyTickPos -= 2;
                //}
            }
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
            for (var i = 132; i <= 456; i += 4) {
                tick = this.healthTicks.create(i, 7, 'uf_health_tick');
                this.currHealthTickPos = i;
                this.hb_tickAmount++;
            }

            this.group.add(this.healthTicks);
        }

        public buildEnergyBar(): void {
            this.energyTicks = this.gsm.game.add.group();
            this.energyTicks.fixedToCamera = true;
            this.energyTicks.enableBody = true;
                        
            for (var i = 132; i <= 336; i += 2) {
                this.energyTicks.create(i, 43, 'uf_energy_tick');
                this.currEnergyTickPos = i;
                this.eb_tickAmount++;
            }
            this.group.add(this.energyTicks);
        }
    }
}