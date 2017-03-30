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
    var TestState = (function (_super) {
        __extends(TestState, _super);
        function TestState(gsm) {
            return _super.call(this, gsm) || this;
        }
        TestState.prototype.update = function () {
            var num = this.test.getBox().x;
            this.test.setBox(num + 1);
        };
        TestState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.test = new GUI.TestGraphic(group);
            this.gsm.getGUIM().addGroup(this.test);
        };
        TestState.prototype.startup = function () {
            console.log("Test State Started. Drawable Initialized!");
            return true;
        };
        TestState.prototype.end = function () { return false; };
        TestState.prototype.getType = function () {
            return this;
        };
        return TestState;
    }(States.State));
    States.TestState = TestState;
})(States || (States = {}));
//# sourceMappingURL=TestState.js.map