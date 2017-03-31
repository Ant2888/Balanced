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
    var TestGraphic = (function (_super) {
        __extends(TestGraphic, _super);
        function TestGraphic(group) {
            return _super.call(this, 0, group) || this;
        }
        TestGraphic.prototype.initialize = function (gsm) {
            this.box = gsm.game.add.sprite(150, 150, 'logo2');
            this.group.add(this.box);
        };
        TestGraphic.prototype.getBox = function () {
            return this.box;
        };
        TestGraphic.prototype.setBox = function (num) {
            this.box.x = num;
        };
        return TestGraphic;
    }(GUI.GameObject));
    GUI.TestGraphic = TestGraphic;
})(GUI || (GUI = {}));
//# sourceMappingURL=TestGraphic.js.map