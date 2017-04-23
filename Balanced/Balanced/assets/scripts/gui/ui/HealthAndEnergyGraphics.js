var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GUI;
(function (GUI) {
    /**
    * This will be the unit frame for the player
    *
    * @author Emerson, Anthony
    */
    var HealthAndEnergyGraphics = (function (_super) {
        __extends(HealthAndEnergyGraphics, _super);
        function HealthAndEnergyGraphics(group, player) {
            var _this = _super.call(this, 204, group) || this;
            _this.player = player;
            return _this;
        }
        HealthAndEnergyGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.buildHealthBar();
            this.buildEnergyBar();
            this.displayOverlay();
            this.buildHealthText();
            this.buildEnergyText();
            this.player.addOnHealCallback(this.gainHealth, this);
            this.player.addOnDamageCallback(this.loseHealth, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyGainCallback(this.gainEnergy, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyLossCallback(this.loseEnergy, this);
        };
        HealthAndEnergyGraphics.prototype.buildHealthText = function () {
            this.healthText = this.gsm.game.add.text(345, 3, '100', { fill: '#000000', font: 'papyrus', fontSize: '24px', fontStyle: 'bold' });
            this.group.add(this.healthText);
            this.healthText.fixedToCamera = true;
        };
        HealthAndEnergyGraphics.prototype.buildEnergyText = function () {
            this.energyText = this.gsm.game.add.text(248, 41, '100', { fill: '#000000', font: 'papyrus', fontSize: '18px', fontStyle: 'bold' });
            this.group.add(this.energyText);
            this.energyText.fixedToCamera = true;
        };
        HealthAndEnergyGraphics.prototype.gainHealth = function (heal) {
            if (this.currentHealth < 100) {
                if (this.currentHealth + heal <= 100) {
                    for (var i = 0; i < heal; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.currentHealth++;
                        this.currHealthTickPos += 3.23;
                    }
                }
                else {
                    var overflowHP = 100 - this.currentHealth;
                    for (var i = 0; i < overflowHP; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.currentHealth++;
                        this.currHealthTickPos += 3.23;
                    }
                }
            }
            this.healthText.setText(this.currentHealth);
        };
        HealthAndEnergyGraphics.prototype.loseHealth = function (dmg) {
            if (this.currentHealth > 0) {
                if (this.currentHealth - dmg > 1) {
                    for (var i = 0; i < dmg; i++) {
                        this.healthTicks.removeChildAt(this.currentHealth);
                        this.currentHealth--;
                        this.currHealthTickPos -= 3.23;
                    }
                }
                else {
                    var underflowHP = this.currentHealth;
                    for (var i = 0; i < underflowHP; i++) {
                        this.healthTicks.removeChildAt(this.currentHealth);
                        this.currentHealth--;
                        this.currHealthTickPos -= 3.23;
                    }
                }
            }
            this.healthText.setText(this.currentHealth);
        };
        HealthAndEnergyGraphics.prototype.gainEnergy = function (heal) {
            if (this.currentEnergy < 100) {
                if (this.currentEnergy + heal <= 100) {
                    for (var i = 0; i < heal; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.currentEnergy++;
                        this.currEnergyTickPos += 2;
                    }
                }
                else {
                    var overflowENG = 100 - this.currentEnergy;
                    for (var i = 0; i < overflowENG; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.currentEnergy++;
                        this.currEnergyTickPos += 2;
                    }
                }
            }
            this.energyText.setText(this.currentEnergy);
        };
        HealthAndEnergyGraphics.prototype.loseEnergy = function (dmg) {
            if (this.currentEnergy > 0) {
                if (this.currentEnergy - dmg >= 0) {
                    for (var i = 0; i < dmg; i++) {
                        this.energyTicks.removeChildAt(this.currentEnergy);
                        this.currentEnergy--;
                        this.currEnergyTickPos -= 2;
                    }
                }
                else {
                    var underflowENG = this.currentEnergy;
                    for (var i = 0; i < underflowENG; i++) {
                        this.energyTicks.removeChildAt(this.currentEnergy);
                        this.currentEnergy--;
                        this.currHealthTickPos -= 2;
                    }
                }
            }
            this.energyText.setText(this.currentEnergy);
        };
        HealthAndEnergyGraphics.prototype.buildHealthBar = function () {
            this.currentHealth = -1;
            this.healthTicks = this.gsm.game.add.group();
            this.healthTicks.fixedToCamera = true;
            var tick;
            for (var i = 132; i <= 456; i += 3.23) {
                tick = this.healthTicks.create(i, 7, 'uf_health_tick');
                this.currHealthTickPos = i;
                this.currentHealth++;
            }
            this.group.add(this.healthTicks);
        };
        HealthAndEnergyGraphics.prototype.buildEnergyBar = function () {
            this.currentEnergy = -1;
            this.energyTicks = this.gsm.game.add.group();
            this.energyTicks.fixedToCamera = true;
            for (var i = 134; i <= 334; i += 2) {
                this.energyTicks.create(i, 43, 'uf_energy_tick');
                this.currEnergyTickPos = i;
                this.currentEnergy++;
            }
            this.group.add(this.energyTicks);
            console.log(this.currentEnergy);
        };
        HealthAndEnergyGraphics.prototype.displayOverlay = function () {
            this.ul_unitframe = this.gsm.game.add.sprite(0, 0, 'ul_ui');
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);
        };
        return HealthAndEnergyGraphics;
    }(GUI.GameObject));
    GUI.HealthAndEnergyGraphics = HealthAndEnergyGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=HealthAndEnergyGraphics.js.map