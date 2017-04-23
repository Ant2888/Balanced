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
    var BagGraphics = (function (_super) {
        __extends(BagGraphics, _super);
        function BagGraphics(group) {
            return _super.call(this, 0, group) || this;
        }
        BagGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.inv_menu = this.gsm.game.add.sprite(gsm.game.width - 200, 270, 'inv_menu');
            this.inv_menu.anchor.setTo(.5, .5);
            this.inv_menu.fixedToCamera = true;
            this.group.add(this.inv_menu);
            this.closeBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);
            this.dropBtn = this.gsm.game.add.button(gsm.game.width - 63, 108, 'drop_btn_ss', null, this, 1, 0, 2);
            this.dropBtn.anchor.setTo(.5, .5);
            this.dropBtn.fixedToCamera = true;
            this.group.add(this.dropBtn);
            this.closeMenu();
        };
        BagGraphics.prototype.openMenu = function () {
            this.inv_menu.exists = true;
            this.closeBtn.exists = true;
            this.dropBtn.exists = true;
        };
        BagGraphics.prototype.closeMenu = function () {
            if (this.inv_menu.exists)
                this.inv_menu.exists = false;
            if (this.closeBtn.exists)
                this.closeBtn.exists = false;
            if (this.dropBtn.exists)
                this.dropBtn.exists = false;
        };
        BagGraphics.prototype.flipMenu = function () {
            this.inv_menu.exists = !this.inv_menu.exists;
            this.closeBtn.exists = !this.closeBtn.exists;
        };
        return BagGraphics;
    }(GUI.GameObject));
    GUI.BagGraphics = BagGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=BagGraphics.js.map