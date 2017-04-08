module BALANCE {

    export abstract class BalanceEvent {

        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
        }

        public abstract dispatchEvent(entity: ENTITIES.Entity): boolean;
        public abstract attemptRevert(entity: ENTITIES.Entity): boolean;

    }
}