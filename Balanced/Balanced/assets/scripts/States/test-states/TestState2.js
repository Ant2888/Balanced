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
var States;
(function (States) {
    var TestState2 = (function (_super) {
        __extends(TestState2, _super);
        function TestState2(gsm) {
            return _super.call(this, gsm) || this;
        }
        TestState2.prototype.update = function () {
            var num = this.test.getBox().x;
            this.test.setBox(num - 1);
        };
        TestState2.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.test = new GUI.TestGraphic(group);
            this.gsm.getGUIM().addGroup(this.test);
        };
        TestState2.prototype.startup = function () {
            console.log("Test State Started. Drawable Initialized!");
            this.press = this.gsm.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.press.onDown.add(function () {
                this.gsm.setState(States.TEST_STATE);
            }, this);
            return true;
        };
        TestState2.prototype.end = function () {
            this.press.reset();
            return true;
        };
        TestState2.prototype.getType = function () {
            return this;
        };
        return TestState2;
    }(States.State));
    States.TestState2 = TestState2;
})(States || (States = {}));
//# sourceMappingURL=TestState2.js.map