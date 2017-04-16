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
            _this.hb_tickAmount = -1;
            _this.eb_tickAmount = -1;
            _this.player = player;
            return _this;
        }
        HealthAndEnergyGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.buildHealthBar();
            this.buildEnergyBar();
            this.displayOverlay();
            this.player.addOnHealCallback(this.gainHealth, this);
            this.player.addOnDamageCallback(this.loseHealth, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyGainCallback(this.gainEnergy, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyLossCallback(this.loseEnergy, this);
        };
        HealthAndEnergyGraphics.prototype.gainHealth = function (heal) {
            if (this.hb_tickAmount <= 100) {
                if (100 >= this.hb_tickAmount + heal) {
                    for (var i = 0; i < heal; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.hb_tickAmount++;
                        this.currHealthTickPos += 3.23;
                    }
                }
                else {
                    var overflowHP = 100 - this.hb_tickAmount;
                    for (var i = 0; i < overflowHP; i++) {
                        this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                        this.hb_tickAmount++;
                        this.currHealthTickPos += 3.23;
                    }
                }
            }
        };
        HealthAndEnergyGraphics.prototype.loseHealth = function (dmg) {
            if (this.hb_tickAmount > 0) {
                if (this.hb_tickAmount - dmg > 1) {
                    for (var i = 0; i < dmg; i++) {
                        this.healthTicks.removeChildAt(this.hb_tickAmount);
                        this.hb_tickAmount--;
                        this.currHealthTickPos -= 3.23;
                    }
                }
                else {
                    var underflowHP = this.hb_tickAmount;
                    for (var i = 0; i <= underflowHP; i++) {
                        this.healthTicks.removeChildAt(this.hb_tickAmount);
                        this.hb_tickAmount--;
                        this.currHealthTickPos -= 3.23;
                    }
                }
            }
        };
        HealthAndEnergyGraphics.prototype.gainEnergy = function (heal) {
            if (this.eb_tickAmount <= 100) {
                if (100 >= this.eb_tickAmount + heal) {
                    for (var i = 0; i < heal; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.eb_tickAmount++;
                        this.currEnergyTickPos += 2;
                    }
                }
                else {
                    var overflowENG = 100 - this.eb_tickAmount;
                    for (var i = 0; i < overflowENG; i++) {
                        this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                        this.eb_tickAmount++;
                        this.currEnergyTickPos += 2;
                    }
                }
            }
        };
        HealthAndEnergyGraphics.prototype.loseEnergy = function (dmg) {
            if (this.eb_tickAmount > 0) {
                if (this.eb_tickAmount - dmg > 1) {
                    for (var i = 0; i < dmg; i++) {
                        this.energyTicks.removeChildAt(this.eb_tickAmount);
                        this.eb_tickAmount--;
                        this.currEnergyTickPos -= 2;
                    }
                }
                else {
                    var underflowENG = this.eb_tickAmount;
                    for (var i = 0; i <= underflowENG; i++) {
                        this.energyTicks.removeChildAt(this.eb_tickAmount);
                        this.eb_tickAmount--;
                        this.currEnergyTickPos -= 2;
                    }
                }
            }
        };
        HealthAndEnergyGraphics.prototype.displayOverlay = function () {
            this.ul_unitframe = this.gsm.game.add.sprite(0, 0, 'ul_ui');
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);
        };
        HealthAndEnergyGraphics.prototype.buildHealthBar = function () {
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
        };
        HealthAndEnergyGraphics.prototype.buildEnergyBar = function () {
            this.energyTicks = this.gsm.game.add.group();
            this.energyTicks.fixedToCamera = true;
            this.energyTicks.enableBody = true;
            for (var i = 132; i <= 332; i += 2) {
                this.energyTicks.create(i, 43, 'uf_energy_tick');
                this.currEnergyTickPos = i;
                this.eb_tickAmount++;
            }
            this.group.add(this.energyTicks);
        };
        return HealthAndEnergyGraphics;
    }(GUI.GameObject));
    GUI.HealthAndEnergyGraphics = HealthAndEnergyGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=HealthAndEnergyGraphics.js.map