///<referenced path = "States"/>
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
    var TestDrawable = (function (_super) {
        __extends(TestDrawable, _super);
        function TestDrawable(parent) {
            var _this = _super.call(this, parent) || this;
            _this.x = 0;
            _this.y = 0;
            return _this;
        }
        TestDrawable.prototype.draw = function (gsm) {
            if (this.graphics === undefined || this.graphics === null)
                this.graphics = gsm.game.add.graphics(100, 100);
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.drawRect(this.x, this.y, 100, 100);
        };
        return TestDrawable;
    }(Drawable));
    GUI.TestDrawable = TestDrawable;
})(GUI || (GUI = {}));
//# sourceMappingURL=TestDrawable.js.map