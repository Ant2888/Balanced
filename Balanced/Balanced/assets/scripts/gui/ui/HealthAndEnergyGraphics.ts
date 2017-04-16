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

        private healthTicks: Phaser.Group;
        private currHealthTickPos: number;
        public hb_tickAmount: number = -1;

        private energyTicks: Phaser.Group;
        private currEnergyTickPos: number;
        public eb_tickAmount: number = -1;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(204, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.buildHealthBar();
            this.buildEnergyBar();
            this.displayOverlay();

            this.player.addOnHealCallback(this.gainHealth, this);
            this.player.addOnDamageCallback(this.loseHealth, this);
            this.player.getAbilityManager().getEnergyManager()
                .addOnEnergyGainCallback(this.gainEnergy, this);
            this.player.getAbilityManager().getEnergyManager()
                .addOnEnergyLossCallback(this.loseEnergy, this);
        }

        public gainHealth(heal: number) {
            if (this.hb_tickAmount <= 100) {
                if (100 >= this.hb_tickAmount + heal) {
                    for (var i = 0; i < heal; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.hb_tickAmount++;
                        this.currHealthTickPos += 3.23;
                    }
                } else {
                    var overflowHP = 100 - this.hb_tickAmount;

                    for (var i = 0; i < overflowHP; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.hb_tickAmount++;
                        this.currHealthTickPos += 3.23;
                    }
                }
            }
        }

        public loseHealth(dmg: number) {
            if (this.hb_tickAmount > 0) {
                if (this.hb_tickAmount - dmg > 1) {
                    for (var i = 0; i < dmg; i++) {
                        this.healthTicks.removeChildAt(this.hb_tickAmount);
                        this.hb_tickAmount--;
                        this.currHealthTickPos -= 3.23;
                    }
                } else {
                    var underflowHP = this.hb_tickAmount;

                    for (var i = 0; i <= underflowHP; i++) {
                        this.healthTicks.removeChildAt(this.hb_tickAmount);
                        this.hb_tickAmount--;
                        this.currHealthTickPos -= 3.23;
                    }
                }
            }
        }

        public gainEnergy(heal: number) {
            if (this.eb_tickAmount <= 100) {
                if (100 >= this.eb_tickAmount + heal) {
                    for (var i = 0; i < heal; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.eb_tickAmount++;
                        this.currEnergyTickPos += 2;
                    }
                } else {
                    var overflowENG = 100 - this.eb_tickAmount;

                    for (var i = 0; i < overflowENG; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.eb_tickAmount++;
                        this.currEnergyTickPos += 2;
                    }
                }
            }
        }

        public loseEnergy(dmg: number) {
            if (this.eb_tickAmount > 0) {
                if (this.eb_tickAmount - dmg > 1) {
                    for (var i = 0; i < dmg; i++) {
                        this.energyTicks.removeChildAt(this.eb_tickAmount);
                        this.eb_tickAmount--;
                        this.currEnergyTickPos -= 2;
                    }
                } else {
                    var underflowENG = this.eb_tickAmount;

                    for (var i = 0; i <= underflowENG; i++) {
                        this.energyTicks.removeChildAt(this.eb_tickAmount);
                        this.eb_tickAmount--;
                        this.currEnergyTickPos -= 2;
                    }
                }
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
            for (var i = 132; i <= 456; i += 3.23) {
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

            for (var i = 132; i <= 332; i += 2) {
                this.energyTicks.create(i, 43, 'uf_energy_tick');
                this.currEnergyTickPos = i;
                this.eb_tickAmount++;
            }
            this.group.add(this.energyTicks);
        }
    }
}