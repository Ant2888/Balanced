module BALANCE {
    /**
     * This class will manage any and all buffs that will go through
     * for a given state. This class should almost never be used
     * continously through states BUT it can be as it will continue
     * to revert events even if it failed to revert one.
     *
     * @author Anthony
     */
    export class BalanceManager {

        /**
         * Current instance of the GSM
         */
        protected gsm: States.GameStateManager;

        /**
         * All the EventDetails that have occured with this manager in place.
         */
        protected allEvents: EventDetails[];

        /**
         * Constructor for the manager. If a previous event list is loaded it will
         * attempt to apply it.
         * @param gsm The current instace of the gsm.
         * @param events Any events to be included in this manager.
         */
        constructor(gsm: States.GameStateManager, events?: EventDetails[]) {
            this.gsm = gsm;

            if (events !== undefined && event !== null) {
                this.allEvents = events;
                this.applyAll();
                //TODO: NOTIFY IF ANY FAILED
            }
            else
                this.allEvents = new Array();
        }

        /**
         * This will apply ALL events to their respective entity.
         * Note: If they already have been applied it will do so again.
         */
        public applyAll(): boolean {
            var ret = true;

            this.allEvents.forEach(function (e) {
                ret = ret && e.event.dispatchEvent(e.effected);
            });

            return ret;
        }

        /**
         * Attempts to undo the last event that occured.
         */
        public undoLast(): boolean {
            return this.undoNthEvent(this.allEvents.length);
        }

        /**
         * Attempts to undo the nth event that occured (count from 1).
         * @param eventNumber The event to attempt to revert.
         * @param eraseIfFailed Whether to erase the event from the list regardless
         *                      of outcome of the attempt.
         */
        public undoNthEvent(eventNumber: number, eraseIfFailed = true): boolean {
            var ind = eventNumber - 1;
            if (ind < 0)
                return true;

            var last = this.allEvents[ind];

            var ret = last.event.attemptRevert(last.effected);

            if (eraseIfFailed || ret)
                this.allEvents.splice(ind, 1);

            return ret;
        }

        /**
         * Attempts to dispatch a balancing event to the given entity.
         * @param event The event to apply.
         * @param entity The entity to apply the event to.
         */
        public dispatchEvent(event: BalanceEvent, entity: ENTITIES.Entity): boolean {
            if (!event.dispatchEvent(entity))
                return false;

            this.allEvents.push(new EventDetails(event, entity));

            return true;
        }
    }
}