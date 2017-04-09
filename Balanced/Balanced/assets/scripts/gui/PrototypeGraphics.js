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
    *This is the prototype gui of the game
    *
    * @author Emerson
    */
    var PrototypeGraphics = (function (_super) {
        __extends(PrototypeGraphics, _super);
        function PrototypeGraphics(group) {
            return _super.call(this, 203, group) || this;
        }
        PrototypeGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
        };
        return PrototypeGraphics;
    }(GUI.GameObject));
    GUI.PrototypeGraphics = PrototypeGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=PrototypeGraphics.js.map