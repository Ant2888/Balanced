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
        function CharGraphics(group) {
            return _super.call(this, 0, group) || this;
        }
        CharGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.char_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'char_menu');
            this.char_menu.anchor.setTo(.5, .5);
            this.char_menu.fixedToCamera = true;
            this.group.add(this.char_menu);
            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);
            this.closeMenu();
        };
        CharGraphics.prototype.openMenu = function () {
            this.char_menu.exists = true;
            this.closeBtn.exists = true;
        };
        CharGraphics.prototype.closeMenu = function () {
            if (this.char_menu.exists)
                this.char_menu.exists = false;
            if (this.closeBtn.exists)
                this.closeBtn.exists = false;
        };
        CharGraphics.prototype.flipMenu = function () {
            this.char_menu.exists = !this.char_menu.exists;
            this.closeBtn.exists = !this.closeBtn.exists;
        };
        return CharGraphics;
    }(GUI.GameObject));
    GUI.CharGraphics = CharGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=CharGraphics.js.map