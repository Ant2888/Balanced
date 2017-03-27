var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<referenced path = "States" />
var States;
(function (States) {
    var TestState = (function (_super) {
        __extends(TestState, _super);
        function TestState(gsm) {
            _super.call(this, gsm);
        }
        TestState.prototype.update = function () {
            console.log("Updating TestState!");
        };
        TestState.prototype.render = function () { };
        TestState.prototype.init = function () { };
        TestState.prototype.startup = function () {
            var logo = this.gsm.game.add.sprite(this.gsm.game.world.centerX, this.gsm.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            console.log("State started!");
            return true;
        };
        TestState.prototype.end = function () { return false; };
        return TestState;
    }(States.State));
    States.TestState = TestState;
})(States || (States = {}));
//# sourceMappingURL=TestState.js.map