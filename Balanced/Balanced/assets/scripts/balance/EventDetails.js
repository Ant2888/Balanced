var BALANCE;
(function (BALANCE) {
    /**
     * Details for the Event.
     * @author Anthony
     */
    var EventDetails = (function () {
        function EventDetails(event, effected) {
            this.event = event;
            this.effected = effected;
        }
        return EventDetails;
    }());
    BALANCE.EventDetails = EventDetails;
})(BALANCE || (BALANCE = {}));
//# sourceMappingURL=EventDetails.js.map