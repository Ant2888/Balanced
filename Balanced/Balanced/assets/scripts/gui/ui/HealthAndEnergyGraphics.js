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
            this.player.addOnHealCallback(this.updateHealth, this);
            this.player.addOnDamageCallback(this.updateHealth, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyGainCallback(this.updateEnergy, this);
            this.player.getAbilityManager().getEnergyManager().addOnEnergyLossCallback(this.updateEnergy, this);
        };
        HealthAndEnergyGraphics.prototype.buildHealthText = function () {
            this.healthText = this.gsm.game.add.text(345, 3, this.player.health + '', { fill: '#000000', font: 'papyrus', fontSize: '24px', fontStyle: 'bold' });
            this.group.add(this.healthText);
            this.healthText.fixedToCamera = true;
        };
        HealthAndEnergyGraphics.prototype.buildEnergyText = function () {
            this.energyText = this.gsm.game.add.text(244, 41, this.player.health + '', { fill: '#000000', font: 'papyrus', fontSize: '18px', fontStyle: 'bold' });
            this.group.add(this.energyText);
            this.energyText.fixedToCamera = true;
        };
        HealthAndEnergyGraphics.prototype.updateHealth = function () {
            if (this.player.health >= 0 && this.player.health <= 100) {
                this.healthBar.width = ((323 / this.player.maxHealth) * this.player.health);
            }
            this.healthText.setText(this.player.health + '');
        };
        HealthAndEnergyGraphics.prototype.updateEnergy = function () {
            if (this.player.getAbilityManager().getEnergyManager().energy >= 0 && this.player.getAbilityManager().getEnergyManager().energy <= 100) {
                this.energyBar.width = ((200 / 100) * this.player.getAbilityManager().getEnergyManager().energy);
            }
            this.energyText.setText(this.player.getAbilityManager().getEnergyManager().energy + '');
        };
        HealthAndEnergyGraphics.prototype.buildHealthBar = function () {
            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(323, 31);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 323, 31);
            bmd.ctx.fillStyle = '#FF4848';
            bmd.ctx.fill();
            this.healthBar = this.gsm.game.add.image(134, 7, bmd);
            this.healthBar.fixedToCamera = true;
            this.group.add(this.healthBar);
        };
        HealthAndEnergyGraphics.prototype.buildEnergyBar = function () {
            // This the yellow background of the energybar
            var bmd2 = this.gsm.game.add.bitmapData(200, 25);
            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, 200, 25);
            bmd2.ctx.fillStyle = '#FEE74F';
            bmd2.ctx.fill();
            this.energyBar = this.gsm.game.add.image(134, 43, bmd2);
            this.energyBar.fixedToCamera = true;
            this.group.add(this.energyBar);
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