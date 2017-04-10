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
    *This is the prototype state of the game
    *
    * @author Emerson
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
        };
        HealthAndEnergyGraphics.prototype.gainHealth = function (heal) {
            for (var i = 0; i < heal; i++) {
                this.healthTicks.create(this.currHealthTickPos, 7, 'uf_health_tick');
                this.hb_tickAmount++;
                this.currHealthTickPos += 4;
            }
        };
        HealthAndEnergyGraphics.prototype.loseHealth = function (dmg) {
            for (var i = 0; i < dmg; i++) {
                if (this.player.health > 0) {
                    this.healthTicks.removeChildAt(this.hb_tickAmount);
                    this.hb_tickAmount--;
                    this.currHealthTickPos -= 4;
                }
            }
        };
        HealthAndEnergyGraphics.prototype.gainEnergy = function (heal) {
            for (var i = 0; i < heal; i++) {
                this.energyTicks.create(this.currEnergyTickPos, 43, 'uf_energy_tick');
                this.eb_tickAmount++;
                this.currEnergyTickPos += 2;
            }
        };
        HealthAndEnergyGraphics.prototype.loseEnergy = function (dmg) {
            for (var i = 0; i < dmg; i++) {
                //put energy limit below
                //if (this.player.health > 0) {
                this.energyTicks.removeChildAt(this.eb_tickAmount);
                this.eb_tickAmount--;
                this.currEnergyTickPos -= 2;
                //}
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
            for (var i = 132; i <= 456; i += 4) {
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
            for (var i = 132; i <= 336; i += 2) {
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