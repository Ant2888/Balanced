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
var BALANCE;
(function (BALANCE) {
    /**
     * An example class of how a buff should look
     * @author Anthony
     */
    var TestEvent = (function (_super) {
        __extends(TestEvent, _super);
        function TestEvent(gsm) {
            return _super.call(this, gsm) || this;
        }
        TestEvent.prototype.dispatchEvent = function (entity) {
            //No action to do
            return true;
        };
        TestEvent.prototype.attemptRevert = function (entity) {
            //No revert action
            return true;
        };
        TestEvent.prototype.getNotifText = function () {
            return "The player has not been nerfed. This is a test.";
        };
        return TestEvent;
    }(BALANCE.BalanceEvent));
    BALANCE.TestEvent = TestEvent;
})(BALANCE || (BALANCE = {}));
//# sourceMappingURL=TestEvent.js.map