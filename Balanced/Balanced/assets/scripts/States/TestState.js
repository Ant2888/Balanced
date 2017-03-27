///<referenced path = "States" />
///<referenced path = "GUI" />
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
            this.test.x = this.test.x + 1;
        };
        TestState.prototype.render = function () {
            this.gsm.getGUIM().add(this.test);
        };
        TestState.prototype.init = function () { };
        TestState.prototype.startup = function () {
            this.test = new GUI.TestDrawable(this);
            console.log("Test State Started. Drawable Initialized!");
            return true;
        };
        TestState.prototype.end = function () { return false; };
        return TestState;
    }(States.State));
    States.TestState = TestState;
})(States || (States = {}));
//# sourceMappingURL=TestState.js.map