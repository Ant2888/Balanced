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
     * @author Anthony
     */
    var CharGraphics = (function (_super) {
        __extends(CharGraphics, _super);
        function CharGraphics(group, player) {
            var _this = _super.call(this, 0, group) || this;
            _this.player = player;
            return _this;
        }
        CharGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.char_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'char_menu');
            this.char_menu.anchor.setTo(.5, .5);
            this.char_menu.fixedToCamera = true;
            this.group.add(this.char_menu);
            this.player_atk = this.gsm.game.add.text(gsm.game.width - 115, 120, this.player.ATTACK + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_atk.fixedToCamera = true;
            this.player_def = this.gsm.game.add.text(gsm.game.width - 115, 150, this.player.DEFENCE + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_atk.fixedToCamera = true;
            this.player_hp = this.gsm.game.add.text(gsm.game.width - 115, 180, this.player.maxHealth + '', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.player_energy = this.gsm.game.add.text(gsm.game.width - 115, 210, '100', { fill: 'yellow', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);
            this.closeMenu();
        };
        CharGraphics.prototype.openMenu = function () {
            this.char_menu.exists = true;
            this.closeBtn.exists = true;
            this.player_atk.exists = true;
            this.player_def.exists = true;
            this.player_hp.exists = true;
            this.player_energy.exists = true;
        };
        CharGraphics.prototype.closeMenu = function () {
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
        };
        CharGraphics.prototype.flipMenu = function () {
            if (this.char_menu.exists)
                this.closeMenu();
            else {
                this.openMenu();
            }
        };
        return CharGraphics;
    }(GUI.GameObject));
    GUI.CharGraphics = CharGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=CharGraphics.js.map