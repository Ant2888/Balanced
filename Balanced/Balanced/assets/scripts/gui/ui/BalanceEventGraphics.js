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
     * Graphic for the balance event
     * @author Anthony
     */
    var BalanceEventGraphics = (function (_super) {
        __extends(BalanceEventGraphics, _super);
        function BalanceEventGraphics(group) {
            return _super.call(this, 0, group) || this;
        }
        BalanceEventGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.img = this.gsm.game.add.sprite(466, -146, 'balance_notif');
            this.img.fixedToCamera = true;
            this.inNotif = false;
            //this.img.exists = false;
        };
        BalanceEventGraphics.prototype.announceEvent = function (event) {
            if (this.inNotif)
                return;
            if (this.curText !== undefined && this.curText !== null)
                this.curText.destroy();
            this.curText = this.gsm.game.add.text(466 + 30, -146 + 50, event.getNotifText(), {
                fill: 'red', font: 'papyrus', fontSize: '14px',
                stroke: 'black', strokeThickness: 4
            });
            this.curText.fixedToCamera = true;
            this.tweenInOut();
        };
        /**
         * Tweens the BEG into and out of the screen. It also takes the text with it at the same time.
         */
        BalanceEventGraphics.prototype.tweenInOut = function () {
            this.inNotif = true;
            var a = this.gsm.game.add.tween(this.img.cameraOffset).to({ "y": 0 });
            var b = this.gsm.game.add.tween(this.img.cameraOffset).to({ "y": -146 }, undefined, undefined, undefined, 2000);
            var c = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": 0 + 50 });
            var d = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": -146 + 50 }, undefined, undefined, undefined, 2000);
            a.chain(b);
            c.chain(d);
            b.onComplete.add(function () { this.inNotif = false; }, this);
            a.start();
            c.start();
        };
        BalanceEventGraphics.prototype.resetPos = function () {
        };
        return BalanceEventGraphics;
    }(GUI.GameObject));
    BalanceEventGraphics.NOTIF_IN_TIME = 700;
    GUI.BalanceEventGraphics = BalanceEventGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=BalanceEventGraphics.js.map