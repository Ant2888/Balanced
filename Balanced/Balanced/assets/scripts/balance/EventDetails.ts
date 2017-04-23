module BALANCE {
    /**
     * Details for the Event.
     * @author Anthony
     */
    export class EventDetails {

        public event: BalanceEvent;
        public effected: ENTITIES.Entity;

        constructor(event, effected) {
            this.event = event;
            this.effected = effected;
        }
    }
}