var BALANCE;
(function (BALANCE) {
    /**
     * This class will manage any and all buffs that will go through
     * for a given state. This class should almost never be used
     * continously through states BUT it can be as it will continue
     * to revert events even if it failed to revert one.
     * AS OF NOW USE REINIT THIS ON A STATE BY STATE BASIS
     *
     * @author Anthony
     */
    var BalanceManager = (function () {
        /**
         * Constructor for the manager. If a previous event list is loaded it will
         * attempt to apply it.
         * @param gsm The current instace of the gsm.
         * @param events Any events to be included in this manager.
         */
        function BalanceManager(gsm, events) {
            this.gsm = gsm;
            if (events !== undefined && event !== null) {
                this.allEvents = events;
                this.applyAll();
                //TODO: NOTIFY IF ANY FAILED
            }
            else
                this.allEvents = new Array();
            this.notif_group = this.gsm.game.add.group();
            this.notification = new GUI.BalanceEventGraphics(this.notif_group);
            this.gsm.getGUIM().addGroup(this.notification);
            this.matrix = new BALANCE.EventMatrix(this.gsm);
        }
        /**
         * This will apply ALL events to their respective entity.
         * Note: If they already have been applied it will do so again.
         */
        BalanceManager.prototype.applyAll = function () {
            var ret = true;
            this.allEvents.forEach(function (e) {
                ret = ret && e.event.dispatchEvent(e.effected);
            });
            return ret;
        };
        /**
         * Attempts to undo the last event that occured.
         */
        BalanceManager.prototype.undoLast = function () {
            return this.undoNthEvent(this.allEvents.length);
        };
        /**
         * Attempts to undo the nth event that occured (count from 1).
         * @param eventNumber The event to attempt to revert.
         * @param eraseIfFailed Whether to erase the event from the list regardless
         *                      of outcome of the attempt.
         */
        BalanceManager.prototype.undoNthEvent = function (eventNumber, eraseIfFailed) {
            if (eraseIfFailed === void 0) { eraseIfFailed = true; }
            var ind = eventNumber - 1;
            if (ind < 0)
                return true;
            var last = this.allEvents[ind];
            var ret = last.event.attemptRevert(last.effected);
            if (eraseIfFailed || ret)
                this.allEvents.splice(ind, 1);
            return ret;
        };
        /**
         * Attempts to dispatch a balancing event to the given entity.
         * @param event The event to apply.
         * @param entity The entity to apply the event to.
         */
        BalanceManager.prototype.dispatchEvent = function (event, entity, revert, notify) {
            if (revert === undefined || revert === null)
                revert = false;
            if (notify === undefined || notify === null)
                notify = true;
            if (!event.dispatchEvent(entity))
                return false;
            var e = new BALANCE.EventDetails(event, entity);
            revert ? e.event.attemptRevert(e.effected) : e.event.dispatchEvent(e.effected);
            this.allEvents.push(e);
            if (notify)
                this.notification.announceEvent(e.event);
            return true;
        };
        return BalanceManager;
    }());
    BALANCE.BalanceManager = BalanceManager;
})(BALANCE || (BALANCE = {}));
//# sourceMappingURL=BalanceManager.js.map