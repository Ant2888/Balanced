module BALANCE {
    export class EventDetails {

        public event: BalanceEvent;
        public effected: ENTITIES.Entity;

        constructor(event, effected) {
            this.event = event;
            this.effected = effected;
        }
    }
}