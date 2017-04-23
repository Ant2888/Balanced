var BALANCE;
(function (BALANCE) {
    /**
     * An Event that should result in some action on some entity.
     * @author Anthony
     */
    var BalanceEvent = (function () {
        function BalanceEvent(gsm) {
            this.gsm = gsm;
        }
        return BalanceEvent;
    }());
    BALANCE.BalanceEvent = BalanceEvent;
})(BALANCE || (BALANCE = {}));
//# sourceMappingURL=BalanceEvent.js.map