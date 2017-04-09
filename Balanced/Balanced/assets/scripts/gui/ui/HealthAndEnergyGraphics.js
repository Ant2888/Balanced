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
        function HealthAndEnergyGraphics(group) {
            return _super.call(this, 204, group) || this;
        }
        HealthAndEnergyGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.ul_unitframe = gsm.game.add.sprite(0, 0, 'ul_ui');
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);
        };
        return HealthAndEnergyGraphics;
    }(GUI.GameObject));
    GUI.HealthAndEnergyGraphics = HealthAndEnergyGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=HealthAndEnergyGraphics.js.map